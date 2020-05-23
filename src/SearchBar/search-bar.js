import React, {Component} from 'react';
import './search-bar.css';

class SearchBar extends Component {
    render(){
        let searchTerm
        if(this.props.searchTerm === null){
            searchTerm = 'the stitch selected'
        } else {
           const search = this.props.searchTerm.split('-')
           searchTerm = search.join(' ')
        }
        return(
        <form className="search-bar"  onSubmit={e => this.props.handleSubmit(e)}>
            <div className="embroidery-stitches">
                <label htmlFor="stitch">Please select an embroidery stitch:</label> 
                <select name = "stitch" className="select-stitch" onChange={(e) => this.props.handleUpdate(e.target.value)}>
                    <option value="" name="choose-a-stitch">Choose a Stitch</option>
                    <option value="back-stitch" name="back-stitch">Back Stitch</option>
                    <option value="french-knot" name="french-knot">French Knot</option>
                    <option value="satin-stitch" name="satin-stitch">Satin Stitch</option>
                    <option value="stem-stitch" name="stem-stitch">Stem Stitch</option>
                </select>
            </div>
            <div className="filters"> 
                <label htmlFor="include-projects">Search for projects that include <span className='stitch'>{`${searchTerm}`}</span>:</label>
                <input type="checkbox" name="include-projects" value="include-projects" checked={this.props.checked === true} onChange={()=>this.props.handleCheck()}/>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => this.props.clearResults()}>Clear Results</button>
        </form>
        )
    }
}
export default SearchBar;