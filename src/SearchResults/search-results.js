import React, {Component} from 'react';
import './search-results.css';
import StitchesResults from '../StitchesResults/stitches-results';
import ProjectResults from '../ProjectResults/project-results';

class SearchResults extends Component {
    render(){
        const { projects, stitches } = this.props
        return(
        <div className="search-results">
            <div className="stitches-results">
                <StitchesResults stitches={stitches}
                 saveStitch={this.props.saveStitch}/>
            </div>
            <div className="project-results">
                <ProjectResults projects={projects} 
                saveProject= {this.props.saveProject}/>
            </div>
        </div>
        )
    }
}
export default SearchResults;