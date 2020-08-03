import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Register from './users/Register';
import Login from './sessions/Login';
import Logout from './sessions/Logout';
import Connections from './connections/Index';
import NewConnection from './connections/New';
import EditConnection from './connections/Edit';

function Routes ({user, setUser}) {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/register" render={
              renderProps => <Register
                {...renderProps}
                setUser={setUser}
              />
            }/>
            <Route exact path="/login" render={
              renderProps => <Login
                {...renderProps}
                setUser={setUser}
              />
            }/>
            <Route exact path="/logout" render={
              renderProps => <Logout
                {...renderProps}
                setUser={setUser}
              />
            }/>
            <Route exact path="/connections" render={
              renderProps => <Connections
                {...renderProps}
                user={user}
              />
            }/>
            <Route exact path="/connections/new" component={NewConnection}/>
            <Route exact path="/connections/edit" render={
              props => user ? (
                <EditConnection {...props} />
              ) : (
                <Redirect to="/"/>
              )
            }/>
        </Switch>
    );
}
export default Routes;