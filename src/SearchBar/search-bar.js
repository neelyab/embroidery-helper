import React, {Component} from 'react';
import './search-bar.css';

class SearchBar extends Component {
    render(){
        return(
        <form className="search-bar"  onSubmit={e => this.props.handleSubmit(e)}>
            <div className="embroidery-stitches">
                <select className="stitch" onChange={(e) => this.props.handleUpdate(e.target.value)}>
                    <option value="" name="choose-a-stitch">Choose a Stitch</option>
                    <option value="back-stitch" name="back-stitch">Back Stitch</option>
                    <option value="french-knot" name="french-knot">French Knot</option>
                    <option value="satin-stitch" name="satin-stitch">Satin Stitch</option>
                    <option value="stem-stitch" name="stem-stitch">Stem Stitch</option>
                </select>
            </div>
            <div className="filters"> 
                <label htmlFor="include-projects">Include Projects</label>
                <input type="checkbox" name="include-projects" value="include-projects" checked={this.props.checked === true} onChange={()=>this.props.handleCheck()}/>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => this.props.clearResults()}>Clear Results</button>
        </form>
        )
    }
}
export default SearchBar;