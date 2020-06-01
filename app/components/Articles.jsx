import React, { Component } from 'react';
import { fetchPostIds } from '../utils/api';
import ArticleInfo from './ArticleInfo';

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        console.log(this.props)
        fetchPostIds()
            .then((res) => this.setState({
                posts: res
            }))
            .catch(err => console.log(err));
    }

    render() {
        const { type } = this.props;
        const { posts } = this.state;
        return (
            <div className="articles">
                {posts.map((post) => {
                    const { id } = post;
                    return <div key={id}>
                        <ArticleInfo post={post} />
                    </div>
                })}
            </div>
        );
    }
}

export default Articles;