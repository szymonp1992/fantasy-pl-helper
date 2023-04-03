export default {
  // Fetching players and teams data from FPL to pass them to mutations
  async fetchFromFPL() {
    const response = await fetch("../../src/fpl.json");
    const data = await response.json();
    const teamsFPLData = data.teams;
    const playersFPLData = data.elements;
  },
  // Fetching players and teams data from Understat to pass them to mutations
  async fetchFromUnderstat() {
    const teamsResponse = await fetch("../../src/understat.json");
    const teamsUnderstatData = await teamsResponse.json();
    const playersResponse = await fetch("../../src/understat_players.json");
    const playersUnderstatData = await playersResponse.json();
  },
};
