import { cardData } from "./cardData.js";
import { useEffect, useState } from "react";
import { Card } from "./Card";

function GameContainer(props) {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);

  function shuffleCards() {
    let copy = [...cardData, ...cardData]
      //sort these cards randomly using .sort method
      .sort(() => Math.random() - 0.5);
    let mapped = copy.map((ele, index) => ({ ...ele, id: index }));
    console.log(mapped);
    setCards(mapped);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setDisabled(false);
  }

  function doTheyMatch(props) {
    if (choiceOne && choiceTwo && choiceOne.src === choiceTwo.src) {
      console.log("match");
      let copy = [...cards];
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].src === choiceOne.src) {
          copy[i].matched = true;
        }
      }
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(copy);
      setTurns((prevTurns) => (prevTurns += 1));
    } else if (choiceOne && choiceTwo) {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns((prevTurns) => (prevTurns += 1));
    }
    setDisabled(false);
  }
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    setDisabled(true);
    setTimeout(() => {
      doTheyMatch();
    }, 1000);
    console.log(choiceOne, choiceTwo, cards);
  }, [choiceTwo]);

  function handleClick(id) {
    if (!disabled) {
      let copy = [...cards];
      for (let i = 0; i < cards.length; i++) {
        if (copy[i].id === id) {
          choiceOne ? setChoiceTwo(copy[i]) : setChoiceOne(copy[i]);
        }
      }
    }
  }

  function resetGame() {
    shuffleCards();
  }

  let cardElements = cards.map((ele, index) => (
    <Card
      id={ele.id}
      key={ele.id}
      src={ele.src}
      handleClick={handleClick}
      card={ele}
      flipped={ele.matched || ele === choiceOne || ele === choiceTwo}
    />
  ));
  return (
    <div className="bigger-container">
      <h1>Magic Matching</h1>
      <button onClick={resetGame}>start</button>
      <div className="GameContainer">{cardElements}</div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export { GameContainer };
