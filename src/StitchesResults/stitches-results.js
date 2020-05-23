import React, {Component} from 'react'

import './stitches-results.css'


class StitchesResults extends Component {

    render(){
        const {stitches} = this.props
        let stitchResults;
        if (stitches) {
            stitchResults = this.props.stitches.map((stitch, i) => {
                const saved = this.props.savedStitches.find(s=> s.id === stitch.id )
                return(
                <li key ={i}>
                    <span className="stitch-name">{stitch.stitch_name}</span>
                    <img className="stitch-image" src={stitch.image_url} alt={stitch.stitch_name}/>
                    <p>{stitch.stitch_description}</p>
                    {saved ? <button className="saved-button">Saved</button> : <button type="button" onClick={() => this.props.saveStitch(stitch.id)}>Save</button>}
                </li>
                )
            })
        } else {
            stitchResults = ''
        }
    
    return(<ul>{stitches && stitchResults}</ul>)
    }
}
export default StitchesResults;