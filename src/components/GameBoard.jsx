export default function GameBoard(props) {
  //Updated dynamically, with the symbol of player that clicked square
  return (
    <>
      <ol id="game-board">
        {props.board.map((row, rowIdx) => (
          <li key={rowIdx}>
            <ol>
              {row.map((symbol, colIdx) => (
                <li key={colIdx}>
                  {/* Disable button if symbol isn't null, either 'X'  or 'O'*/}
                  <button onClick={() => props.onSelectSq(rowIdx, colIdx)} disabled={symbol !== null}>
                    {symbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
