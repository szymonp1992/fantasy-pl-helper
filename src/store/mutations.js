export default {
  updateTeamsData(state, payload) {
    state.teamsData = payload;
  },
  updatePlayersData(state, payload) {
    state.goalkeepersData = payload.goalkeepersData;
    state.defendersData = payload.defendersData;
    state.midfieldersData = payload.midfieldersData;
    state.forwardsData = payload.forwardsData;
  },
  dataIsLoadedStatus(state) {
    state.dataLoadedStatus = true;
  },
};
