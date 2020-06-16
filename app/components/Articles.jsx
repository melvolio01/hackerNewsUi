import React, { useEffect, useReducer } from 'react';
import { fetchPostIds } from '../utils/api';
import { removeDuds } from '../utils/helpers';
import ArticleInfo from './ArticleInfo';
import ErrorBoundary from './ErrorBoundary';
import PropTypes from 'prop-types';

const articleReducer = (state, action) => {
    switch (action.type) {
        case 'requesting':
            return {
                ...state,
                posts: [],
                loading: true
            }
        case 'success':
            return {
                ...state,
                posts: action.posts,
                loading: false
            }
        case 'error':
            return {
                ...state,
                error: action.error.message
            }
    }
}

const Articles = ({ type }) => {
    const [state, dispatch] = useReducer(articleReducer,
        { posts: [], loading: true, error: null })

    useEffect(() => {
        dispatch({ type: 'requesting' })
        fetchPostIds(type)
            .then((res) => removeDuds(res))
            .then((items) => dispatch({ type: 'success', posts: items }))
            .catch((err) => dispatch({ type: 'error', error: err.message }))
    }, [type])

    const { posts, loading } = state;
    return (
        <div className="articles">
            {loading && (<div className="spinner"></div>)}
            {posts.map((post) => {
                return <div key={post.id} >
                    <ErrorBoundary>
                        <ArticleInfo post={post} />
                    </ErrorBoundary>
                </div>
            })}
        </div>
    );
}

Articles.propTypes = {
    type: PropTypes.string
}

export default Articles;