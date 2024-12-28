import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "img/bear.jpeg", matched: false },
  { src: "img/panda.jpeg", matched: false },
  { src: "img/peacock.jpeg", matched: false },
  { src: "img/penguin.jpeg", matched: false },
  { src: "img/rabbit.jpeg", matched: false },
  { src: "img/swan.jpeg", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [flips, setFlips] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //Card shuffle
  const cardShuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setFlips(0);
  };

  //Handle choices
  const handleChoices = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleReset();
      } else {
        setTimeout(() => handleReset(), 1000); //set card flip delay for wrong cards
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);

  //reset & increment flips
  const handleReset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setFlips((prevFlips) => prevFlips + 1);
    setDisabled(false);
  };

  //Check for matches
  const checkMatches = () => {
    if (choiceOne && choiceTwo && choiceOne.src === choiceTwo.src) {
      alert("Match!");
      handleReset();
    } else {
      setTimeout(handleReset, 1000);
    }
  };

  //Check for end of game
  const isGameOver = () => {
    return flips === cardImages.length / 2;
  };

  //Check for win
  const isGameWon = () => {
    return cards.every((card) => card.matched);
  };

  //Check if game is over or won
  useEffect(() => {
    cardShuffle();
  }, []);

  return (
    <div className="App">
      <h1>Memory Match</h1>
      <button onClick={cardShuffle}>New Game</button>

      <div className="cards-container">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoices={handleChoices}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Flips : {flips}</p>
    </div>
  );
}

export default App;
