import React from 'react'
import ReactDOM from 'react-dom'
import ProjectResults from './project-results'



it('renders without crashing', ()=>{
    const savedProjects= []
    const projects = [{   id: 1,
        project_name: 'clover flower embroidery pattern',
        image_url: 'https://crewelghoul.com/wp-content/uploads/2020/03/IMG_3950-800x445.jpeg',
        project_url:'https://crewelghoul.com/blog/how-to-embroider-a-clover-flower-embroidery-tutorial/',
        stitches: ['satin stitch', 'back stitch']
    }]
    const div = document.createElement('div');
    ReactDOM.render(<ProjectResults projects={projects} savedProjects={savedProjects}/>, div);
    ReactDOM.unmountComponentAtNode(div)
})