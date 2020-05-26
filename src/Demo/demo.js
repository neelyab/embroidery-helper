import React, {Component} from 'react';
import SearchResults from '../SearchResults/search-results';
import Saved from '../Saved/saved';
import './demo.css';
import tooltip from '../../src/img/tooltip.png';

class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchTab: true,
            savedTab: false
        }
    }
    showSearch = () => {
        this.setState({
            searchTab: true,
            savedTab: false
        })
    }
    showSaved = () => {
        this.setState({
            searchTab: false,
            savedTab: true
        })
    }
    delete = () => {

    }
    render(){
        const project = [{
            image_url: 'https://i.imgur.com/60yukoG.png',
            project_url: 'https://crewelghoul.com/blog/leaf-rubbing-embroidery/',
            project_name: 'Leaf Rubbing Embroidery',
            stitches: 'back stitch',
            id: 1
        }]
        const stitch = [{
            stitch_name: 'back stitch',
            stitch_description: 'Start with a straight stitch. Come up where your first stitch ends. Come up a space ahead, then stitch backwards where your previous stitch ended.',
            image_url: 'https://i.imgur.com/RwpX0Q7.png',
            id: 1
        }]
        const {searchTab, savedTab} = this.state
         return(
            <div className='embroidery-helper'>
             <h1>Embroidery Helper</h1>
             <div className="tabs">
                 <span className="embroidery-tooltip">Toggle between search results and saved items</span>
                 <img src={tooltip} alt="tooltip icon" className="tooltip-icon"/>
                 <button className={searchTab ? 'search-tab active' : 'search-tab'} onClick={this.showSearch}>Search</button> 
                 <button className={savedTab ? 'saved-tab active' : 'saved-tab'} onClick={this.showSaved}>Saved</button> 
            </div>
             {searchTab && 
             <form className="search-bar">
                <div className="embroidery-stitches">
                    <label htmlFor="stitch" className="stitch">Please select an embroidery stitch: 
                    <img src={tooltip} alt="tooltip icon" className="tooltip-icon"/>
                    <span className="embroidery-tooltip">choose from a variety of stitches</span></label> 
                    <select name = "stitch" className="select-stitch" >
                        <option value="back-stitch" name="back-stitch">Back Stitch</option>
                    </select>
                </div>
                <div className="filters"> 
                    <label htmlFor="include-projects">Search for projects that include <span className='stitch'>back stitch</span>:</label>
                    <input type="checkbox" name="include-projects" value="include-projects" />
                </div>
                <button type="button">Submit</button>
                <button type="button">Clear Results</button>
            </form>
             }
             <div>
             
             {searchTab &&
             // toggle between search and saved tab
             <div className="search-results-demo">
             <span className="embroidery-tooltip">View and save stitches and projects</span>
             <img src={tooltip} alt="tooltip icon" className="tooltip-icon"/>
             <SearchResults 
                 projects={project} 
                 stitches={stitch} 
                 savedStitches={stitch}
                 savedProjects={project}/>
                 </div>}
             </div>
             {savedTab &&
             <div className="saved-demo">
                  <span className="embroidery-tooltip">View and delete saved projects and stitches</span>
                  <img src={tooltip} alt="tooltip icon" className="tooltip-icon"/>
             <Saved 
                 projects={project} 
                 stitches={stitch}
                 deleteStitch={(stitch)=>this.delete()}
                 deleteProject={(project)=>this.delete()}
                 /></div>}
         </div>)
     }
 }
 
 export default Demo;