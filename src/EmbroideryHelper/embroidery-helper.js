import React, {Component} from 'react';
import SearchBar from '../SearchBar/search-bar';
import SearchResults from '../SearchResults/search-results';
import Saved from '../Saved/saved';
import './embroidery-helper.css';
import config from '../config'
import TokenService from '../services/token-service'


class EmbroideryHelper extends Component {
    constructor(props){
        super(props);
        this.state={
            searchTerm: null,
            checked: false,
            stitches: null,
            projects: null,
            stitchResults: null,
            projectResults: null,
            error: null,
            saved: {
                stitches: [],
                projects: [],
                }
        }
    }
    componentDidMount(){
        const token = TokenService.getAuthToken()
        fetch(`${config.API_ENDPOINT}/saved_stitches/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
                })
        .then(res => {
                if(!res.ok){
                return  res.json().then(e => Promise.reject(e))
                } else {
                return res.json()
                }
            })
        .then(results => {
            const projects = this.state.saved.projects
            this.setState({
                saved: {
                    stitches: results,
                    projects
                }
            })
        })
        .catch(res => {
            this.setState({error: res.error})
        })
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
        const searchQuery = searchTerm.split("-")
        const search = searchQuery.join(" ")
        const token = TokenService.getAuthToken()
        // error message if stitch seleciton is left null
        if(!searchTerm) {
            this.setState({error: 'Please select a search term'})
        } else {
            fetch(`${config.API_ENDPOINT}/stitches/?stitch=${search}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    })
            .then(res => {
                    if(!res.ok){
                      return  res.json().then(e => Promise.reject(e))
                    } else {
                    return res.json()
                    }
            })
            .then(results => {
                this.setState({
                    stitchResults: results
                })
            })
            .catch(res => {
                this.setState({error: res.error})
            })

        // if include projects are checked, search for projects that include stitches
            if (checked) {
                let projectResults = []
                const searchQuery = searchTerm.split("-")
                const search = searchQuery[0]
                
            fetch(`${config.API_ENDPOINT}/projects/?stitch=${search}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    })
            .then(res => {
                    if(!res.ok){
                      return  res.json().then(e => Promise.reject(e))
                    } else {
                    return res.json()
                    }
                })
            .then(results => {
                this.setState({
                    projectResults: results
                })
            })
            .catch(res => {
                this.setState({error: res.error})
            })
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
            console.log('already saved')
        } else {
          
        }
        this.setState({saved:{
            stitches,
            projects
        }
        })
    }
    saveStitch = stitchId => {
        console.log(stitchId)
        const token = TokenService.getAuthToken()
        const {stitches, projects} = this.state.saved || []
        const stitch = this.state.stitchResults.find(s => s.id === stitchId)
        //check to see if stitch has already been saved 
        let number;
        if (stitches.length > 0) {
        number = stitches.filter(stitch => stitch.id === stitchId).length
            if (number !== 0){
                this.setState({error: 'Stitch already saved'})
                return stitches
            }
        }
         else {
        fetch(`${config.API_ENDPOINT}/saved_stitches/${stitch.id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                })
        .then(res => {
                if(!res.ok){
                  return  res.json().then(e => Promise.reject(e))
                } 
        })
        .then(response => {
            this.setState({
                saved: {
                    stitches: [...stitches, stitch],
                    projects
                }
            })
        })
        .catch(res => {
            this.setState({error: res.error})
        })

        }
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