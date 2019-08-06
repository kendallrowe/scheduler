import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

// const classNames = require('classnames');

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

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
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={setInterviewer}
        />
      </div>
      <div className="appointment__card-right">
        <div className="appointment__actions">
          <Button danger={true} onClick={props.onCancel}>Cancel</Button>
          <Button confirm={true} onClick={props.onSave}>Save</Button>
        </div>
      </div>
    </article>
  )
}
