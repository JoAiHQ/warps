use crate::{
    config,
    errors::*,
    events,
    types::{GameId, GameInfo, GameStateView, MoveData},
};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

const BOARD_SIZE: u8 = 64;

const W_PAWN: u8 = 1;
const W_KNIGHT: u8 = 2;
const W_BISHOP: u8 = 3;
const W_ROOK: u8 = 4;
const W_QUEEN: u8 = 5;
const W_KING: u8 = 6;
const B_PAWN: u8 = 7;
const B_KNIGHT: u8 = 8;
const B_BISHOP: u8 = 9;
const B_ROOK: u8 = 10;
const B_QUEEN: u8 = 11;
const B_KING: u8 = 12;

const STATUS_WAITING: u8 = 0;
const STATUS_ACTIVE: u8 = 1;
const STATUS_WHITE_WINS: u8 = 2;
const STATUS_BLACK_WINS: u8 = 3;
const STATUS_DRAW: u8 = 4;

const TURN_WHITE: u8 = 0;
const TURN_BLACK: u8 = 1;

const INITIAL_BOARD: [u8; 64] = [
    B_ROOK, B_KNIGHT, B_BISHOP, B_QUEEN, B_KING, B_BISHOP, B_KNIGHT, B_ROOK,
    B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN, B_PAWN,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN, W_PAWN,
    W_ROOK, W_KNIGHT, W_BISHOP, W_QUEEN, W_KING, W_BISHOP, W_KNIGHT, W_ROOK,
];

#[multiversx_sc::module]
pub trait ChessModule: config::ConfigModule + events::EventsModule {
    #[endpoint(createGame)]
    fn create_game(&self) -> u64 {
        let caller = self.blockchain().get_caller();
        let now = self.blockchain().get_block_timestamp();

        let game_id = self.next_game_id().get();
        self.next_game_id().set(game_id + 1);

        let zero_addr = ManagedAddress::zero();

        self.game_info(game_id).set(GameInfo {
            game_id,
            white: caller.clone(),
            black: zero_addr,
            current_turn: TURN_WHITE,
            status: STATUS_WAITING,
            created_at: now,
            move_count: 0,
            last_move_at: 0,
        });

        for i in 0..BOARD_SIZE {
            self.game_square(game_id, i).set(INITIAL_BOARD[i as usize]);
        }

        self.player_games(&caller).insert(game_id);
        self.open_games().insert(game_id);

        self.game_created_event(game_id, caller);

        game_id
    }

    #[endpoint(joinGame)]
    fn join_game(&self, game_id: GameId) {
        require!(!self.game_info(game_id).is_empty(), ERR_GAME_NOT_FOUND);

        let mut info = self.game_info(game_id).get();
        require!(info.status == STATUS_WAITING, ERR_GAME_FULL);

        let caller = self.blockchain().get_caller();
        require!(caller != info.white, ERR_CANNOT_PLAY_YOURSELF);

        info.black = caller.clone();
        info.status = STATUS_ACTIVE;
        self.game_info(game_id).set(info);

        self.player_games(&caller).insert(game_id);
        self.open_games().swap_remove(&game_id);

        self.game_joined_event(game_id, caller);
    }

