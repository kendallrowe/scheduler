import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import { useVisualMode } from "../../hooks/useVisualMode";
const  EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { mode } = useVisualMode(EMPTY);

  return (
    <article className="appointment">
      {mode === EMPTY && <Empty />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {/* <Header time={props.time}/>
      {!props.interview && <Empty
        onAdd={e => console.log("clicked")}
      />
      }
      {props.interview && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={e => console.log("edited")}
        onDelete={e => console.log("deleted")}
      />} */}
    </article>
  );
}