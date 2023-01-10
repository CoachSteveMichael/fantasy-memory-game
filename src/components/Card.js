import React from "react";

function Card(props) {
  const { src, id, handleClick, flipped } = props;
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={src} className="front" />
        <img
          src="./img/background.png"
          className="back"
          onClick={() => handleClick(id)}
        />
      </div>
    </div>
  );
}

export { Card };
