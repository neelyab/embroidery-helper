import React, {Component} from 'react'
import './login.css'
import TokenService from '../services/token-service'
import config from '../config'

class Login extends Component {

    state = {error: null}

    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = e.target;
        const credentials = { 
                username: username.value, 
                password: password.value
            }
        fetch(`${config.API_ENDPOINT}/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
        .then(res=> {
            username.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.history.push('/')
        })
        .catch(res => {
            this.setState({error: res.error})
        })



    }
    render(){
        return (<div>
            <form className="login" onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required></input>
                {this.state.error && <p>{this.state.error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>)
    }
}
export default Login;