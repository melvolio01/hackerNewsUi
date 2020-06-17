import React, { useReducer, useEffect } from 'react';
import { fetchUser, fetchPosts } from '../utils/api';
import { formatTimestamp } from '../utils/helpers';
import ArticleInfo from './ArticleInfo';

const authorReducer = (state, action) => {
    switch (action.type) {
        case 'fetch':
            return {
                ...state,
                loading: true
            }
        case 'author':
            return {
                ...state,
                author: action.author
            }
        case 'posts':
            return {
                ...state,
                posts: action.posts,
                loading: false
            }
        case 'error':
            return {
                ...state,
                error: error.message,
                loading: false
            }
    }
}


const AuthorInfo = ({ location }) => {
    const [state, dispatch] = useReducer(authorReducer,
        { author: null, posts: [], loading: true })


    useEffect(() => {
        fetchUser(location.state.author)
            .then(author => {
                dispatch({ type: 'author', author })
                return fetchPosts(author.submitted.slice(0, 30))
            })
            .then(posts => posts.filter(({ type }) => type === 'story'))
            .then(posts => dispatch({ type: 'posts', posts }))
            .catch(error => dispatch({ type: 'error', error }))
    }, [])

    const { author, posts, loading } = state;
    const date = author && formatTimestamp(author.created)
    return (
        <div>
            {author && (
                <div>
                    <h2>{author.id}</h2>
                    <p>Joined {date} has {author.karma} karma</p>
                    <div dangerouslySetInnerHTML={{ __html: author.about }}></div>
                </div>
            )}
            {loading && <div className="spinner"></div>}

            {posts && (
                <div>
                    <h4>Posts</h4>
                    {posts.map((post) => {
                        return <ArticleInfo post={post} key={post.id} />
                    })}
                </div>
            )}
        </div>
    );
}

export default AuthorInfo;