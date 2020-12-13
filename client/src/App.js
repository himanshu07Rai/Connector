import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Components/Layout/Landing';
import Navbar from './Components/Layout/Navbar';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
