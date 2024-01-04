
## Overall Goals and Functionalities for Hobbit Hues

[] Create Log in/registration page
    [x] User able to log in
        [x] functionality to log into an account
        [x] CSS formatting
    [x] User able to register new account
        [x] functionality to register a new account
        [x] CSS formatting
    [x] Double check that pathways work
    [] delete the extra sign in and registration pages

[] Create home page (color wheel)
    [x] Button to go to the Form page
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
        [x] display name
    [] <div> list of all created user projects
        [] css styling
            [] how would you like this to look?
        [x] display view of all individual <div> user projects
            [x] Individual Project attributes
                [x] title/model name
                [] palette code
                [x] image?
                [] ??? other options ???

[] Project Form Page
    [x] <input> model name
    [x] <textarea> model description
    [x] captured variables primary (& secondary?)
    [x] <button> submit form
        [x] AXIOS.post request to create new user project
    [x] direct to project page
        [x] display even after page refresh


[] Create Project Details Page
    [] page abilities
        [x] contents stay after page refresh
    [] Project details title
        [] css styling
        [x] display name of model
    [] Color wheel display (Display optional)
        [x] Display your color wheel again
        <!-- [] <button> to display/hide the wheel when necessary -->
    [] Project details
        [x] Image display??
            [x] image upload?
        [] display palette code
            [] editable AXIOS.put route
        [] paints used display list
            [x] list out paints used
            [x] techniques describe how the paint was used
            [] paints are editable AXIOS.put
            [x] new paint color and technique can be added AXIOS.post

                

## About Page
[] about the app, why it was created, what it's useful for
[] describe your personal connection to it

## Info Page
[] desctiptions of the techniques
[] how to use it
[] clarify parts that may be less specific
