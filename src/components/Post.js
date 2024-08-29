import React from 'react';
import './Post.css';

function Post({ data }) {
    return (
      <div className="post">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <a href={data.url} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    );
  }
  
export default Post;
