import React from "react";
import { Link, useHistory } from "react-router-dom";

function NotEnoughCards({ deck }) {
  const history = useHistory();

  return (
    <div className="container">
      <div className="row">
        <h2>Not enough cards.</h2>
      </div>
      <div className="row">
        <p>
          You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck.
        </p>
      </div>
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button type="button" className="btn btn-primary btn-lg">
          +Add Cards
        </button>
      </Link>
    </div>
  );
}

export default NotEnoughCards;