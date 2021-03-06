import {useEffect,useState} from 'react'
import Axios from 'axios'

// const perPage =5
export default function FetchData(query, pageNumber) {
    const [loading, setLoading]=useState(true)
    const [profiles, setProfiles]=useState([])
    const [hasMore, setHasMore]=useState(false)

    useEffect(()=>{
        setProfiles([])
    },[query])

    useEffect(()=>{
        let cancel
        Axios({
            method:'get',
            url:'https://api.github.com/search/users',
            params:{q:query, page:pageNumber, per_page:20},
            cancelToken:new Axios.CancelToken(c=> cancel=c)
        })
        .then(res=>{
            setProfiles(prevProfiles=>{
                return [...prevProfiles, ...res.data.items]
            })
            setHasMore(res.data.items.length>0)
            setLoading(false)
        })
        .catch(e=>{
            if (Axios.isCancel(e)) return
            console.log(e)
        })
        return()=>cancel()
    },[query, pageNumber])
    return { loading, profiles, hasMore}
}
