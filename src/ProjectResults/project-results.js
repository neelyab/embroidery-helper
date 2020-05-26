import React, {Component} from 'react';

class ProjectResults extends Component {
    render(){
        const { projects } = this.props;
        let projectResults;
        if (projects){
            projectResults = projects.map((project, i) => {
                // find projects that are already saved in the project results and render save or saved button accordingly
                const saved = this.props.savedProjects.find(p => p.id === project.id);
                return(
                    <li key={i}>
                        <span className="project-name">Project: <a href={project.project_url}target="_blank" rel="noopener noreferrer">{project.project_name}</a></span>
                        <img src={project.image_url} alt={project.project_name}/>
                        {saved ? 
                        <button className="saved-button">Saved</button> : 
                        <button type="button" onClick={() => this.props.saveProject(project.id)}>Save</button>}
                    </li>
                )
            })
        } else {
            projectResults = '';
        }
        return(
        <ul>
            {projects && projectResults}
        </ul>
        )
    }
}
export default ProjectResults;