    #[endpoint(makeMove)]
    fn make_move(&self, game_id: GameId, from_sq: u8, to_sq: u8, promotion: u8) {
        require!(!self.game_info(game_id).is_empty(), ERR_GAME_NOT_FOUND);
        require!(from_sq < BOARD_SIZE, ERR_INVALID_FROM);
        require!(to_sq < BOARD_SIZE, ERR_INVALID_TO);
        require!(from_sq != to_sq, ERR_SAME_SQUARE);

        let mut info = self.game_info(game_id).get();
        require!(info.status == STATUS_ACTIVE, ERR_GAME_NOT_ACTIVE);

        let caller = self.blockchain().get_caller();
        require!(
            caller == info.white || caller == info.black,
            ERR_NOT_A_PLAYER
        );

        let is_white = caller == info.white;
        let expected_turn = if is_white { TURN_WHITE } else { TURN_BLACK };
        require!(info.current_turn == expected_turn, ERR_NOT_YOUR_TURN);

        let piece = self.game_square(game_id, from_sq).get();
        require!(piece != 0, ERR_EMPTY_SOURCE);

        let piece_is_white = piece >= W_PAWN && piece <= W_KING;
        require!(piece_is_white == is_white, ERR_NOT_YOUR_PIECE);

        let target = self.game_square(game_id, to_sq).get();
        if target != 0 {
            let target_is_white = target >= W_PAWN && target <= W_KING;
            require!(target_is_white != is_white, ERR_CANNOT_CAPTURE_OWN);
        }

        require!(
            self.validate_move(game_id, piece, from_sq, to_sq, target),
            ERR_INVALID_MOVE
        );

        self.game_square(game_id, from_sq).set(0);

        let placed_piece = self.apply_promotion(piece, from_sq, to_sq, promotion);
        self.game_square(game_id, to_sq).set(placed_piece);

        let now = self.blockchain().get_block_timestamp();
        info.move_count += 1;
        info.last_move_at = now;
        info.current_turn = if is_white { TURN_BLACK } else { TURN_WHITE };

        let move_data = MoveData {
            from_sq,
            to_sq,
            piece,
            captured: target,
            promotion: if placed_piece != piece { placed_piece } else { 0 },
            move_number: info.move_count,
        };
        self.game_moves(game_id).push(&move_data);

        if target == W_KING || target == B_KING {
            info.status = if is_white {
                STATUS_WHITE_WINS
            } else {
                STATUS_BLACK_WINS
            };
            self.game_ended_event(game_id, info.status);
        }

        self.game_info(game_id).set(info);
        self.move_made_event(game_id, caller, from_sq, to_sq);
    }

    #[endpoint(resignGame)]
    fn resign_game(&self, game_id: GameId) {
        require!(!self.game_info(game_id).is_empty(), ERR_GAME_NOT_FOUND);

        let mut info = self.game_info(game_id).get();
        require!(info.status == STATUS_ACTIVE, ERR_GAME_ALREADY_OVER);

        let caller = self.blockchain().get_caller();
        require!(
            caller == info.white || caller == info.black,
            ERR_NOT_A_PLAYER
        );

        let is_white = caller == info.white;
        info.status = if is_white {
            STATUS_BLACK_WINS
        } else {
            STATUS_WHITE_WINS
        };

        self.game_info(game_id).set(info);
        self.game_resigned_event(game_id, caller);
        self.game_ended_event(game_id, info.status);
    }

    #[view(getGameState)]
    fn get_game_state(&self, game_id: GameId) -> GameStateView<Self::Api> {
        require!(!self.game_info(game_id).is_empty(), ERR_GAME_NOT_FOUND);
        let info = self.game_info(game_id).get();

        let mut board: ManagedVec<Self::Api, u8> = ManagedVec::new();
        for i in 0..BOARD_SIZE {
            board.push(self.game_square(game_id, i).get());
        }

        let mut moves: ManagedVec<Self::Api, MoveData> = ManagedVec::new();
        let len = self.game_moves(game_id).len();
        for i in 1..=len {
            moves.push(self.game_moves(game_id).get(i));
        }

        GameStateView { info, board, moves }
    }

    #[view(getPlayerGames)]
    fn get_player_games(&self, player: ManagedAddress) -> MultiValueEncoded<GameId> {
        let mut result = MultiValueEncoded::new();
        for game_id in self.player_games(&player).iter() {
            result.push(game_id);
        }
        result
    }

    #[view(getOpenGames)]
    fn get_open_games(&self) -> MultiValueEncoded<GameId> {
        let mut result = MultiValueEncoded::new();
        for game_id in self.open_games().iter() {
            result.push(game_id);
        }
        result
    }

    fn validate_move(
        &self,
        game_id: GameId,
        piece: u8,
        from_sq: u8,
        to_sq: u8,
        target: u8,
    ) -> bool {
        let piece_type = if piece <= W_KING { piece } else { piece - 6 };

        let from_row = from_sq / 8;
        let from_col = from_sq % 8;
        let to_row = to_sq / 8;
        let to_col = to_sq % 8;

        match piece_type {
            1 => self.validate_pawn(game_id, piece, from_row, from_col, to_row, to_col, target),
            2 => Self::validate_knight(from_row, from_col, to_row, to_col),
            3 => self.validate_sliding(game_id, from_row, from_col, to_row, to_col, false, true),
            4 => self.validate_sliding(game_id, from_row, from_col, to_row, to_col, true, false),
            5 => self.validate_sliding(game_id, from_row, from_col, to_row, to_col, true, true),
            6 => Self::validate_king(from_row, from_col, to_row, to_col),
            _ => false,
        }
    }

