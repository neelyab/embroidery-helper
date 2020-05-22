import React, {Component} from 'react';
import SearchBar from '../SearchBar/search-bar';
import SearchResults from '../SearchResults/search-results';
import Saved from '../Saved/saved';
import './embroidery-helper.css';
import config from '../config'
import TokenService from '../services/token-service'
import loader from '../img/ajax-loader.gif'

class EmbroideryHelper extends Component {
    constructor(props){
        super(props);
        this.state={
            loading: true,
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
   // get saved stitches and projects
        Promise.all([
            fetch(`${config.API_ENDPOINT}/saved_stitches/`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            }),
            fetch(`${config.API_ENDPOINT}/saved_projects/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        ])

        .then(([stitchRes, projectRes]) => {
                if(!stitchRes.ok){
                stitchRes.json().then(e => Promise.reject(e))
                } 
                if(!projectRes.ok){
                    projectRes.json().then(e => Promise.reject(e))
                    } 
                return Promise.all([stitchRes.json(), projectRes.json()])
        })
        .then(([stitches, projects]) => {
            console.log(stitches, projects)
           this.setState({
               loading: false,
               saved: {
                   stitches,
                   projects
               }
           })
        })
        .catch(res => {
            this.setState({
                loading: false,
                error: 'Something went wrong, please try again later.'
            })
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
        // error message if stitch seleciton is left null
        if(!searchTerm) {
            this.setState({error: 'Please select a search term'})
        } else {
        this.setState({loading: true})
        const searchQuery = searchTerm.split("-")
        const search = searchQuery.join(" ")
        const token = TokenService.getAuthToken()
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
                    loading: false,
                    stitchResults: results
                })
            })
            .catch(res => {
                this.setState({
                    loading: false,
                    error: res.error
                })
            })

        // if include projects are checked, search for projects that include stitches
            if (checked) {
                this.setState({loading: true})
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
                    loading: false,
                    projectResults: results
                })
            })
            .catch(res => {
                this.setState({
                    loading: false,
                    error: 'Something went wrong, please try again later.'
                })
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
        const token = TokenService.getAuthToken()
        const {stitches, projects} = this.state.saved
        const project = this.state.projectResults.find(p => p.id === projectId)
         //check to see if project has already been saved 
        const number = projects.filter(project => project.id === projectId).length
        if (number !== 0){
            this.setState({error: 'Project already saved'})
        } else {
            fetch(`${config.API_ENDPOINT}/saved_projects/${project.id}`, {
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
                    stitches,
                    projects: [...projects, project]
                }
            })
            })
            .catch(res => {
                this.setState({error: 'Something went wrong, please try again later.'})
            })
        }
        this.setState({saved:{
            stitches,
            projects
        }
        })
    }
    saveStitch = stitchId => {
        const token = TokenService.getAuthToken()
        const {projects, stitches } = this.state.saved
        const stitch = this.state.stitchResults.find(s => s.id === stitchId)
         //check to see if stitch has already been saved 
        const number = stitches.filter(stitch => stitch.id === stitchId).length
        if (number > 0){
                this.setState({error: 'Stitch already saved'})
                console.log('stitch already saved')
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
            this.setState({error: 'Something went wrong, please try again later.'})
        })
    }
    }
    deleteStitch = stitchId => {
        console.log(stitchId)
        const {projects} = this.state.saved
        const stitches = this.state.saved.stitches.filter(stitch=> stitch.id !== stitchId )
        const token = TokenService.getAuthToken()

        fetch(`${config.API_ENDPOINT}/saved_stitches/${stitchId}`, {
            method: 'DELETE',
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
                    stitches: stitches,
                    projects
                }
            })
        })
        .catch(res => {
        this.setState({error: 'Something went wrong, please try again later.'})
    })

    }
    deleteProject = projectId => {
        const {stitches} = this.state.saved
        const projects = this.state.saved.projects.filter(project=>project.id !== projectId)
        const token = TokenService.getAuthToken()

        fetch(`${config.API_ENDPOINT}/saved_projects/${projectId}`, {
            method: 'DELETE',
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
                    stitches,
                    projects: projects
                }
            })
        })
        .catch(res => {
        this.setState({error: 'Something went wrong, please try again later.'})
        })
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
            {this.state.loading && <img src={loader} alt='loading icon' className='loader'></img>}
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