import React, {Component} from 'react'
import './signup.css'
import config from '../config'

class SignUp extends Component {
    state = {error: null}
    handleSubmit = e => {
        this.setState({error: null})
        e.preventDefault()

        const { username, password, first_name, repeat_password } = e.target
        const REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

        if(password.value.length < 6 ){
            this.setState({error: 'Password must be greater than 6 characters.'})
        }
        if(!REGEX.test(password)){
            this.setState({error:'Password must contain one upper case, lower case, number and special character.'})
        }
        if(password.value !== repeat_password.value){
            this.setState({error: 'Passwords do no match.'})
        }
        const user = {
            username: username.value,
            first_name: first_name.value,
            user_password: password.value
        }
        fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
             'content-type': 'application/json',
            },
            body: JSON.stringify(user),
           })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e)
                )
                : res.json()
                 )
            .then(user => {
                username.value = ''
                password.value = ''
                first_name.value = ''
                repeat_password.value = ''
                this.props.history.push('/login')
            })
            .catch(res => {
                this.setState({error: res.error})
            })

    }
    render(){
        return (<div>
            <form className="signup" onSubmit={this.handleSubmit}>
                {this.state.error && <p>{this.state.error}</p>}
                <label htmlFor="first-name">First Name:</label>
                <input type="text" id="first-name" name="first_name" required></input>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required></input>
                <label htmlFor="password" onChange={this.password}>Password:</label>
                <input type="password" id="password" name="password" required></input>
                <p className = "password-require">Must contain <strong>one</strong> upper case, lower case, number, and special character</p>
                <label htmlFor="repeat-password">Re-enter Password:</label>
                <input type="password" id="repeat-password" name="repeat_password" required></input>
                <button type="submit">Submit</button>
            </form>
        </div>)
    }
}
export default SignUp;