import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import { useVisualMode } from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING);
    props.bookInterview(props.id, {
      student: name,
      interviewer
    })
    .then((res) => transition(SHOW));
  };
  
  const deleteThisInterview = () => {
    transition(DELETING)
    props.deleteInterview(props.id)
    .then((res) => transition(EMPTY));
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={(e) => transition(CREATE)}/>}
      {mode === SAVING && <Status message="SAVING"/>}
      {mode === DELETING && <Status message="DELETING"/>}
      {mode === CONFIRM && <Confirm onConfirm={deleteThisInterview} onCancel={e => back()} message="Delete the appointment?"/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={e => console.log("edited")}
          onDelete={e => transition(CONFIRM)}
          mode={mode}
        />
      )}
      {mode === CREATE && (
        <Form 
        name={""}
        interviewer={null}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={e => back()}
        onChange={e => console.log("change")}
        />
      )}
    </article>
  );
}