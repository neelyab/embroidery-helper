import React, {Component} from 'react'
import './saved-projects.css'
import StitchesResults from '../StitchesResults/stitches-results';

class SavedProjects extends Component {
    render() {
        const {projects} = this.props || {}
        let savedProjects;
        if (projects) {
            savedProjects = projects.map(project => {
            return(
            <li key={project.id} className="saved-project">
                <a href={project.url} target="_blank" rel= "noopener noreferrer">{project.name}</a>
                <img src={project.imageUrl} alt={project.name}/>
                <button type="button" onClick={()=>this.props.deleteProject(project.id)}>Delete</button>
            </li>)
        }
    )} else {
        savedProjects = null
    }
        return(
        <div>
            {projects.length > 0 && <h2>Saved Projects:</h2>}
            <ul className="saved-project-list">{projects && savedProjects}</ul>
        </div>
        )
    }
}

export default SavedProjects;