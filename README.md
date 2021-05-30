# Connector

## Technologies Used : 
### Front-End : React + Redux
### Back-End : Node + Express + MongoDB(database)

## Redux : 

#### Store : A store is an immutable object tree in Redux. A store is a state container which holds the application’s state. Redux can have only a single store in your application. 

#### Actions :   Actions are plain JavaScript object that must have a type attribute to indicate the type of action performed. It tells us what had happened. 
               1.Redux specific
               2.Can be dispatched from react
               3.Describe what will happen to the state
               4.Have a requied "type" property
               5.Can have any other optional property
      For example, an action with the type "LOGIN_SUCCESS" might change a property of Redux state called isAuthenticated from false to true.
 
#### Action Creators : 
              1.Action creators are the functions that encapsulate the process of creation of an action object.
              2.These functions simply return a plain Js object which is an action.
              3.Action creator function dispatches an action to the store
              4.No change required to reducer
      By using actions and action creators, we've given ourselves a consistent way to describe the different behaviors our users can take for our application.
             
#### Reducers : 
              1.Reducers are a pure function in Redux.
              2. Reducers are the only way to change states in Redux.
              3.It is the only place where you can write logic and calculations. 
              4.Reducer function will accept the previous state of app and action being dispatched, calculate the next state and returns the new object.
              5.The following few things should never be performed inside the reducer −

                  Mutation of functions arguments
                  API calls & routing logic
                  Calling non-pure function e.g. Math.random()

