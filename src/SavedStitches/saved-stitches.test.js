import React from 'react'
import ReactDOM from 'react-dom'
import SavedStitches from './saved-stitches'

describe('saved stitches', ()=>{
    it('renders without crashing', ()=>{
        const stitches =   [{   id: 4,
            name: 'stem stitch',
            imageUrl: 'https://crewelghoul.com/wp-content/uploads/2019/12/stem-stitch-600x600.jpg',
            description:'Come up through the back of the fabric and take a stitch with your needle, coming up about halfway between the first stitch. Pull through, and repeat.'
        }]
        const div = document.createElement('div');
        ReactDOM.render(<SavedStitches stitches={stitches}/>, div);
        ReactDOM.unmountComponentAtNode(div)
    })
    it('renders when no stitches are saved', ()=>{
        const stitches = []
        const div = document.createElement('div');
        ReactDOM.render(<SavedStitches stitches={stitches}/>, div);
        ReactDOM.unmountComponentAtNode(div)
    }) 
})
