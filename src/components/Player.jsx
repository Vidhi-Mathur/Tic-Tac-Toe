import { useState } from "react";

export default function Player(props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);
  function editHandler() {
    setEditing((editing) => !editing);
    if (editing) {
        props.onNameChange(props.symbol, name);
    }
  }
  function nameHandler(event) {
    setName(event.target.value);
  }
  return (
    <>
      <li className={props.isActive ? "active" : undefined}>
        <span className="player">
          {!editing ? (
            <span className="player-name">{name}</span>
          ) : (
            <input type="text" required value={name} onChange={nameHandler} />
          )}
          <span className="player-symbol">{props.symbol}</span>
        </span>
        <button onClick={editHandler}>{!editing ? "Edit" : "Save"}</button>
      </li>
    </>
  );
}
