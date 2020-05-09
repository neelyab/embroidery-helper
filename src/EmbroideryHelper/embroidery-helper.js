import React, {Component} from 'react';
import SearchBar from '../SearchBar/search-bar';
import SearchResults from '../SearchResults/search-results';
import Saved from '../Saved/saved';
import './embroidery-helper.css';
import STORE from '../dummy-store';

class EmbroideryHelper extends Component {
    constructor(props){
        super(props);
        this.state={
            searchTerm: null,
            checked: false,
            stitches: STORE.stitches,
            projects: STORE.projects,
            stitchResults: null,
            projectResults: null,
            error: null,
            saved: {
                stitches: [],
                projects: []
                }
        }
    }
    clearResults = () => {
        this.setState({stitchResults: null,
        projectResults: null})
    }
    handleUpdate = search => {
        this.setState({searchTerm: search, 
        error: null})
    }
    handleCheck = check => {
        this.setState({checked: !this.state.checked})
    }
    handleSubmit = e => {
        e.preventDefault();
        const {searchTerm, checked } = this.state
        if(!searchTerm) {
            this.setState({error: 'Please select a search term'})
        } else {
        const searchQuery = searchTerm.split("-")
        const search = searchQuery.join(" ")
        const stitchResults = this.state.stitches.filter(stitch => stitch.name === search)
        this.setState({stitchResults})
        // if include projects are checked, search for projects that include stitches
        if (checked) {
            let projectResults = []
            this.state.projects.map(project => {
                const result = project.stitches.find(stitch => stitch === search)
                if (result) {
                   projectResults.push(project)
                    }  
                 return projectResults
                })
                console.log(projectResults)
                this.setState({projectResults})
            } else {
        //if include projects is not checked, reset projectResults
                this.setState({projectResults: null})
            }
        }
    }
    saveProject = projectId => {
        console.log(projectId)
        const project = this.state.projects.find(p => p.id === projectId)
        console.log(project)
        this.setState({saved: {
            projects: [...this.state.saved.projects, project]
        }})
    }
    render(){
        return(<div className='embroidery-helper'>
            <SearchBar 
                handleUpdate={(e) => this.handleUpdate(e)} 
                handleCheck={() => this.handleCheck()}
                handleSubmit={(e) => this.handleSubmit(e)}
                clearResults={() => this.clearResults()}
                checked={this.state.checked}/>
            {this.state.error && <p>{this.state.error}</p>}
            <SearchResults projects={this.state.projectResults} stitches={this.state.stitchResults} saveProject={(project) => this.saveProject(project)}/>
            <Saved/>
        </div>)
    }
}

export default EmbroideryHelper;