    fn validate_pawn(
        &self,
        game_id: GameId,
        piece: u8,
        fr: u8,
        fc: u8,
        tr: u8,
        tc: u8,
        target: u8,
    ) -> bool {
        let is_white = piece <= W_KING;
        let dir: i16 = if is_white { -1 } else { 1 };
        let start_row: u8 = if is_white { 6 } else { 1 };

        let dr = (tr as i16) - (fr as i16);
        let dc = (tc as i16) - (fc as i16);

        if dr == dir && dc == 0 && target == 0 {
            return true;
        }

        if dr == dir * 2 && dc == 0 && fr == start_row && target == 0 {
            let mid_row = (fr as i16 + dir) as u8;
            if self.game_square(game_id, mid_row * 8 + fc).get() == 0 {
                return true;
            }
        }

        if dr == dir && (dc == 1 || dc == -1) && target != 0 {
            return true;
        }

        false
    }

    fn validate_knight(fr: u8, fc: u8, tr: u8, tc: u8) -> bool {
        let dr = ((tr as i16) - (fr as i16)).abs();
        let dc = ((tc as i16) - (fc as i16)).abs();
        (dr == 2 && dc == 1) || (dr == 1 && dc == 2)
    }

    fn validate_king(fr: u8, fc: u8, tr: u8, tc: u8) -> bool {
        let dr = ((tr as i16) - (fr as i16)).abs();
        let dc = ((tc as i16) - (fc as i16)).abs();
        dr <= 1 && dc <= 1 && (dr + dc > 0)
    }

    fn validate_sliding(
        &self,
        game_id: GameId,
        fr: u8,
        fc: u8,
        tr: u8,
        tc: u8,
        straight: bool,
        diagonal: bool,
    ) -> bool {
        let dr_i = (tr as i16) - (fr as i16);
        let dc_i = (tc as i16) - (fc as i16);

        let adr = dr_i.abs();
        let adc = dc_i.abs();

        let is_straight = adr == 0 || adc == 0;
        let is_diagonal = adr == adc;

        if straight && is_straight && (adr + adc > 0) {
            return self.is_path_clear(game_id, fr, fc, tr, tc);
        }

        if diagonal && is_diagonal && adr > 0 {
            return self.is_path_clear(game_id, fr, fc, tr, tc);
        }

        false
    }

    fn is_path_clear(&self, game_id: GameId, fr: u8, fc: u8, tr: u8, tc: u8) -> bool {
        let dr_i = (tr as i16) - (fr as i16);
        let dc_i = (tc as i16) - (fc as i16);
        let steps = dr_i.abs().max(dc_i.abs());

        if steps <= 1 {
            return true;
        }

        let sr = if dr_i > 0 { 1i16 } else if dr_i < 0 { -1i16 } else { 0 };
        let sc = if dc_i > 0 { 1i16 } else if dc_i < 0 { -1i16 } else { 0 };

        let mut r = (fr as i16) + sr;
        let mut c = (fc as i16) + sc;

        for _ in 1..steps {
            if self
                .game_square(game_id, (r as u8) * 8 + (c as u8))
                .get()
                != 0
            {
                return false;
            }
            r += sr;
            c += sc;
        }

        true
    }

    fn apply_promotion(&self, piece: u8, from_sq: u8, to_sq: u8, promotion: u8) -> u8 {
        let is_white = piece <= W_KING;
        let piece_type = if is_white { piece } else { piece - 6 };

        if piece_type != 1 {
            return piece;
        }

        let promo_rank = if is_white { 0u8 } else { 7u8 };
        let to_row = to_sq / 8;

        if to_row != promo_rank {
            return piece;
        }

        let promo_type = if promotion >= 2 && promotion <= 5 {
            promotion
        } else {
            W_QUEEN
        };

        if is_white {
            promo_type
        } else {
            promo_type + 6
        }
    }
}
