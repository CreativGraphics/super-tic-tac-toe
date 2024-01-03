import { useState } from "react";
import SubGame from "./SubGame";

import circle from "./icons/circle.svg";
import cross from "./icons/cross.svg";
import undo from "./icons/undo.svg";

export default function Game() {

    const [xIsNext, setXIsNext] = useState(true);
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [activeGame, setActiveGame] = useState(-1);

    const [history, setHistory] = useState([Array(9).fill(Array(9).fill(null))]);
    const [activeHistory, setActiveHistory] = useState([-1]);
    const currentTiles = history[history.length - 1];
    const currentGame = activeHistory[activeHistory.length - 1];

    let status;
    
    const winner = calculateWinner(tiles);
    
    if (winner) {
        status = (
            <>
                Winner:
                {winner == "X" ? (
                    <img src={cross} className="status-icon" />
                ) : (
                    <img src={circle} className="status-icon" />
                )}
            </>
        );
    } else {
        status = (
            <>
                Next player:
                {xIsNext ? (
                    <img src={cross} className="status-icon" />
                ) : (
                    <img src={circle} className="status-icon" />
                )}
            </>
        );
    }

    function calculateWinner(tiles) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
                return tiles[a];
            }
        }
        return null;
    }

    function handleTileClick(tile, winner, index, newTiles) {
        setXIsNext(!xIsNext);
        const nextTiles = tiles.slice();
        nextTiles[index] = winner;
        setTiles(nextTiles);

        setActiveHistory([...activeHistory, tiles[tile] ? -1 : tile]);

        const gameWinner = calculateWinner(nextTiles);
        if(gameWinner) setActiveHistory([...activeHistory, 10]);

        const historyItem = [...currentTiles];
        historyItem[index] = newTiles;
        setHistory([...history, historyItem]);
    }

    function back(){
        console.log(history);
        history.pop();
        setHistory([...history]);
        activeHistory.pop();
        setActiveHistory([...activeHistory]);
        setXIsNext(!xIsNext);
    }

    return (<div className="content">
        <div className="toolbar">
            <div className="status">{status}</div>
            {history.length > 1 ? (
                <button className="back" onClick={back}>
                    <img src={undo} className="back-icon" />
                </button>
            ) : ''}
        </div>
        <div className="grid">
            {Array(9).fill(null).map((val, index) => {
                return (<SubGame
                    gameIndex={index}
                    key={index}
                    xIsNext={xIsNext}
                    handleTileClick={handleTileClick}
                    active={currentGame == index || currentGame == -1}
                    tiles={currentTiles[index]}
                />)
            })}
        </div>
    </div>);
}
