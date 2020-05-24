import React, {Component} from 'react';
import './search-results.css';
import StitchesResults from '../StitchesResults/stitches-results';
import ProjectResults from '../ProjectResults/project-results';

class SearchResults extends Component {
    render(){
        const { projects, stitches } = this.props;
        return(
        <div className="search-results" ref="search-results">
            <div className="stitches-results">
                <StitchesResults stitches={stitches}
                    saveStitch={this.props.saveStitch}
                    savedStitches={this.props.savedStitches}/>
            </div>
            <div className="project-results">
                <ProjectResults projects={projects} 
                    saveProject= {this.props.saveProject}
                    savedProjects={this.props.savedProjects}/>
            </div>
        </div>
        )
    }
}
export default SearchResults;