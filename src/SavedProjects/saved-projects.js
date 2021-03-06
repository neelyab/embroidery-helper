import React, {Component} from 'react';
import './saved-projects.css';

class SavedProjects extends Component {
    render() {
        const {projects} = this.props || {}
        let savedProjects;
        if (projects) {
            // if there are saved projects, render the projects
            savedProjects = projects.map(project => {
            return(
            <li key={project.id} className="saved-project">
                <a href={project.project_url} target="_blank" rel= "noopener noreferrer">{project.project_name}</a>
                <img src={project.image_url} alt={project.project_name}/>
                <button type="button" onClick={() => this.props.deleteProject(project.id)}>Delete</button>
            </li>)
        }
    )} else {
        savedProjects = null;
    }
        return(
            // if there are saved projects, render them and show h2, otherwise render empty ul 
        <div className="saved-projects">
            {projects.length > 0 && <h2>Saved Projects:</h2>}
            <ul className="saved-project-list">{projects && savedProjects}</ul>
        </div>
        )
    }
}

export default SavedProjects;