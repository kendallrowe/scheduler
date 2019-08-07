import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment/index";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Kendall Rowe",
      interviewer: {
        id: 3,
        name: "Victoria",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "I'm a person",
      interviewer: {
        id: 4,
        name: "I'm an interviewer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Wowowowowowow",
      interviewer: {
        id: 1,
        name: "weeweeweeeeweeewee",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/days`)
    .then((res) => {
      setDays(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu" >
            <DayList
              days={days}
              day={day}
              setDay={day => setDay(day)}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          return <Appointment 
            key={appointment.id}
            {...appointment}
          />
        })}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
