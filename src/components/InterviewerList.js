import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map( (interviewer, index) => {
    return <InterviewerListItem 
      key={index} 
      onChange={(event) => props.onChange(interviewer.id)} 
      name={interviewer.name} 
      id={interviewer.id} 
      selected={interviewer.id === props.value} 
      avatar={interviewer.avatar}/>
    });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}
