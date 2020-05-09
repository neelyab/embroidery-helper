import React, {Component} from 'react';
import './saved.css'
import SavedProjects from '../SavedProjects/saved-projects'
import SavedStitches from '../SavedStitches/saved-stitches'

class Saved extends Component {
    render(){
        return(
            <div className="saved">
                <SavedProjects projects={this.props.projects}/>
                <SavedStitches stitches={this.props.stitches}/>
            </div>
        )
    }
}

export default Saved;