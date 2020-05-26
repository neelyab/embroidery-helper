import React, {Component} from 'react';
import './saved-stitches.css';

class SavedStitches extends Component {
    render(){
        const { stitches } = this.props; 
        let savedStitches;
        if(stitches) {
            // if saved stitches are present, render them
            savedStitches = stitches.map((stitch) => {
            return(
            <li key={stitch.id} className="saved-stitch">
                <span className="stitch-name">{stitch.stitch_name}</span>
                <img className = "stitch-image" src={stitch.image_url} alt={stitch.stitch_name}/>
                <p>{stitch.stitch_description}</p>
                <button type="button" onClick={() => this.props.deleteStitch(stitch.id || stitch.stitch)}>Delete</button>
            </li>
            )
        })
        } else {
        savedStitches = null;
        }
        return(
            // if there are saved stitches present, render and show h2, otherwise render empty ul
        <div>
            {stitches.length > 0 && <h2>Saved Stitches:</h2>}
            <ul className="saved-stitches-list">{stitches && savedStitches}</ul>
        </div>
        )
    }
}

export default SavedStitches;