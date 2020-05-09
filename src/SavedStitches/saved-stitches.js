import React, {Component} from 'react'

class SavedStitches extends Component {
    render(){
        const {stitches} = this.props 
        let savedStitches;
        if(stitches) {
            savedStitches = stitches.map(stitch=>{
            return(
            <li key={stitch.id}>
                <span className="stitch-name">{stitch.name}</span>
                <img src={stitch.imageUrl} alt={stitch.name}/>
            </li>
            )
        })
        } else {
        savedStitches = null
        }
        return(<div>
            <h2>Saved Stitches:</h2>
            <ul className="saved-stitches-list">{stitches && savedStitches}</ul>
        </div>)
    }
}

export default SavedStitches;