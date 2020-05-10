import React from 'react'
import ReactDOM from 'react-dom'
import ProjectResults from './project-results'



it('renders without crashing', ()=>{
    const projects = [{   id: 1,
        name: 'clover flower embroidery pattern',
        imageUrl: 'https://crewelghoul.com/wp-content/uploads/2020/03/IMG_3950-800x445.jpeg',
        url:'https://crewelghoul.com/blog/how-to-embroider-a-clover-flower-embroidery-tutorial/',
        stitches: ['satin stitch', 'back stitch']
    }]
    const div = document.createElement('div');
    ReactDOM.render(<ProjectResults projects={projects}/>, div);
    ReactDOM.unmountComponentAtNode(div)
})