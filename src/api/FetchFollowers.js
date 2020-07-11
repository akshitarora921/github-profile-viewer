import {useState, useEffect} from 'react'
import axios from 'axios'

export default function FetchRepo(Url) {
    const[followersCount, setFollowersCount] = useState(0)
    useEffect(()=>{
        axios({
            method:'GET',
            url:Url
        })
        .then(res=>{
            setFollowersCount(res.data.length)
            console.log(res.data)
        })
        .catch(e=>{
            if (e) return
        })
    },[Url])
    return {followersCount}
}
