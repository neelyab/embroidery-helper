import React, {Component} from 'react'

class ProjectResults extends Component {
    render(){
        const {projects} = this.props
        let projectResults;
        if (projects){
            projectResults = projects.map((project, i)=>{
                return(
                    <li key={i}><span className="project-name">{project.name}</span>
                    <img src={project.imageUrl} alt={project.name}/>
                    <p>{project.description}</p>
                    <a href={project.url}target="_blank">Project</a>
                    </li>
                )
            })
        } else {
            projectResults = ''
        }
        return(<ul>{projects && projectResults}</ul>)
    }
}
export default ProjectResults;