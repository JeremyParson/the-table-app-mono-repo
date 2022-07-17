# The Table App
## Description
The Table is a web application that provides Dungeons and Dragons players with the resources
necessary to play the game online with friends. It hosts simple tools for creating campaigns, session management, character creation, and much more. I made this app because I enjoy playing Dungeons and Dragons with friends and sometimes you can't meet up in person. 

## Demo
You can visit the site by clicking [here](http://thetable.us-east-1.elasticbeanstalk.com/).
Once you create an account you can access the apps features through the dashboard. You can create a campaign, characters, and handouts to give to players.

## Technologies
This app was built with the following technologies:
React JS
Express JS
Mongoose
Socket IO

### Frontend
The frontend uses a Presentation, Domain, and Data layer architecture to allow separation of concerns in large stateful components.

### Backend
The backend is a REST api that uses an ORM that interfaces with a remote mongo database.

## Bugs and missing features.
- Character creation needs more polishing
- Campaign resources cannot be edited
- Server does not parse list data properly
- Typing the roll command in chat incorrectly crashes the app
- Socket io updates are buggy between mobile and desktop
- Certain resources should not be visible to players in session
- GM should be able to see additional information
