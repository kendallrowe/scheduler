import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  function clearInputOnCancel() {
    setName("");
    props.onCancel();
  };

  return (
    <article className="appointment__card appointment__card--create">
      <div className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            value={name} 
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={setInterviewer}
        />
      </div>
      <div className="appointment__card-right">
        <div className="appointment__actions">
          <Button danger={true} onClick={e => clearInputOnCancel()}>Cancel</Button>
          <Button confirm={true} onClick={e => validate()}>Save</Button>
        </div>
      </div>
    </article>
  )
}
