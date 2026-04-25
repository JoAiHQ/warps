use crate::types::{GameId, GameInfo, MoveData};

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[multiversx_sc::module]
pub trait ConfigModule {
    #[storage_mapper("nextGameId")]
    fn next_game_id(&self) -> SingleValueMapper<GameId>;

    #[storage_mapper("gameInfo")]
    fn game_info(&self, game_id: GameId) -> SingleValueMapper<GameInfo<Self::Api>>;

    #[storage_mapper("gameSquare")]
    fn game_square(&self, game_id: GameId, index: u8) -> SingleValueMapper<u8>;

    #[storage_mapper("gameMoves")]
    fn game_moves(&self, game_id: GameId) -> VecMapper<MoveData>;

    #[storage_mapper("playerGames")]
    fn player_games(&self, player: &ManagedAddress) -> UnorderedSetMapper<GameId>;

    #[storage_mapper("openGames")]
    fn open_games(&self) -> UnorderedSetMapper<GameId>;
}
