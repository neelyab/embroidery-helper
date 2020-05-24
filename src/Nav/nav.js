import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './nav.css';
import TokenService from '../services/token-service';

class Nav extends Component {
    logout = () => {
        TokenService.clearAuthToken();
    }
    render(){
        const token = TokenService.hasAuthToken();
        return(
            <nav>
               <Link to='/'><li>Home</li></Link>
                {!token ? 
                  <>
                <Link to='/sign-up'><li>Sign Up</li></Link>
                <Link to='/login'><li>Log In</li></Link> 
                <Link to='/demo'><li>Demo</li></Link>
                </>
                : 
                <>
                <Link to='/login' onClick={this.logout}><li>Log Out</li></Link>
                <Link to='/about'><li>About</li></Link>
                </>}
            </nav>
        )
    }
}

export default Nav;