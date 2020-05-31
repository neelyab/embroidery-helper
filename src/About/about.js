import React, {Component} from 'react';
import './about.css';
import '../../src/index.css';
import stitch from '../../src/img/embroidery-stitch-diagram.JPG';
import embroidery from '../../src/img/embroidery.jpg';
import savedProjects from '../../src/img/saved-projects.jpeg';

class About extends Component {
   
    render(){
        return(
        <div className="about-page">
            <section className="about">
                <img className="img" src={embroidery} alt='embroidery'/>
                <p>Hand embroidery helper is a tool created by Amanda, who runs the embroidery and craft blog <a href="http://crewelghoul.com" target="_blank">Crewel Ghoul</a>. It allows you to easily learn embroidery stitches and techniques through clear instructions and fun modern projects that you can apply your new stitching skills to.</p>      
            </section>
            <section className="about">
                <img className="img" src={stitch} alt ='stitch diagram'/>
                <p>Clear instructions and diagrams help you learn easier and faster!</p>
            </section>
            <section className="about">
                <img className="img" src={savedProjects} alt='saved embroidery projects'/>
                <p>Save projects and stitches you'd like to learn. With hand embroidery helper, you're able to keep a list of stitches and projects you're interested in learning to stitch.</p>
            </section>
        </div>)
    }
}
export default About;