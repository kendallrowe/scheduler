import React from "react";

export default function Error(props) {

  return (
    <article className="appointment__card appointment__card--error">
      <div className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </div>
      <img
        className="appointment__error-close"
        onClick={props.onClose}
        src="images/close.png"
        alt="Close"
      />
    </article>
  )
}