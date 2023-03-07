import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "./context";

function SingleFilm({ film, index }) {
  const { removeFilm } = useContext(Context);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{film.title}</td>
      <td>{film.description}</td>
      <td>{film.year}</td>
      <td>
        <button
          className="deleteButton"
          onClick={removeFilm.bind(null, film.id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
}

SingleFilm.propTypes = {
  film: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default SingleFilm;
