import React from 'react'
import ReactDOM from 'react-dom'
import EmbroideryHelper from './embroidery-helper'

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<EmbroideryHelper/>, div);
    ReactDOM.unmountComponentAtNode(div)
})