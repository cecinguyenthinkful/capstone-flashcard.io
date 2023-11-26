import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index.js";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({
    id: "",
    name: "",
    description: "",
    cards: [],
  });

  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const [name, setName] = useState(deck.name);
  const [description, setDescription] = useState(deck.description);

  const handleChange = ({target}) => {
    const value = target.value;
    setDeck({
      ...deck,
      [target.name]: value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`/decks/${deck.id}`);
  };

  function Breadcrumb() {
    return (
      <nav aria-label="breadcrumb" style={{ padding: "5px 10px" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">Edit Deck</li>
        </ol>
      </nav>
    );
  }

  return (
    <>
      <div>
        <Breadcrumb />
      </div>
      <div className="container">
        <h2>Edit Deck</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br></br>
          <input
            className="container fluid mb-3"
            id="name"
            name="name"
            onChange={handleChange}
            value={deck.name}
          />
          <br></br>
          <label htmlFor="Description"></label>
          Description
          <br></br>
          <textarea
            className="container fluid"
            id="description"
            name="description"
            rows={4}
            onChange={handleChange}
            value={deck.description}
          />
        <div className="row ml-1">
          <Link to={`/decks/${deck.id}`}>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
        </form>
      </div>
    </>
  );
}

export default EditDeck;