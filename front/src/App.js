import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/login';
import NewAcc from './components/auth/NewAcc';
import Projects from './components/projects/projects';
import ProjectState from './context/projects/projectstate'; 
import TaskState from './context/tasks/taskstate';
import AlertState from './context/alerts/alertstate';
import AuthState from './context/authorization/authState';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/PrivateRoute';


// check for token 
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}
function App() {
  
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-acc" component={NewAcc} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
