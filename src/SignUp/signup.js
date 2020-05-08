import React, {Component} from 'react'
import './signup.css'

class SignUp extends Component {
    render(){
        return (<div>
            <form className="signup">
                <label htmlFor="first-name">First Name:</label>
                <input type="text" id="first-name" name="first-name"></input>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username"></input>
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" name="password"></input>
                <label htmlFor="repeat-password">Re-enter Password:</label>
                <input type="text" id="repeat-password" name="repeat-password"></input>
                <button type="submit">Submit</button>
            </form>
        </div>)
    }
}
export default SignUp;