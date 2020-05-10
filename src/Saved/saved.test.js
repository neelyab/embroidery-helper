import React from 'react'
import ReactDOM from 'react-dom'
import Saved from './saved'

it.skip('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Saved/>, div);
    ReactDOM.unmountComponentAtNode(div)
})