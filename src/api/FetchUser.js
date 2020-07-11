import {useState, useEffect} from 'react'
import axios from 'axios'

export default function FetchUser(userId) {
    const[user,setUser] = useState({})
    const[loading,setLoading] = useState(true)
    useEffect(()=>{
        axios({
            method:'GET',
            url:`https://api.github.com/user/${userId}`
        })
        .then(res=>{
            setUser(res.data)
            setLoading(false)
        })
        .catch(e=>{
            console.log(e)
        })
    },[userId])
    return {user, loading}
}
