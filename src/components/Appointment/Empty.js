import React from "react";
// import DayListItem from "./DayListItem";

export default function Empty(props) {
  return (
    <article className="appointment__add">
      <img
        className="appointment__add-button"
        onClick={props.onAdd}
        src="images/add.png"
        alt="Add"
      />
    </article>
  )
}