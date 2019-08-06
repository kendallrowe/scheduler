import React from "react";


export default function Show(props) { 

  return (
    <article className="appointment__card appointment__card--show">
      <div className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <div className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer.name}</h3>
        </div>
      </div>
      <div className="appointment__card-right">
        <div className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            onClick={props.onEdit}
            alt="Edit"
          />
          <img
            className="appointment__actions-button"
            onClick={props.onDelete}
            src="images/trash.png"
            alt="Delete"
          />
        </div>
      </div>
    </article>
  )
}