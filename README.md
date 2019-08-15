# Interview Scheduler

The LHL Interview Scheduler is a single page application built using React. This application allows users to book student names and select from an interview list to create interview appointments during a set week.

The application persists data using a separate API server using a PostgreSQL database to which it communicates via HTTP JSON formatted requests.

As stretch goals for this project, the application is [hosted on Netlify](https://adoring-morse-d140ea.netlify.com), features the use of  Websockets for live update rendering across browsers, and a complete suite of unit, integration, and end to end testing.

[![CircleCI](https://circleci.com/gh/kendallrowe/scheduler.svg?style=shield)](https://circleci.com/gh/kendallrowe/scheduler)

## Setup

Install dependencies with `npm install`.

## How to Use
1. Home page on desktop for Interview Scheduler!
!["Home page on desktop for Interview Scheduler!"](public/docs/home-page.png)

2. Select a day by clicking on the sidebar and, once, selected, simply click a plus button to book an interview in an empty slot! 
!["Select a day by clicking on the sidebar and, once, selected, simply click a plus button to book an interview in an empty slot!"](public/docs/empty-create-interview.png)

3. Fill in the interviewee name and click on a headshot of one of our wonderful interviewers.

!["Fill in the interviewee name and click on a headshot of one of our wonderful interviewers."](public/docs/create-an-interview.png)

4. Simply click save and your new interview will be added.

!["Simply click save and your new interview will be added."](public/docs/saved-appointment.png)

5. Made a mistake? No problem, you can edit or delete appointments easily. 

!["Made a mistake? No problem, you can edit or delete appointments easily. "](public/docs/delete-confirmation.png)

6. Click confirm and your interview will become a distant memory. 

!["Click confirm and your interview will become a distant memory. "](public/docs/deleting-status.png)

## Dependencies

- Classnames
- Normalize
- React
- React Testing Library

## Getting Started
- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm start` command.
- View the server at [http://localhost:3000/](http://localhost:3000/)
- NOTE: The server makes API calls to the Heroku server [https://kr-scheduler-lhl.herokuapp.com/](https://kr-scheduler-lhl.herokuapp.com/)

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
