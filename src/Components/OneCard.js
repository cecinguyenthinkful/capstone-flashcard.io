import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";

/* use in Study screen not View */
/* path is /decks/:deckId/study */
function OneCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({
    id: "",
    name: "",
    description: "",
    cards: [],
  });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const [cardSide, setCardSide] = useState("front");
  const [count, setCount] = useState(0);
  const history = useHistory();

  if (!deck.id) return null;

  let cardInfo = deck.cards[count].front;

  if (cardSide === "front") {
    cardInfo = deck.cards[count].front;
  } else {
    cardInfo = deck.cards[count].back;
  }

  const handleFlip = (event) => {
    if (cardSide === "front") {
      setCardSide("back");
    } else {
      setCardSide("front");
    }
  };

  const handleNext = () => {
    if (count + 1 < deck.cards.length) {
      setCount(count + 1);
      setCardSide("front");
    } else {
      const result = window.confirm(
        `Reset cards for ${deck.name}?  Clicking "cancel" will bring you back to the home page.`
      );

      if (result) {
        setCardSide("front");
        setCount(0);
        history.push(`/decks/${deck.id}/study`);
      } else {
        history.push("/");
      }
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <h3>
            Card {count + 1} of {deck.cards.length}
          </h3>
        </div>
        <div className="card-text">{cardInfo}</div>
      </div>
      <div className="row ml-1">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleFlip}
        >
          Flip
        </button>
        {cardSide === "back" ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default OneCard;