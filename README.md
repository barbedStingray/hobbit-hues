
## Welcome to Hobbit Hues!

This is my solo project completed for Prime Digital Academy! I really enjoyed working on this, and I think I've produced a great product that shows all that i've learned throughout school thus far. 

If you enjoy painting miniature models as much as I do, then this app is for you! Enjoy a smooth experience in creating new projects, viewing color theory, and selecting a palette that you can use to paint your miniatures. Create and view your own step by step guide to how you uniquely paint your models, or, if you need inspirations, view models that others have painted!

Your models, your choice. You can use this app privately, or publicly, the choice is yours. Every model in your collection has the option to be shared for public display. Love what you painted? Share it to the world! Want to keep your secret techniques to yourself? That's ok too! 

Whichever way you choose to use this app, I hope you enjoy being able to create and reflect upon all the good times you've had with your miniatures. :D

## Color Wheel

Enjoy an interactive display to see how the different colors look together. You can select your colors by hexcode, citadel paint reference, or a simple "select a color" option. Whichever you decide, watch the colors on your palette transform magically until you settle on a palette for new project. 

## Create a Project!

After clicking the "create new project" button. This is your chance to set the stage for your new models profile. Give it a name, a description, and attach a photo so you can see where it all started! After clicking submit, you'll be able to find your new project on the "projects" page. 

## Projects

This is a list of all your projects that you have created. Enjoy reminiscing in the glorious models you have painted or enjoy thoughts of how beautiful they looked when conquering your enemy. If you'd like to see the details of a model, simply click on it.

## Model Details

Here we have the step by step process of how you decided to paint your model. You have complete control of how you edit this page, as you can display each paint that you used on your model, accompanied by a photo to help you visualize the affect. This allows you to build your step by step guide to painting the greatest warrior of Minas Tirith the earth has ever seen... or whatever you're doing. Feel free to make adjustments to your paints, or the original model photo and description as this is YOUR projects, so make it how you like! If you're proud of it, make it public by switching the toggle button to display "public", or... if it's ugly, trash the entire model with the simple delete button. 


## Community

Here is where the inspiration happens. View what other people are painting and look for cool color combinations, or other tips and tricks! If you'd like to see the details of a particular model, simply click on the model.

## Community Details

Once a model has been selected, you will be able to see all the details just as if you were viewing your own models details. Although, none of it will be editable, because we don't touch other peoples stuff. hah. Enjoy perusing at your lesiure the creative minds of others. 

## Info Page

If you're stuck, or frustrated, come to the info page! Here, you can find some helpful hints on the quirks of Hobbit Hues. Also, i've provided a shortlist of descriptions that reference the various techniques that have helped me throughout the years. Happy Painting!













## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
