import React, { useState } from "react";
import PropTypes from "prop-types";
import { categories } from "./Categories";


function AddFilm({ onCreate }) {
  const [state, setValue] = useState({
    title: "",
    description: "",
    year: "",
    category: Object.keys(categories)[0]
  });

  function handleChange(event) {
    const temp = event.target.value;
    setValue({
      ...state,
      [event.target.name]: temp,
    });

  }


  function checkInputs(state) {
    const error = {status: false, error: ""} 
    if (!state.title.trim()) {
      error.status = true
      error.error = "Titile is empty"
      return error 
    }
    if (!state.description.trim()) {
      error.status = true
      error.error = "Desciption is empty"
      return error
    }
    if (!+(state.year)){
      error.status = true
      error.error = "Year must be integer"
      return error
    }
    if (!(state.year.length === 4)){
      error.status = true
      error.error = "Year must be 4 digits"
      return error
    }
    return error
  }

  function submitHandler(event) {
    event.preventDefault();
    const error = checkInputs(state)
    if (!error.status) {
      onCreate(state);
      setValue({title: "", description: "", year: ""})
    }
    else{
        alert(error.error)
        console.log(error.error)
    }
    
  }

  return (
    <form onSubmit={submitHandler}>
      <label>
        Title: <br />
        <input name="title" value={state.title} onChange={handleChange} />
        <br />
      </label>
      <label>
        Description: <br />
        <input
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <br />
      </label>
      <label>
        Year: <br />
        <input name="year" value={state.year} onChange={handleChange} />
        <br />
      </label>
      <label>
      Category: <br/>
        <select name="category" onChange={handleChange}>
        {Object.keys(categories).map((elem) => (<option>{elem}</option>))}
        </select>
      </label>
      <br/>
 
      <button type="submit">Add</button>
    </form>
  );
}

AddFilm.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddFilm;
