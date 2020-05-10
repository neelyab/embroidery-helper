import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './search-bar'



it('renders without crashing', ()=>{
    const searchTerm = 'back-stitch'
    const div = document.createElement('div');
    ReactDOM.render(<SearchBar searchTerm={searchTerm}/>, div);
    ReactDOM.unmountComponentAtNode(div)
})