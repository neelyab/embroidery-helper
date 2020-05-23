import React, {Component} from 'react'

class ProjectResults extends Component {
    render(){
        const {projects} = this.props

        let projectResults;
        if (projects){
            console.log(projects)
            projectResults = projects.map((project, i)=>{
                const saved = this.props.savedProjects.find(p=> p.id === project.id )
                return(
                    <li key={i}>
                    <span className="project-name">Project: <a href={project.project_url}target="_blank" rel="noopener noreferrer">{project.project_name}</a></span>
                    <img src={project.image_url} alt={project.project_name}/>
                    {saved ? <button className="saved-button">Saved</button> : <button type="button" onClick={() => this.props.saveProject(project.id)}>Save</button>}
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