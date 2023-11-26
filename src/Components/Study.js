import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import OneCard from "../Components/OneCard.js";
import NotEnoughCards from "../Components/NotEnoughCards.js";

/* url: /decks/:deckId/study */

function Study() {
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

  const { cards } = deck;
  let result;

  if (cards && cards.length < 3) {
    result = <NotEnoughCards deck={deck} />;
  } else {
    result = <OneCard />;
  }

  function Breadcrumb() {
    return (
      <nav aria-label="breadcrumb" style={{ padding: "5px 10px" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item"> Study</li>
        </ol>
      </nav>
    );
  }
  /* a card is an object with keys "id", "front", "back", 
and "deckId" elements. */
  return (
    <>
      <div>
        <Breadcrumb />
      </div>
      <div className="container">
        <h1>Study: {deck.name}</h1>
        {result}
      </div>
    </>
  );
}

export default Study;