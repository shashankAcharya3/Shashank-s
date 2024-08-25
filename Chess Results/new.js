const chess_call = async () => {
  const player1 = document.getElementById("player1").value || "shashank4321";
  const player2 = document.getElementById("player2").value || "acharyanup";
  const startMonth = document.getElementById("start-month").value || "08";
  const startYear = document.getElementById("start-year").value || "2024";
  console.log(player1);
  console.log(player2);
  console.log(startMonth);
  console.log(startYear);

  let player1_total_score =
    player1 === "shashank4321" && player2 === "acharyanup" ? 21 - 6 : 0;
  let player2_total_score =
    player1 === "shashank4321" && player2 === "acharyanup" ? 8 - 2 : 0;
  let player1_score_month = undefined;
  let player2_score_month = undefined;
  const d = new Date();
  const currentMonth = d.getMonth() + 1; // Current month (1-12)

  console.log(currentMonth);

  let game_count = 0;

  document.getElementById("results").innerHTML = "";

  for (let month = parseInt(startMonth); month <= currentMonth; month++) {
    const formattedMonth = month.toString().padStart(2, "0");
    player1_score_month = 0;
    player2_score_month = 0;
    month_game_count = 0;
    const res = await fetch(
      `https://api.chess.com/pub/player/${player1}/games/${startYear}/${formattedMonth}`
    );
    const data = await res.json();

    const numberOfGames = data.games.length;

    for (let i = 0; i < numberOfGames; i++) {
      const blackPlayer = data.games[i].black.username;
      const whitePlayer = data.games[i].white.username;

      if (
        (blackPlayer === player1 && whitePlayer === player2) ||
        (blackPlayer === player2 && whitePlayer === player1)
      ) {
        game_count += 1;
        month_game_count += 1;
        const black_result = data.games[i].black.result;
        const white_result = data.games[i].white.result;

        if (
          (black_result === "win" && blackPlayer === player1) ||
          (white_result === "win" && whitePlayer === player1)
        ) {
          player1_score_month += 1;
          player1_total_score = player1_total_score + 1;
        } else if (
          (black_result === "win" && blackPlayer === player2) ||
          (white_result === "win" && whitePlayer === player2)
        ) {
          player2_score_month += 1;
          player2_total_score = player2_total_score + 1;
        }
      }
    }
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById("results").innerHTML = `
    <div class="result-section">
      <h2>Results</h2>
      <div class="results-table">
        <div class="header">
          <div>Result of ${months[currentMonth - 1]} month</div>
        </div>
        <div>
          <div>${player1}</div>
          <div>${player1_score_month}</div>
        </div>
        <div>
          <div>${player2}</div>
          <div>${player2_score_month}</div>
        </div>
        <div class="header">
          <div>Total Final Scores</div>
          <div></div> 
        </div>
        <div>
          <div>${player1}</div>
          <div>${player1_total_score}</div>
        </div>
        <div>
          <div>${player2}</div>
          <div>${player2_total_score}</div>
        </div>
      </div>
    </div>
  `;
};

const button = document.querySelector("#search-btn");
button.addEventListener("click", chess_call);
