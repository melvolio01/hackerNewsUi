import React, { useReducer, useEffect } from 'react';
import { formatTimestamp } from '../utils/helpers';
import { fetchComments } from '../utils/api';
import { Link } from 'react-router-dom';

const commentReducer = (state, action) => {
    switch (action.type) {
        case 'comments':
            return {
                ...state,
                comments: action.comments,
                loading: false
            }
        case 'error':
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        case 'default':
            return new Error('That action was not recognized.')
    }
}

const Comments = ({ location }) => {
    const [state, dispatch] = useReducer(commentReducer, { comments: [], loading: true, error: null })
    useEffect(() => {
        const { state: { post: { kids } } } = location
        if (kids) {
            console.log(`kids found, fetch: ${kids}`)
            fetchComments(kids)
                .then(data => dispatch({ type: 'comments', comments: data }))
                .catch(error => dispatch({ type: 'error', error }))
        }
    }, [])
    const { state: { post: { title, by, descendants, time } } } = location;
    const dateString = formatTimestamp(time);

    return (
        <div>
            <h2>{title}</h2>
            <p>by <Link to={{ pathname: '/author', state: { author: by } }} >{by}</Link> on {dateString} with {descendants} comments</p>
            <div className="comments">
                {state.comments && (
                    state.comments.map((comment) => {
                        const { id, by, text } = comment;
                        return <div key={comment.id} className="comment">
                            <p>by <Link to={{ pathname: '/author', state: { author: by } }} >{by}</Link>, on {dateString}</p>

                            <div dangerouslySetInnerHTML={{ __html: text }}></div>
                        </div>
                    }))
                }
            </div>
        </div >)
}

export default Comments;