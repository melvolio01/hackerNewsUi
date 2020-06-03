import React, { Component } from 'react';
import { fetchPostIds } from '../utils/api';
import { removeDuds } from '../utils/helpers';
import ArticleInfo from './ArticleInfo';
import ErrorBoundary from './ErrorBoundary';

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const { type } = this.props;
        fetchPostIds(type)
            .then((res) => removeDuds(res))
            .then((items) => this.setState({
                posts: items
            }))
            .catch((err) => console.log(err));
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="articles">
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
}

export default Articles;