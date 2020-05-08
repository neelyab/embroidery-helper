import React, {Component} from 'react';
import './about.css';

class About extends Component {
    render(){
        return(
        <div>
            <section className="about">
                <div className="img"><p>picture</p></div>
                <p>Hand embroidery helper allows you to easily learn embroidery stitches and techniques through clear instructions and fun modern projects that you can apply your new stitching skills to.</p>
            </section>
            <section className="about">
                <div className="img"><p>picture</p></div>
                <p>Clear instructions and diagrams help you learn easier and faster!</p>
            </section>
            <section className="about">
                <div className="img"><p>picture</p></div>
                <p>Save projects and stitches you'd like to learn. With hand embroidery helper, you're able to keep a list of stitches and projects you're interested in learning to stitch.</p>
            </section>
        </div>)
    }
}
export default About;