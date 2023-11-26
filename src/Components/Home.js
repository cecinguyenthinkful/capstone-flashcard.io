import React from "react";
import { Link } from "react-router-dom";
import DecksInSet from "../Components/DecksInSet.js";

function Home() {
  return (
    <>
      <div className="container">
        <Link to={`/decks/new`}>
          <button
            type="button"
            className="btn btn-secondary btn-lg create-button"
          >
            +Create Deck
          </button>
        </Link>
        <div>
          <DecksInSet />
        </div>
      </div>
    </>
  );
}

export default Home;