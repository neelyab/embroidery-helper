import React, {Component} from 'react';
import SearchBar from '../SearchBar/search-bar';
import SearchResults from '../SearchResults/search-results';
import Saved from '../Saved/saved';
import './embroidery-helper.css';
import config from '../config';
import TokenService from '../services/token-service';
import loader from '../img/ajax-loader.gif';


class EmbroideryHelper extends Component {
    constructor(props){
        super(props);
        this.myRef=React.createRef();
        this.state={
            searchTab: true,
            savedTab: false,
            loading: true,
            searchTerm: null,
            checked: false,
            stitchResults: null,
            projectResults: null,
            error: null,
            saved: {
                stitches: [],
                projects: [],
                }
        };
    }
    componentDidMount(){
        const token = TokenService.getAuthToken();
   // get saved stitches and projects when component mounts
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
            // loading icon set to false once projects and stitches are fetched
           this.setState({
               loading: false,
               saved: {
                   stitches,
                   projects
               }
           });
        })
        .catch(res => {
            this.setState({
                loading: false,
                error: 'Something went wrong, please try again later.'
            });
        })
    }
    clearResults = () => {
        //clear search results
        this.setState({
            stitchResults: null,
            projectResults: null
        });
    }
    handleUpdate = search => {
        this.setState({
            searchTerm: search, 
            error: null
        });
    }
    handleCheck = () => {
        // this toggles checkbox to include projects between true and false
        this.setState({
            checked: !this.state.checked
        });
    }
    scrollToMyRef = () => { 
        // once search results are displayed, auto scroll to the top of the results
        window.scrollTo(0, this.myRef.current.offsetTop);  
    }
    handleSubmit = e => {
        e.preventDefault();
        const { searchTerm, checked } = this.state;
        // error message if stitch selection is left null
        if(!searchTerm) {
            this.setState({
                error: 'Please select a search term'
            });
        } else {
            this.setState({
                loading: true
            });
            const searchQuery = searchTerm.split("-");
            const search = searchQuery.join(" ");
            const token = TokenService.getAuthToken();
            fetch(`${config.API_ENDPOINT}/stitches/?stitch=${search}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    })
            .then(res => {
                    if(!res.ok){
                      return  res.json().then(e => Promise.reject(e));
                    } else {
                    return res.json();
                    }
            })
            .then(results => {
                this.setState({
                    loading: false,
                    stitchResults: results
                });
                // scroll to the first result
                this.scrollToMyRef();
            })
            .catch(res => {
                this.setState({
                    loading: false,
                    error: res.error
                });
            });

        // if include projects are checked, search for projects that include stitches
            if (checked) {
                this.setState({
                    loading: true
                });
                const searchQuery = searchTerm.split("-");
                const search = searchQuery[0];
              
                
            fetch(`${config.API_ENDPOINT}/projects/?stitch=${search}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    })
            .then(res => {
                    if(!res.ok){
                      return  res.json().then(e => Promise.reject(e));
                    } else {
                    return res.json();
                    }
                })
            .then(results => {
                this.setState({
                    loading: false,
                    projectResults: results
                });
            })
            .catch(res => {
                this.setState({
                    loading: false,
                    error: 'Something went wrong, please try again later.'
                });
              })
            } else {
        //if include projects is not checked, reset projectResults
                this.setState({
                    projectResults: null
                });
            }
        }
    }
    saveProject = projectId => {
        const token = TokenService.getAuthToken();
        const {stitches, projects} = this.state.saved;
        //find the projectId within the projectResults
        const project = this.state.projectResults.find(p => p.id === projectId);

         //check to see if project has already been saved 
        const number = projects.filter(project => project.id === projectId).length;
        if (number !== 0){
            this.setState({
                error: 'Project already saved'
            });
        } else {
            // post saved project
            fetch(`${config.API_ENDPOINT}/saved_projects/${project.id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                })
            .then(res => {
                if(!res.ok){
                  return  res.json().then(e => Promise.reject(e));
                } 
            })
            .then(response => {
                this.setState({
                    saved: {
                        stitches,
                        projects: [...projects, project]
                    }
                });
            })
            .catch(res => {
                this.setState({
                    error: 'Something went wrong, please try again later.'
                });
            })
        }
        this.setState({
            saved:{
                stitches,
                projects
            }
        });
    }
    saveStitch = stitchId => {
        const token = TokenService.getAuthToken();
        const { projects, stitches } = this.state.saved;
        const stitch = this.state.stitchResults.find(s => s.id === stitchId);

         //check to see if stitch has already been saved 
        const number = stitches.filter(stitch => stitch.id === stitchId).length;
        if (number > 0){
                this.setState({
                    error: 'Stitch already saved'
                });
            }
         else {
             // post saved stitch
        fetch(`${config.API_ENDPOINT}/saved_stitches/${stitch.id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                })
        .then(res => {
                if(!res.ok){
                  return  res.json().then(e => Promise.reject(e));
                } 
        })
        .then(response => {
            this.setState({
                saved: {
                    stitches: [...stitches, stitch],
                    projects
                }
            });
        })
        .catch(res => {
            this.setState({
                error: 'Something went wrong, please try again later.'
            });
        })
    }
    }
    deleteStitch = stitchId => {
    
        const { projects } = this.state.saved;
        // filter the stitch out of the saved stitches array
        const stitches = this.state.saved.stitches.filter(stitch => stitch.id !== stitchId );
        const token = TokenService.getAuthToken();
        // delete the stitch 
        fetch(`${config.API_ENDPOINT}/saved_stitches/${stitchId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if(!res.ok){
              return  res.json().then(e => Promise.reject(e));
            } 
        })
        .then(response => {
            this.setState({
                saved: {
                    stitches: stitches,
                    projects
                }
            });
        })
        .catch(res => {
            this.setState({
                error: 'Something went wrong, please try again later.'
            });
        })

    }
    deleteProject = projectId => {
        const { stitches } = this.state.saved;
        //filter the project out of the saved projects array
        const projects = this.state.saved.projects.filter(project => project.id !== projectId);
        const token = TokenService.getAuthToken();
        // delete the project 
        fetch(`${config.API_ENDPOINT}/saved_projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            })
        .then(res => {
            if(!res.ok){
              return  res.json().then(e => Promise.reject(e));
            } 
        })
        .then(response => {
            this.setState({
                saved: {
                    stitches,
                    projects: projects
                }
            });
        })
        .catch(res => {
            this.setState({
                error: 'Something went wrong, please try again later.'})
            });
    }
    // toggle between search and saved tab
    showSearch = () => {
        
        this.setState({
            searchTab: true,
            savedTab: false
        });
    }
    showSaved = () => {
        this.setState({
            searchTab: false,
            savedTab: true
        });
    }
    render(){
       const { searchTab, savedTab } = this.state;
        return(
        <div className='embroidery-helper'>
             <h1>Embroidery Helper</h1>
            <div className="tabs">
                <button className={searchTab ? 'search-tab active' : 'search-tab'} onClick={this.showSearch}>Search</button> 
                <button className={savedTab ? 'saved-tab active' : 'saved-tab'} onClick={this.showSaved}>Saved</button> 
            </div>
            {searchTab && 
            <SearchBar 
                handleUpdate={(e) => this.handleUpdate(e)} 
                handleCheck={() => this.handleCheck()}
                handleSubmit={(e) => this.handleSubmit(e)}
                clearResults={() => this.clearResults()}
                searchTerm={this.state.searchTerm}
                checked={this.state.checked}/>
            }
            {this.state.error && <p>{this.state.error}</p>}
            {this.state.loading && <img src={loader} alt='loading icon' className='loader'></img>}
            <div ref={this.myRef}> 
            {searchTab &&
            <SearchResults 
                projects={this.state.projectResults} 
                stitches={this.state.stitchResults} 
                savedStitches ={this.state.saved.stitches}
                savedProjects ={this.state.saved.projects}
                saveProject={(project) => this.saveProject(project)}
                saveStitch={(stitch) => this.saveStitch(stitch)}/>
            }
            </div>
            {savedTab &&
            <Saved 
                projects={this.state.saved.projects} 
                stitches={this.state.saved.stitches}
                deleteStitch={(stitch) => this.deleteStitch(stitch)}
                deleteProject={(project) => this.deleteProject(project)}/>}
        </div>)
    }
}

export default EmbroideryHelper;