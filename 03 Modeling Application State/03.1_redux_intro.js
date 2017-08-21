// Redux - predictable state container for JS applications
//  => a collection of all the data that describes the app (both hard and meta data)
//  => all of the apps data is centralized into one JS object (the State)
//     - application state
// => figuring out how to design state is hugly important

// An example JS app has two parts

// Data contained in the App (Redux)
//  1. list of books
//  2. currently selected books

// Views contained in the App (React - translates data so it can be seen on screen)
//  1. list view
//  2. list item
//  3. detail view

// two come together to make working app


// Counter example for Redux //

// + (add one)    - (remove one)
//        Count: 3

// Data contained in the App (Redux - keeping track of the current state)
//  1. Current Count

// Views contained in the App (React)
//  1. Count changing buttons
//  2. Current Count


// Tinder example for Redux //

// Data contained in the App (Redux - keeping track of the current state)
// Five pieces of state
//  1. Users (images and chat logs)
//  2. List of Users to be reviewed         swiping screen data
//  3. Currently viewed user for swiping    swiping screen data
//  4. List of conversations                convo list screen data
//  5. Currently viewed conversation        currenet convo screen data

// Views contained in the App (React)
//  1. Image card
//  2. List of conversations
//  3. Text List
//  4. Like/ Dislike buttons
//  5. Text item (individual conversation)
