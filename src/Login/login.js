import React, {Component} from 'react'
import './login.css'

class Login extends Component {
    render(){
        return (<div>
            <form className="login">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username"></input>
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" name="password"></input>
                <button type="submit">Submit</button>
            </form>
        </div>)
    }
}
export default Login;