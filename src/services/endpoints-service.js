import react from 'react'
import config from '../config'

const EndpointsService = {
    fetchStitches(search, token) {
        fetch(`${config.API_ENDPOINT}/stitches/?stitch=${search}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            })
        .then(res => {
            if(!res.ok){
              return  res.json().then(e => Promise.reject(e))
            } else {
            return res.json()
            }
        })
    },
    fetchProjects(search, token) {
        fetch(`${config.API_ENDPOINT}/projects/?stitch=${search}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            })
        .then(res => {
            if(!res.ok){
              return  res.json().then(e => Promise.reject(e))
            } else {
            return res.json()
            }
        })
    },
    fetchSavedProjects(){

    },
    saveStitch(){

    },
    saveProject(){

    },
    deleteStitch(){

    },
    deleteProject(){

    }

}
export default EndpointsService