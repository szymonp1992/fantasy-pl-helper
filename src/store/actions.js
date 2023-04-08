export default {
  // Fetching players and teams data from FPL and understat to pass them to mutations
  async fetchFromFPLAndUnderstat(context) {
    // Getting responses from FPL and Understat JSON files
    const response = await fetch("../../src/fpl.json");
    const FPLData = await response.json();
    const understatResponse = await fetch("../../src/understat.json");
    const understatData = await understatResponse.json();
    // Getting selected data into variables and sorting teams for FPL data to match Understat data in terms of order (alphabetical)
    const teamsFPLData = FPLData.teams.sort(sortFPLAlphabetically);
    const playersFPLData = FPLData.elements;
    const teamsUnderstatData = Object.values(understatData).sort(
      sortUnderstatAlphabetically
    );
    // TEAMS DATA SECTION
    // Taking the necessary teams data to an array of teams objects to pass it through mutations to state object
    const teamsArray = [];
    // Looping over teams FPL data to get teams' name and strength. Id is the number of iteration
    for (let i = 0; i < teamsFPLData.length; i++) {
      teamsArray.push({
        name: teamsFPLData[i].name,
        strength: teamsFPLData[i].strength,
        id: i,
      });
    }
    // Adding Understat data to teams' objects in teamsArray
    // All the variables that will hold seasonal data for the teams. They will be updated while looping over all games in season (Understat data hold games' stats and not seasonal stats)
    let xG = 0;
    let xGA = 0;
    let npxG = 0;
    let npxGA = 0;
    let last5xG = 0;
    let last5xGA = 0;
    let last5npxG = 0;
    let last5npxGA = 0;
    // Creating a variable for current team
    for (let i = 0; i < teamsUnderstatData.length; i++) {
      const teamUnderstatIterated = teamsUnderstatData[i];

      // Loop adding all the single game statistics to create a sum for whole season
      for (let i = 0; i < teamUnderstatIterated.history.length; i++) {
        xG += teamUnderstatIterated.history[i]["xG"];
        xGA += teamUnderstatIterated.history[i]["xGA"];
        npxG += teamUnderstatIterated.history[i]["npxG"];
        npxGA += teamUnderstatIterated.history[i]["npxGA"];
      }
      // Loop adding all the single game statistics for last 5 games to create a sum
      for (
        let i = teamUnderstatIterated.history.length - 5;
        i < teamUnderstatIterated.history.length;
        i++
      ) {
        last5xG += teamUnderstatIterated.history[i]["xG"];
        last5xGA += teamUnderstatIterated.history[i]["xGA"];
        last5npxG += teamUnderstatIterated.history[i]["npxG"];
        last5npxGA += teamUnderstatIterated.history[i]["npxGA"];
      }
      // Calcualtions based on sums that we got from the loops before
      let xGD = xG - xGA;
      let npxGD = npxG - npxGA;
      let last5xGD = last5xG - last5xGA;

      // Assigning new values to existing team objects
      Object.assign(teamsArray[i], {
        xG: xG.toFixed(2),
        xGA: xGA.toFixed(2),
        npxG: npxG.toFixed(2),
        npxGA: npxGA.toFixed(2),
        xGD: xGD.toFixed(2),
        npxGD: npxGD.toFixed(2),
        last5xG: last5xG.toFixed(2),
        last5xGA: last5xGA.toFixed(2),
        last5npxG: last5npxG.toFixed(2),
        last5npxGA: last5npxGA.toFixed(2),
        last5xGD: last5xGD.toFixed(2),
      });
      // Resetting all the metrics for next team iteration
      xG = 0;
      xGA = 0;
      npxG = 0;
      npxGA = 0;
      last5xG = 0;
      last5xGA = 0;
      last5npxG = 0;
      last5npxGA = 0;
      xGD = 0;
      npxGD = 0;
      last5xGD = 0;
    }
    // Committing updated teams array with all the necessary properties
    context.commit("updateTeamsData", teamsArray);
    // PLAYERS DATA SECTION
    // Listing all the keys we want to leave as they are in players data object
    const keysToLeave = [
      "first_name",
      "second_name",
      "web_name",
      "status",
      "team_code",
      "now_cost",
      "total_points",
      "minutes",
      "goals_scored",
      "assists",
      "bps",
      "bonus",
      "clean_sheets",
      "clean_sheets_per_90",
      "element_type",
      "expected_assists",
      "expected_assists_per_90",
      "expected_goal_involvements",
      "expected_goal_involvements_per_90",
      "expected_goals",
      "expected_goals_per_90",
      "expected_goals_conceded",
      "expected_goals_conceded_per_90",
      "goals_conceded",
      "goals_conceded_per_90",
      "yellow_cards",
      "red_cards",
    ];
    // Removing unnecessary properties from all players data objects
    const playersArray = playersFPLData.map((playerObj) => {
      const newObj = {};
      for (const key in playerObj) {
        if (keysToLeave.includes(key)) {
          newObj[key] = playerObj[key];
        }
      }
      if (playerObj.web_name === playerObj.first_name) {
        newObj["display_name"] = playerObj.web_name;
      } else {
        newObj["display_name"] =
          playerObj.first_name + " " + playerObj.second_name;
      }
      return newObj;
    });
    // Committing updated teams array with all the necessary properties
    context.commit("updatePlayersData", playersArray);
  },
};

// Sorter function for teams' names in array of objects from FPL API
function sortFPLAlphabetically(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

// Sorter function for teams' names in array of objects from Understat API
function sortUnderstatAlphabetically(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}
