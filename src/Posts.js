import { useState,useEffect } from "react";
import {useParams} from 'react-router-dom';
import './Posts.css';

function Posts(){

    const [post, setPost] = useState();
    const [comment,setComment] = useState();
    let {id} = useParams();

    useEffect(()=>{
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(res => setPost(res))
    },[id]);

    useEffect(()=>{
        fetch(`https://dummyjson.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(res => setComment(res))
    }, [id]);

    if(post !== undefined && comment !== undefined){
        return( 
            <div>
                <h3>{post.title}</h3>
                <p className="post">{post.body}</p>
                <h3>Comments</h3>
                {comment.comments.map(function(obj){
                    return (<p className="comments">{obj.body}</p>)
                })}

            </div>
        )
        }
}

export default Posts;