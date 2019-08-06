import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map( (day, index) => <DayListItem key={index} setDay={(event) => props.setDay(day.name)} name={day.name} spots={day.spots} selected={day.name === props.day}/>);
  return (
    <ul>
      {days}
    </ul>
  );
}