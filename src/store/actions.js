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
        id: teamsFPLData[i].id,
      });
    }
    // Adding Understat data to teams' objects in teamsArray
    // All the variables that will hold seasonal data for the teams. They will be updated while looping over all games in season (Understat data hold games' stats and not seasonal stats)
    let [xG, xGA, npxG, npxGA, last5xG, last5xGA, last5npxG, last5npxGA] = [
      0, 0, 0, 0, 0, 0, 0, 0,
    ];
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
      [
        xG,
        xGA,
        npxG,
        npxGA,
        last5xG,
        last5xGA,
        last5npxG,
        last5npxGA,
        xGD,
        npxGD,
        last5xGD,
      ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    // Committing updated teams array with all the necessary properties
    context.commit("updateTeamsData", teamsArray);
    // PLAYERS DATA SECTION
    const availablePlayersData = playersFPLData.filter((player) => {
      return player.status === "a" && player.minutes > 0;
    });
    // Splitting players array to positions
    // Splitting playersArray into four arrays by players' positions, also removing all unavailable players
    const goalkeepersArray = availablePlayersData.filter((player) => {
      return player.element_type === 1;
    });
    const defendersArray = availablePlayersData.filter((player) => {
      return player.element_type === 2;
    });
    const midfieldersArray = availablePlayersData.filter((player) => {
      return player.element_type === 3;
    });
    const forwardsArray = availablePlayersData.filter((player) => {
      return player.element_type === 4;
    });
    // Listing all the keys we want to leave as they are in players data object
    const keysToLeave = {
      all: [
        "display_name",
        "team",
        "now_cost",
        "minutes",
        "total_points",
        "bps",
      ],
      goalkeepers: [
        "clean_sheets",
        "clean_sheets_per_90",
        "saves",
        "saves_per_90",
        "goals_conceded",
        "goals_conceded_per_90",
        "expected_goals_conceded",
        "expected_goals_conceded_per_90",
      ],
      defenders: [
        "goals_scored",
        "assists",
        "expected_goals",
        "expected_goals_per_90",
        "expected_assists",
        "expected_assists_per_90",
        "expected_goal_involvements",
        "expected_goal_involvements_per_90",
        "clean_sheets",
        "clean_sheets_per_90",
        "goals_conceded",
        "goals_conceded_per_90",
        "expected_goals_conceded",
        "expected_goals_conceded_per_90",
      ],
      midfielders: [
        "goals_scored",
        "assists",
        "expected_goals",
        "expected_goals_per_90",
        "expected_assists",
        "expected_assists_per_90",
        "expected_goal_involvements",
        "expected_goal_involvements_per_90",
      ],
      forwards: [
        "goals_scored",
        "assists",
        "expected_goals",
        "expected_goals_per_90",
        "expected_assists",
        "expected_assists_per_90",
        "expected_goal_involvements",
        "expected_goal_involvements_per_90",
      ],
    };
    // Creeating new objects that are reduced only to key-value pairs from keysToLeave object, according to players' positions
    const goalkeepersData = filterPlayersDataByPosition(
      goalkeepersArray,
      "goalkeepers",
      keysToLeave,
      teamsArray
    );
    const defendersData = filterPlayersDataByPosition(
      defendersArray,
      "defenders",
      keysToLeave,
      teamsArray
    );
    const midfieldersData = filterPlayersDataByPosition(
      midfieldersArray,
      "midfielders",
      keysToLeave,
      teamsArray
    );
    const forwardsData = filterPlayersDataByPosition(
      forwardsArray,
      "forwards",
      keysToLeave,
      teamsArray
    );
    // Committing updated players arrays sorted by positions with all the necessary properties
    context.commit("updatePlayersData", {
      goalkeepersData,
      defendersData,
      midfieldersData,
      forwardsData,
    });
    // Letting the App know that players' data is loaded
    context.commit("dataIsLoadedStatus");
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

// Function that leaves only the necessary key-value pairs in players' objects, according to players' positions
function filterPlayersDataByPosition(
  playersArray,
  position,
  keysToLeave,
  teamsArr
) {
  const filteredArray = playersArray.map((playerObj) => {
    const newObj = {};
    // Shortening players' names (e.g. Brazilian players)
    if (!playerObj.web_name.includes(playerObj.second_name)) {
      newObj["display_name"] = playerObj.web_name;
    } else {
      newObj["display_name"] =
        playerObj.first_name + " " + playerObj.second_name;
    }
    // Deleting the unndecessary properties
    for (const key in playerObj) {
      if (
        keysToLeave[position].includes(key) ||
        keysToLeave.all.includes(key)
      ) {
        newObj[key] = playerObj[key];
      }
    }
    // Setting a proper cost (FPL API uses price * 10 as their now_cost)
    newObj.now_cost = (playerObj.now_cost / 10).toFixed(1);
    // Setting team name based on team property from playersArray and id property from teamsArray
    teamsArr.forEach((team) => {
      if (playerObj.team === team.id) {
        newObj.team = team.name;
        return;
      }
    });
    // Changing data type of these props to floats
    if (newObj["now_cost"]) {
      newObj["now_cost"] = parseFloat(newObj["now_cost"]);
    }
    if (newObj["expected_goals"]) {
      newObj["expected_goals"] = parseFloat(newObj["expected_goals"]);
    }
    if (newObj["expected_assists"]) {
      newObj["expected_assists"] = parseFloat(newObj["expected_assists"]);
    }
    if (newObj["expected_goal_involvements"]) {
      newObj["expected_goal_involvements"] = parseFloat(
        newObj["expected_goal_involvements"]
      );
    }
    if (newObj["expected_goals_conceded"]) {
      newObj["expected_goals_conceded"] = parseFloat(
        newObj["expected_goals_conceded"]
      );
    }
    return newObj;
  });
  return filteredArray;
}
