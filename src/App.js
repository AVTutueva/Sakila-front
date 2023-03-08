import React, { useEffect } from "react";
import FilmTable from "./Films/FilmTable";
import Context from "./Films/context";
import AddFilm from "./Films/AddFilm";
import Axios from "axios";
import { categories } from "./Films/Categories";
import { apiUrl } from "./config/constants";

function App() {
  const [films, setFilms] = React.useState({});

  useEffect(() => {


    Axios.get(`${apiUrl}/films`).then((response) =>
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

  // temporary comment
  // removing the film
  function removeFilm(id) {
    const request_to_delete = `${apiUrl}/films${id}`;
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

    fetch(`${apiUrl}/films`, {
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
