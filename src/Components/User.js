import React from 'react'
import FetchUser from '../api/FetchUser'
import FetchRepo from '../api/FetchRepo'

const User = ({match}) => {
    const{user,loading}=FetchUser(match.params.id)
    const{repos}=FetchRepo(user.repos_url)
        
    
    // console.log(User.props.match)
   
    return (
        <div>
            <div>{loading&& 'Loading......'}</div>
            <div>{user&& user.name}</div>
            <h3>Repositories</h3>
            {repos.length && repos.map((repo,index)=>{
                return(<div key={index}>{repo.name}</div>)
            })}
        </div>
    )
}
export default User
