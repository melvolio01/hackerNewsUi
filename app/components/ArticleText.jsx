import React, { Component } from 'react';
import { formatTimestamp } from '../utils/helpers';
import { fetchComments } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ArticleText extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        const { kids } = this.props.location.state.post;
        if (kids) {
            fetchComments(kids)
                .then((data) => this.setState({
                    comments: data
                }))
        }
    }

    render() {
        const { location: { state: { post: { title, by, descendants, time, text } } } } = this.props;
        const dateString = formatTimestamp(time);
        return (
            <div className="article-details">
                <h2>{title}</h2>
                <p>by <Link to={{ pathname: '/author', state: { author: by } }} >{by}</Link>, on {dateString}, with <Link to={{ pathname: "/comments", state: { post: this.props.location.state.post } }}>{descendants} comments</Link></p>
                <div dangerouslySetInnerHTML={{ __html: text }}></div>
                <div className="comments">
                    {this.state.comments && (
                        this.state.comments.map((comment) => {
                            const { id, by, text } = comment;
                            return <div key={comment.id} className="comment">
                                <p>by {by}, {dateString}</p>
                                <div dangerouslySetInnerHTML={{ __html: text }}></div>
                            </div>
                        }))
                    }
                </div>
            </div>
        );
    }
}

ArticleText.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired
}

export default ArticleText;