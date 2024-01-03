import Tile from "./Tile";
import circle from "./icons/circle.svg";
import cross from "./icons/cross.svg";

export default function SubGame({
  tiles,
  gameIndex,
  active,
  handleTileClick,
  xIsNext,
  onPlay
}) {
  // const [tiles, setTiles] = useState(Array(9).fill(null));

  const winner = calculateWinner(tiles);

  function calculateWinner(tiles) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        return tiles[a];
      }
    }
    return null;
  }

  function onTileClick(index) {
    if (!active || tiles[index] || calculateWinner(tiles)) {
      return;
    }
    const nextTiles = tiles.slice();
    if (xIsNext) {
      nextTiles[index] = "X";
    } else {
      nextTiles[index] = "O";
    }
    // setTiles(nextTiles);
    handleTileClick(index, calculateWinner(nextTiles), gameIndex, nextTiles);
  }

  return (
    <>
      <div className={`grid ${active && winner == null ? "active" : ""}`}>
        {winner ? (
          <img
            src={winner == "X" ? cross : circle}
            className="icon winnerIcon"
          />
        ) : (
          ""
        )}
        {Array(9)
          .fill(null)
          .map((val, index) => {
            return (
              <Tile
                disabled={winner != null}
                value={tiles[index]}
                onTileClick={() => onTileClick(index)}
                key={index}
              />
            );
          })}
      </div>
    </>
  );
}
