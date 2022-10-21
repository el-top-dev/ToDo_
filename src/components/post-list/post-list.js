import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import PostListItem from '../post-list-item';
const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked})=>{

    const elements = posts.map((item)=>{
        const {id, ...itemProps} = item;
        return(
            <li key={id} className = "list-group-item">
                <PostListItem {...itemProps} 
                onDelete={()=> onDelete(id)}
                onToggleLiked={()=>onToggleLiked(id)}
                onToggleImportant={()=>onToggleImportant(id)}
                />
            </li>
        )
    });

    return (
        <ListGroup className = "app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;