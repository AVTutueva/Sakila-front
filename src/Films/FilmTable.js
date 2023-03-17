import React from "react";
import SingleFilm from "./Film";
import PropTypes from "prop-types";

function FilmTable(props) {

  return (
    <table>
    <tbody>
      <tr>
        <th>№</th>
        <th>Title</th>
        <th>Description</th>
        <th>Year</th>
      </tr>
      {props.films.map((film, index) => {
        return (
          <SingleFilm
            film={film}
            key={film.id}
            index={index}
          />
        );
      })}
      </tbody>
    </table>
  );
}

FilmTable.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FilmTable;
