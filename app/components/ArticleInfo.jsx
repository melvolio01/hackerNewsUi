import React from 'react';
import { formatTimestamp } from '../utils/helpers';
import { Link } from 'react-router-dom';

const ArticleInfo = ({ post }) => {
    const { title, by, descendants, id, score, time, type, url } = post;
    const dateString = formatTimestamp(time);
    return (
        <div className="article-info">
            <h4>
                {url ? <a href={url}>{title}</a> :
                    <Link to={{ pathname: '/article', state: { post: post } }}>{title}</Link>}

            </h4>
            <p>by {by}, on {dateString}, with <Link to={{ pathname: "/comments", state: { post: post } }}>{descendants} comments</Link></p>
        </div>
    );
};

export default ArticleInfo;