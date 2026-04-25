multiversx_sc::imports!();

#[multiversx_sc::module]
pub trait EventsModule {
    #[event("gameCreated")]
    fn game_created_event(&self, #[indexed] game_id: u64, #[indexed] white: ManagedAddress);

    #[event("gameJoined")]
    fn game_joined_event(&self, #[indexed] game_id: u64, #[indexed] black: ManagedAddress);

    #[event("moveMade")]
    fn move_made_event(
        &self,
        #[indexed] game_id: u64,
        #[indexed] player: ManagedAddress,
        from_sq: u8,
        to_sq: u8,
    );

    #[event("gameEnded")]
    fn game_ended_event(&self, #[indexed] game_id: u64, result: u8);

    #[event("gameResigned")]
    fn game_resigned_event(&self, #[indexed] game_id: u64, #[indexed] player: ManagedAddress);
}
