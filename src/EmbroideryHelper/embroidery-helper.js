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
                projects: [],
                }
        }
    }
    clearResults = () => {
        this.setState({
            stitchResults: null,
            projectResults: null
        })
    }
    handleUpdate = search => {
        this.setState({
            searchTerm: search, 
            error: null
        })
    }
    handleCheck = () => {
        this.setState({
            checked: !this.state.checked
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        const {searchTerm, checked } = this.state
        // error message if stitch seleciton is left null
        if(!searchTerm) {
            this.setState({error: 'Please select a search term'})
        } else {
            const searchQuery = searchTerm.split("-")
            const search = searchQuery.join(" ")
            const stitchResults = this.state.stitches.filter(stitch => stitch.name === search)
            this.setState({
                stitchResults
            })
        // if include projects are checked, search for projects that include stitches
            if (checked) {
                let projectResults = []
                this.state.projects.map(project => {
                    const result = project.stitches.find(stitch => stitch === search)
                        if (result) {
                        // projects with matching stitches will be pushed into projectResults array
                        projectResults.push(project)
                            }  
                        return projectResults
                        })
                this.setState({projectResults})
                } else {
        //if include projects is not checked, reset projectResults
                this.setState({
                    projectResults: null
                })
            }
        }
    }
    saveProject = projectId => {
        const {stitches, projects} = this.state.saved
        const project = this.state.projects.find(p => p.id === projectId)
         //check to see if project has already been saved 
        const number = projects.filter(project => project.id === projectId).length
        if (number !== 0){
            return projects
        } else {
          projects.push(project)
        }
        this.setState({saved:{
            stitches,
            projects
        }
        })
    }
    saveStitch = stitchId => {
        const {stitches, projects} = this.state.saved
        const stitch = this.state.stitches.find(s => s.id === stitchId)
        //check to see if stitch has already been saved 
        const number = stitches.filter(stitch => stitch.id === stitchId).length
        if (number !== 0){
            return stitches
        } else {
        stitches.push(stitch)
        }
        this.setState({saved: {
            stitches,
            projects
         }
        })
    }
    deleteStitch = stitchId => {
        console.log(stitchId)
        const {projects} = this.state.saved
        const stitches = this.state.saved.stitches.filter(stitch=>stitch.id !==stitchId)
        this.setState({saved:{  
            projects,
            stitches
        }})
    }
    deleteProject = projectId => {
        const {stitches} = this.state.saved
        const projects = this.state.saved.projects.filter(project=>project.id !== projectId)
        this.setState({saved: {
            projects,
            stitches
        }})
    }
    render(){
        return(<div className='embroidery-helper'>
            <SearchBar 
                handleUpdate={(e) => this.handleUpdate(e)} 
                handleCheck={() => this.handleCheck()}
                handleSubmit={(e) => this.handleSubmit(e)}
                clearResults={() => this.clearResults()}
                searchTerm={this.state.searchTerm}
                checked={this.state.checked}/>
            {this.state.error && <p>{this.state.error}</p>}
            <SearchResults 
                projects={this.state.projectResults} 
                stitches={this.state.stitchResults} 
                saveProject={(project) => this.saveProject(project)}
                saveStitch={(stitch) => this.saveStitch(stitch)}/>
            <Saved 
                projects={this.state.saved.projects} 
                stitches={this.state.saved.stitches}
                deleteStitch={(stitch)=>this.deleteStitch(stitch)}
                deleteProject={(project)=>this.deleteProject(project)}/>
        </div>)
    }
}

export default EmbroideryHelper;