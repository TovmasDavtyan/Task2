
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import './Posts.css';

function PostTitles(){
    
    const [data, setData] = useState();

    useEffect(()=>{
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(res => setData(res))
    },[]);


    if(data !== undefined){
        return <div className="titles">{data.posts.map(function(obj){
            return (
                <Link to={`/task2/${obj.id}`}  key={obj.id}>
                    {obj.title}
                </Link>
            )
        })}</div>
        }
}

export default PostTitles;