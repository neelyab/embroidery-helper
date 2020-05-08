import React, {Component} from 'react';
import SearchBar from '../SearchBar/search-bar';
import SearchResults from '../SearchResults/search-results';
import Saved from '../Saved/saved';
import './embroidery-helper.css';

class EmbroideryHelper extends Component {
    render(){
        return(<div className='embroidery-helper'>
            <SearchBar/>
            <SearchResults/>
            <Saved/>
        </div>)
    }
}

export default EmbroideryHelper;