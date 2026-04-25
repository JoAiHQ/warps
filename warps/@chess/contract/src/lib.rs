#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

pub mod chess;
pub mod chess_proxy;
pub mod config;
pub mod errors;
pub mod events;
pub mod types;

#[multiversx_sc::contract]
pub trait ChessContract:
    config::ConfigModule + events::EventsModule + chess::ChessModule
{
    #[init]
    fn init(&self) {
        self.next_game_id().set(1u64);
    }

    #[upgrade]
    fn upgrade(&self) {}
}
