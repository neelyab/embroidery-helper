import React, {Component} from 'react';
import './search-bar.css';

class SearchBar extends Component {
    render(){
        return(
        <div className="search-bar">
            <div className="embroidery-stitches">
                <select className="stitch">
                    <option value="back-stitch" name="back-stitch">Back Stitch</option>
                    <option value="french-knot" name="french-knot">French Knot</option>
                    <option value="satin-stitch" name="satin-stitch">Satin Stitch</option>
                    <option value="stem-stitch" name="stem-stitch">Stem Stitch</option>
                </select>
            </div>
            <div className="filters"> 
                <label htmlFor="include-projects">Include Projects</label>
                <input type="checkbox" name="include-projects" value="include-projects"/>
            </div>
            <button type="submit">Submit</button>
        </div>
        )
    }
}
export default SearchBar;