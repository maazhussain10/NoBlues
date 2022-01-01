import HomePage from './component/homepage'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './component/signup';
import Login from './component/login';
import Dashboard from './component/dashboard';
import Campus from './component/Campus/campus';
import MyQueries from './component/Campus/myqueries';
import AnswerQuery from './component/Campus/answerquery';
import ClearQueries from './component/Campus/clearqueries';
import CampuShare from './component/campushare/campushare';
import Chat from './component/Campus/chat';
import Settings from './component/settings';
import Profile from './component/profile';
import Pricing from './component/pricing';
import RegisterCampus from './component/registerCampus';

function App() {
     return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/registration' component={RegisterCampus}/>
          <Route exact path='/:username/dashboard' component={Dashboard} />
          <Route exact path='/:username/campushare' component={CampuShare} />
          <Route exact path='/:username/settings' component={Settings} />
          <Route exact path='/:username/profile' component={Profile} />
          <Route exact path='/:username/:campusname' component={Campus} />
          <Route exact path='/:username/:campusname/myqueries' component={MyQueries} />
          <Route exact path='/:username/:campusname/answerquery' component={AnswerQuery} />
          <Route exact path='/:username/:campusname/clearqueries' component={ClearQueries} />
          <Route exact path='/:username/:campusname/chat' component={Chat} />
        </Switch>
      </Router>
    );
}

export default App;
