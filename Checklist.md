
## Overall Goals and Functionalities for Hobbit Hues

[] Create Log in/registration page
    [x] User able to log in
        [x] functionality to log into an account
        [] CSS formatting
    [x] User able to register new account
        [x] functionality to register a new account
        [] CSS formatting

[] Create home page (color wheel)
    [] Home page title
        [] css styling
        [] display name
    [] Add New Project Form
        [] <input> model name
        [] captured variables primary (& secondary?)
        [] <button> submit form
            [] AXIOS.post request to create new user project
        [] direct to (new) details project page
            [] request? (reducer, saga, axios?) to fill in details of new project
                [] display even after page refresh
    [] Viewable, interactive color wheel
        [] Three <input> Types (textbox, color input, select menu)
            [] <input> type='color' of primary and secondary color
                [] assign to variables
                [] interactive color selection
            [] <input> type='text' hex code of primary and secondary color
                [] assign to variables
                [] selectable based on hexcode
            [] Input <select> <options> Citadel paint lists of primary and secondary color
                [] assign to variables
                [] selectable based on citadel paints
                [] AXIOS.get request to table "paints"
        [] Function hexCode => HSL
            [] conversion successful hexcode => HSL
            [] ability to assign variables based on inputs
        [] Two <div>'s to contain color displays
            [] primary and secondary <div>
                [] display colors based on input selection
                [] shades sample (css variables)
                [] complimentary, triad, and analagous color sample (css variables)
        [] CSS Styling 

[] Create Project Page
    [] Project page title
        [] css styling
        [] display name
    [] <div> list of all created user projects
        [] css styling
            [] how would you like this to look?
        [] display view of all individual <div> user projects
            [] Individual Project attributes
                [] title/model name
                [] palette code
                [] image?
                [] ??? other options ???

[] Create Project Details Page
    [] page abilities
        [] contents stay after page refresh
    [] Project details title
        [] css styling
        [] display name of model
    [] Color wheel display (Display optional)
        [] Display your color wheel again
        [] <button> to display/hide the wheel when necessary
    [] Project details
        [] Image display??
            [] image upload?
        [] display palette code
            [] editable AXIOS.put route
        [] paints used display list
            [] list out paints used
            [] techniques describe how the paint was used
            [] paints are editable AXIOS.put
            [] new paint color and technique can be added AXIOS.post

                
## Database Structure
[] Data Structure tables
    [] user table
        [] id
        [] username
        [] password
    [] projects table
        [] id
        [] model
        [] palette
    [] paints table
        [] id
        [] paint
        [] hexcode
    [] JUNCTION: user_projects
        [] id
        [] user_id
        [] project_id
    [] JUNCTION: projects_paints
        [] id
        [] project_id
        [] paint_id
        [] technique


## About Page
[] about the app, why it was created, what it's useful for
[] fluff it up and advertise it
[] lotr puns

## Info Page
[] what the app contains
[] how to use it
