import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";


storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

  storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

// Interview List Item
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      onChange={action("onChange")}
    />
  ));

// InterviewerList
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("onChange")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action("onChange")}
    />
  ));

  // Appointment
  // Header
storiesOf("Appointment", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Appointment", () => <Appointment />)
.add("Appointment with Time", () => <Appointment time="12pm" />)
.add("Appointment Empty", () => (
  <Fragment>
    <Appointment id={1} time="12pm" />
    <Appointment id="last" time="1pm" />
  </Fragment>
))
.add("Appointment Booked", () => (
  <Fragment>
    <Appointment
      id={1}
      time="12pm"
      interview={{ student: "Lydia Miller-Jones", interviewer }}
    />
    <Appointment id="last" time="1pm" />
  </Fragment>
))

storiesOf("Empty", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Empty", () => <Empty onAdd={e => console.log("hi")}/>);

storiesOf("Show", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Show", () => {
    return <Show 
      onEdit={e => console.log("Edited")} 
      onDelete={e => console.log("Deleted")}
      student="Lydia Miller-Jones"
      interviewer = {{
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }}
      />
    }
  );

storiesOf("Confirm", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Confirm", () => {
  return <Confirm 
    message={"Delete the appointment?"}
    onConfirm={e => console.log("Confirmed")}
    onCancel={e => console.log("Cancelled")}
    />
  }
);

storiesOf("Status", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Status", () => {
  return <Status 
    message={"Deleting"}
    />
  }
);

storiesOf("Error", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Error", () => {
  return <Error 
    message={"Could not delete appointment."}
    onClose={e => console.log("Closed")}
    />
  }
);

// Form
storiesOf("Form", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Form create mode", () => {
  return <Form 
    name={""}
    interviewer={null}
    interviewers={interviewers}
    onSave={e => console.log("saved")}
    onCancel={e => console.log("cancel")}
    onChange={action("onChange")}
    />
  }
)
.add("Form edit mode", () => {
  return <Form 
    name={"Archie Cohen"}
    interviewer={1}
    interviewers={interviewers}
    onSave={e => console.log("saved")}
    onCancel={e => console.log("cancel")}
    onChange={action("onChange")}
    />
  }
);