import React, {Component} from 'react'
import './saved-stitches.css'

class SavedStitches extends Component {
    render(){
        const {stitches} = this.props 
        let savedStitches;
        if(stitches) {
            savedStitches = stitches.map(stitch=>{
            return(
            <li key={stitch.id} className="saved-stitch">
                <span className="stitch-name">{stitch.name}</span>
                <img className = "stitch-image" src={stitch.imageUrl} alt={stitch.name}/>
                <p>{stitch.description}</p>
                <button>Delete</button>
            </li>
            )
        })
        } else {
        savedStitches = null
        }
        return(
        <div>
            {stitches.length > 0 && <h2>Saved Stitches:</h2>}
            <ul className="saved-stitches-list">{stitches && savedStitches}</ul>
        </div>)
    }
}

export default SavedStitches;