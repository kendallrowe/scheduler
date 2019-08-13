import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {

  const listItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li
      className={listItemClass}
      onClick={props.setDay}
      data-testid="day"
    >
      <h3>{props.name}</h3>
      {props.spots === 0 ? "no" : props.spots} spot{props.spots !== 1 && "s"} remaining
    </li>
  );
}