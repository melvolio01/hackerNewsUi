import React from 'react';
import ArticleInfo from './ArticleInfo';
import { formatTimestamp } from '../utils/helpers';

const ArticleText = (props) => {
    const { title, by, descendants, id, score, time, type, url, text } = props.location.state.post;
    const dateString = formatTimestamp(time);

    console.log(`Article text props... ${JSON.stringify(props.location.state.post)}`)
    return (
        <div>
            <h2>{title}</h2>
            <p>by {by}, on {dateString}, with {descendants} comments</p>
            <p>{text}</p>
        </div>
    );
};

export default ArticleText;