
## Overall Goals and Functionalities for Hobbit Hues

[] Create Log in/registration page
    [x] User able to log in
        [x] functionality to log into an account
        [x] CSS formatting
    [x] User able to register new account
        [x] functionality to register a new account
        [x] CSS formatting
    [] Double check that pathways work
    [] delete the extra sign in and registration pages

[] Create home page (color wheel)
    [] Button to go to the Form page
    [x] Home page title
        [x] css styling
        [x] display name
    [x] Viewable, interactive color wheel
        [x] Three <input> Types (textbox, color input, select menu)
            [x] <input> type='color' of primary and secondary color
                [x] assign to variables
                [x] interactive color selection
            [x] <input> type='text' hex code of primary and secondary color
                [x] assign to variables
                [x] selectable based on hexcode
            [x] Input <select> <options> Citadel paint lists of primary and secondary color
                [x] assign to variables
                [x] selectable based on citadel paints
                [x] AXIOS.get request to table "paints"
        [x] Function hexCode => HSL
            [x] conversion successful hexcode => HSL
            [x] ability to assign variables based on inputs
        [x] Two <div>'s to contain color displays
            [x] primary and secondary <div>
                [x] display colors based on input selection
                [x] shades sample (css variables)
                [x] complimentary, triad, and analagous color sample (css variables)
        [x] CSS Styling 

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

[] Project Form Page
    [] <input> model name
    [] captured variables primary (& secondary?)
    [] <button> submit form
        [] AXIOS.post request to create new user project
    [] direct to (new) details project page
        [] request? (reducer, saga, axios?) to fill in details of new project
            [] display even after page refresh


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

                

## About Page
[] about the app, why it was created, what it's useful for
[] fluff it up and advertise it
[] lotr puns

## Info Page
[] what the app contains
[] how to use it
