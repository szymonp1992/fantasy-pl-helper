export default {
  async fetchFromFPL() {
    const response = await fetch("../../src/fpl.json");
    const data = await response.json();
    const teamsFPLData = data.teams;
    const playersFPLData = data.elements;
    console.log(teamsFPLData);
    console.log(playersFPLData);
  },
  async fetchFromUnderstat() {
    const teamsResponse = await fetch("../../src/understat.json");
    const teamsUnderstatData = await teamsResponse.json();
    const playersResponse = await fetch("../../src/understat_players.json");
    const playersUnderstatData = await playersResponse.json();
    console.log(teamsUnderstatData);
    console.log(playersUnderstatData);
  },
};
