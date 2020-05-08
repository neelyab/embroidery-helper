import React from 'react';
import Nav from './Nav/nav';
import {Route} from 'react-router-dom';
import EmbroideryHelper from './EmbroideryHelper/embroidery-helper';
import Login from './Login/login';
import SignUp from './SignUp/signup';
import About from './About/about';

function App() {
  return (
    <main className='App'>
      <Route path='/' component={Nav}/>
      <Route exact path='/' component={EmbroideryHelper}/>
      <Route path='/login' component={Login}/>
      <Route path='/sign-up' component={SignUp}/>
      <Route path='/about' component={About}/>
    </main>
  );
}

export default App;