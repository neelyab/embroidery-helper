import React, {Component} from 'react'

class ProjectResults extends Component {
    render(){
        const {projects} = this.props

        let projectResults;
        if (projects){
            projectResults = projects.map((project, i)=>{
                return(
                    <li key={i}>
                    <span className="project-name">Project: <a href={project.project_url}target="_blank" rel="noopener noreferrer">{project.project_name}</a></span>
                    <img src={project.image_url} alt={project.project_name}/>
                    <button type="button" onClick={() => this.props.saveProject(project.id)}>Save</button>
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