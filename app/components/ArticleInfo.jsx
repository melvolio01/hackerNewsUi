import React from 'react';
import { formatTimestamp } from '../utils/helpers';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ArticleInfo = ({ post }) => {
    const { title, by, descendants, time, url } = post;
    const dateString = formatTimestamp(time);
    return (
        <div className="article-info">
            <h4>
                {url ? <a href={url}>{title}</a> :
                    <Link to={{ pathname: '/article', state: { post: post } }}>{title}</Link>}

            </h4>
            <p>by <Link to={{ pathname: '/author', state: { author: by } }} >{by}</Link>, on {dateString}, with <Link to={{ pathname: "/comments", state: { post: post } }}>{descendants} comments</Link></p>
        </div>
    );
};

ArticleInfo.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired
}

export default ArticleInfo;