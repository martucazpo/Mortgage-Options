import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./EditButton.css";

class EditBtn extends Component {
  render() {
    return (
      <Link to={"/registration/" + this.props.id}>
        <button
          className="btn btn-large waves-effect waves-light hoverable black"
          type="button"
        >
          Edit
        </button>
      </Link>
    );
  }
}

export default EditBtn;
