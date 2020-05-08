import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render(){
        return(
            <nav>
                <Link to='/'><li>Home</li></Link>
                <Link to='/sign-up'><li>Sign Up</li></Link>
                <Link to='/login'><li>Log In</li></Link>
                <Link to='/about'><li>About</li></Link>
            </nav>
        )
    }
}

export default Nav;