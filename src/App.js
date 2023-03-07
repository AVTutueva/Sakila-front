import React, { useEffect } from "react";
import FilmTable from "./Films/FilmTable";
import Context from "./Films/context";
import AddFilm from "./Films/AddFilm";
import axios from "axios";

const categories = {
  Action: 1,
  Animation: 2,
  Children: 3,
  Classics: 4,
  Comedy: 5,
  Documentary: 6,
  Drama: 7,
  Family: 8,
  Foreign: 9,
  Games: 10,
  Horror: 11,
  Music: 12,
  New: 13,
  "Sci-Fi": 14,
  Sports: 15,
  Travel: 16,
};

function App() {
  const [films, setFilms] = React.useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/films").then((response) =>
      setFilms(
        response.data.map(function (element) {
          const new_film = {
            id: element.FilmId,
            title: element.Title,
            description: element.Description,
            year: element.ReleaseYear,
          };
          return new_film;
        })
      )
    );
  }, []);

  // removing the film
  function removeFilm(id) {
    const request_to_delete = `http://localhost:8080/films/${id}`;
    fetch(request_to_delete, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((response) => {
        setFilms(films.filter((film) => film.id !== id));
      })
      .catch((error) => {
        alert(error.statusText);
        console.log(error);
      });
  }

  // adding a new film
  function addFilm(state) {
    console.log(categories[state.category]);
    console.log(state.category);
    const jsonFilm = {
      Title: state.title,
      Description: state.description,
      ReleaseYear: parseInt(state.year),
      LanguageId: 1,
      OriginalLanguageId: 0,
      RentalDuration: 7,
      RentalRate: 2.99,
      Length: 136,
      ReplacementCost: 14.99,
      Rating: "PG",
      SpecialFeatures: "Trailers",
      Categories: [
        {
          CategoryId: categories[state.category],
          Name: state.category,
        },
      ],
    };

    fetch("http://localhost:8080/films/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonFilm),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((response) => {
        setFilms(
          films.concat([
            {
              id: response.FilmId,
              title: state.title,
              description: state.description,
              year: state.year,
            },
          ])
        );
      })
      .catch((error) => {
        alert(error.statusText);
        console.log(error);
      });
  }

  return (
    <Context.Provider value={{ removeFilm }}>
      <div className="wrapper">
        <h1>List of films</h1>
        <AddFilm onCreate={addFilm} />
        {films.length ? <FilmTable films={films} /> : <p>No films to show</p>}
      </div>
    </Context.Provider>
  );
}

export default App;
