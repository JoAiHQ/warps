multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub type GameId = u64;

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct GameInfo<M: ManagedTypeApi> {
    pub game_id: GameId,
    pub white: ManagedAddress<M>,
    pub black: ManagedAddress<M>,
    pub current_turn: u8,
    pub status: u8,
    pub created_at: u64,
    pub move_count: u32,
    pub last_move_at: u64,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode, Clone)]
pub struct MoveData {
    pub from_sq: u8,
    pub to_sq: u8,
    pub piece: u8,
    pub captured: u8,
    pub promotion: u8,
    pub move_number: u32,
}

#[type_abi]
#[derive(NestedEncode, NestedDecode, TopEncode, TopDecode)]
pub struct GameStateView<M: ManagedTypeApi> {
    pub info: GameInfo<M>,
    pub board: ManagedVec<M, u8>,
    pub moves: ManagedVec<M, MoveData>,
}
