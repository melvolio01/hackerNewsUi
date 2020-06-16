import React, { useState, useEffect } from 'react';
import { formatTimestamp } from '../utils/helpers';
import { fetchComments } from '../utils/api';
import { Link } from 'react-router-dom';

const ArticleText = ({ location }) => {
    const [comments, setComments] = useState([]);
    const { state: { post } } = location;
    const { title, by, descendants, time, text, kids } = post;
    useEffect(() => {
        fetchComments(kids)
            .then((data) => setComments(data))
    }, [])

    const dateString = formatTimestamp(time);
    return (
        <div className="article-details">
            <h2>{title}</h2>
            <p>by <Link to={{ pathname: '/author', state: { author: by } }} >{by}</Link>, on {dateString}, with <Link to={{ pathname: "/comments", state: { post: post } }}>{descendants} comments</Link></p>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
            <div className="comments">
                {comments && (
                    comments.map((comment) => {
                        const { id, by, text } = comment;
                        return <div key={id} className="comment">
                            <p>by {by}, {dateString}</p>
                            <div dangerouslySetInnerHTML={{ __html: text }}></div>
                        </div>
                    }))
                }
            </div>
        </div>
    );
}

export default ArticleText;