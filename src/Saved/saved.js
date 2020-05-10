import React, {Component} from 'react';
import './saved.css'
import SavedProjects from '../SavedProjects/saved-projects'
import SavedStitches from '../SavedStitches/saved-stitches'

class Saved extends Component {
    render(){
        return(
            <div className="saved">
                <SavedProjects 
                    projects={this.props.projects}
                    deleteProject={(project) => this.props.deleteProject(project)}
                />
                <SavedStitches 
                stitches={this.props.stitches}
                deleteStitch={(project)=>this.props.deleteStitch(project)}
                />
            </div>
        )
    }
}

export default Saved;