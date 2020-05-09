import React, {Component} from 'react'
import './stitches-results.css'

class StitchesResults extends Component {
    render(){
        const {stitches} = this.props 
        console.log(stitches)
        let stitchResults;
        if (stitches) {
            stitchResults = this.props.stitches.map((stitch, i) => {
                return(
                <li key ={i}>
                    <span className="stitch-name">{stitch.name}</span>
                    <img className="stitch-image" src={stitch.imageUrl} alt={stitch.name}/>
                    <p>{stitch.description}</p>
                    <button>Save</button>
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