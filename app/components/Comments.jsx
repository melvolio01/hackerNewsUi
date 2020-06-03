import React, { Component } from 'react';
import { formatTimestamp } from '../utils/helpers';
import { fetchComments } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            loading: true
        }
    }

    componentDidMount() {
        const { location: { state: { post: { kids } } } } = this.props;
        if (kids) {
            fetchComments(kids)
                .then((data) => this.setState({
                    comments: data,
                    loading: false
                }))
        }
    }

    render() {
        const { location: { state: { post: { title, by, descendants, time } } } } = this.props;
        const dateString = formatTimestamp(time);

        return (
            <div>
                <h2>{title}</h2>
                <p>by <Link to={{ pathname: '/author', state: { author: by } }} >{by}</Link> on {dateString} with {descendants} comments</p>
                <div className="comments">
                    {this.state.comments && (
                        this.state.comments.map((comment) => {
                            const { id, by, text } = comment;
                            return <div key={comment.id} className="comment">
                                <p>by <Link to={{ pathname: '/author', state: { author: by } }} >{by}</Link>, on {dateString}</p>

                                <div dangerouslySetInnerHTML={{ __html: text }}></div>
                            </div>
                        }))
                    }
                </div>

            </div>
        );
    }
}

Comments.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Comments;