import {useState, useEffect} from 'react'
import axios from 'axios'

export default function FetchRepo(repoUrl) {
    const[repos, setRepos] = useState([])
    useEffect(()=>{
        axios({
            method:'GET',
            url:repoUrl
        })
        .then(res=>{
            setRepos(res.data)
            // console.log(res.data)
        })
        .catch(e=>{
            if (e) return
        })
    },[repoUrl])
    return {repos}
}
