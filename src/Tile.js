import circle from "./icons/circle.svg";
import cross from "./icons/cross.svg";

export default function Tile({disabled, value, onTileClick}) {
    return (<button className={`tile ${disabled ? 'disabled' : ''}`} onClick={onTileClick}>
        {value ? (
            <img src={value == "X" ? cross : (value == "O" ? circle : "")} className="icon" />
        ) : ''}
    </button>);
}
