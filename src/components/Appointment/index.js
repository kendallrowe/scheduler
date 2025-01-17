import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Error from "./Error";
import Status from "./Status";
import Confirm from "./Confirm";
import { useVisualMode } from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING);
    props.bookInterview(props.id, {
      student: name,
      interviewer
    })
    .then(res => transition(SHOW))
    .catch(err => {
      transition(ERROR_SAVE, true)
    });
  };
  
  const deleteThisInterview = () => {
    transition(DELETING, true)
    props.deleteInterview(props.id)
    .then(res => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true));
  };

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }

    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [transition, props.interview, mode]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={(e) => transition(CREATE)}/>}
      {mode === SAVING && <Status message="SAVING"/>}
      {mode === ERROR_SAVE && <Error message="Oops! Looks like there was an issue saving appointment on our end. Try again and contact support if the issue continues." onClose={e => back()}/>}
      {mode === DELETING && <Status message="DELETING"/>}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={e => back()}/>}
      {mode === CONFIRM && <Confirm onConfirm={deleteThisInterview} onCancel={e => back()} message="Delete the appointment?"/>}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={e => transition(EDIT)}
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
        />
      )}
      {mode === EDIT && (
        <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={e => back()}
        />
      )}
    </article>
  );
}