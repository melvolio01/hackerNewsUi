import React from 'react';
import { formatTimestamp } from '../utils/helpers';
import { Link } from 'react-router-dom';

const ArticleInfo = ({ post }) => {
    const { title, by, descendants, id, score, time, type, url } = post;
    const dateString = formatTimestamp(time);
    return (
        <div>
            <h4>
                {url ? <a href={url}>{title}</a> :
                    <Link to={{ pathname: '/article', state: { post: post } }}>{title}</Link>}

            </h4>
            <p>by {by}, on {dateString}, with {descendants} comments</p>
        </div>
    );
};

export default ArticleInfo;