import React, { Component } from 'react';
import { fetchUser, fetchPosts } from '../utils/api';
import { formatTimestamp } from '../utils/helpers';
import ArticleInfo from './ArticleInfo';
import PropTypes from 'prop-types';

class AuthorInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            author: null,
            posts: null,
            loading: true
        }
    }

    componentDidMount() {
        const { location: { state: { author } } } = this.props;
        fetchUser(author)
            .then(author => this.setState({
                author: author,
            }))
            .then(() => fetchPosts(this.state.author.submitted))
            .then((posts) => posts.filter(({ type }) => type === 'story'))
            .then((posts) => this.setState({
                posts: posts,
                loading: false
            }))
    }

    render() {
        const { author, posts, loading } = this.state;
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
                {this.state.loading && <div className="spinner"></div>}

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
}

AuthorInfo.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired
}

export default AuthorInfo;