import React from 'react';
import Nav from './Nav/nav';
import {Route} from 'react-router-dom';
import EmbroideryHelper from './EmbroideryHelper/embroidery-helper';
import Login from './Login/login';
import SignUp from './SignUp/signup';
import About from './About/about';
import PublicRoute from './Utils/PublicOnlyRoute'
import PrivateRoute from './Utils/PrivateRoute'

function App() {
  return (
    <main className='App'>
      <Route path='/' component={Nav}/>
      <PrivateRoute exact path='/' component={EmbroideryHelper}/>
      <PublicRoute path='/login' component={Login}/>
      <PublicRoute path='/sign-up' component={SignUp}/>
      <Route path='/about' component={About}/>
      <footer></footer>
    </main>
  );
}

export default App;