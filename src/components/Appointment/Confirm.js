import React from "react";
import Button from "../Button";

export default function Confirm(props) {

  return (
    <article className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <div className="appointment__actions">
        <Button danger={true} onClick={props.onCancel}>Cancel</Button>
        <Button danger={true} onClick={props.onConfirm}>Confirm</Button>
      </div>
    </article>
  )
}