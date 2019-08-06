import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {!props.interview && <Empty
        onAdd={e => console.log("clicked")}
      />
      }
      {props.interview && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={e => console.log("edited")}
        onDelete={e => console.log("deleted")}
      />}
    </article>
  );
}