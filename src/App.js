import { ContactApp } from './pages/ContactApp';
import { ContactEdit } from './pages/ContactEdit';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route component={ContactEdit} path='/contact/edit/:id?' />
          <Route component={ContactApp} path='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
