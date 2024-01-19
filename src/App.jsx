import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "../winning-combinations";
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function deriveGameBoard(gameTurns) {
  /*Setting up gameboard step by step on the basis of what player chose. Overriding inner element in a nested array in another array 'GameBoard', based on initialGameBoard with symbol of a player that took a certain turn, modifying that directly. So, idea is instead of directly using the initialGameBoard, create a deep copy for it */
  let gameBoard = [...INITIAL_GAMEBOARD.map((innerArr) => [...innerArr])];
  for (let turn of gameTurns) {
    const { sq, player } = turn;
    const { row, col } = sq;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, playerName) {
  let winner;
  for (const combo of WINNING_COMBINATIONS) {
    const firstSq = gameBoard[combo[0].row][combo[0].column];
    const secondSq = gameBoard[combo[1].row][combo[1].column];
    const thirdSq = gameBoard[combo[2].row][combo[2].column];
    if (firstSq && firstSq == secondSq && secondSq == thirdSq) {
      winner = playerName[firstSq];
    }
  }
  return winner;
}

function App() {
  //GameBoard and Player both components/ states have access to some info., to highlight the turn of each player. So, we have to lift the state up, means storing info. in the closest ancestor, which is App.jsx here, do that it has access to all the components required to work with that state
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  //Handling UI
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard, playerName);
  let draw = gameTurns.length === 9 && !winner;

  function restartHandler() {
    setGameTurns([]);
  }

  function playerNameHandler(symbol, name) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: name,
      };
    });
  }

  function sqHandler(rowIdx, colIdx) {
    setGameTurns((prevTurns) => {
      //Handling turns
      const currentPlayer = deriveActivePlayer(prevTurns);
      //Technically merging 2 states
      const updatedTurns = [
        { sq: { row: rowIdx, col: colIdx }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={playerNameHandler}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={playerNameHandler}
          />
        </ol>
        {(winner || draw) && ( <GameOver winner={winner} onRestart={restartHandler} /> )}
        <GameBoard onSelectSq={sqHandler} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
