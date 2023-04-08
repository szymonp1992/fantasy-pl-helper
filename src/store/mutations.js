export default {
  updateTeamsData(state, payload) {
    state.teamsData = payload;
  },
  updatePlayersData(state, payload) {
    state.goalkeepersData = payload.goalkeepersArray;
    state.defendersData = payload.defendersArray;
    state.midfieldersData = payload.midfieldersArray;
    state.forwardsData = payload.forwardsArray;
  },
};
