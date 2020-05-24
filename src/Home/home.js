import React, {Component} from 'react'
import './home.css'
import {Link} from 'react-router-dom'

class Home extends Component {
    render(){
        return(
        <div className="home-screen">
            <div className="home">
            <h1>Embroidery Helper</h1>
            <p>Learn how to embroider with clear instructions and hands on projects</p>
            <Link to='/demo'><button>Demo</button></Link>
            </div>
        </div>
        )
    }
}

export default Home