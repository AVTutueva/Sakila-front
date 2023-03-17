import React, { useState } from "react";
import PropTypes from "prop-types";
// import { categories } from "./Categories";

function AddFilm(props) {

  const options = props.categories_new.length > 0 ? (props.categories_new) : ""
  console.log("my options", options)

  const [state, setValue] = useState({
    title: "",
    description: "",
    year: "",
    category: "==Category=="
    //category: props.categories_new.length > 0 ? (props.categories_new[0].name) : ""
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
      error.error = "Title is empty"
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
    if (state.category === "==Category=="){
      error.status = true
      error.error = "Please, choose category"
      return error
    }


    return error
  }

  function submitHandler(event) {
    event.preventDefault();
    const error = checkInputs(state)
    if (!error.status) {
      props.onCreate(state);
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


      <select name="category" onChange={handleChange} defaultValue={props.categories_new.length > 0 ? (props.categories_new[0].name) : ""}>
      <option>==Category==</option>
      {props.categories_new.length > 0 ? props.categories_new.map((elem, id) => (<option value={elem.name} key={elem.id}>{elem.name}</option>)) : ""}
 
      </select>
      </label>
      <br/>
 
      <button type="submit">Add</button>
    </form>
  );

  //
}

AddFilm.propTypes = {
  categories_new: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default AddFilm;
