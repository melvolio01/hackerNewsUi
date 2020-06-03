import React, { Component } from 'react';
import { formatTimestamp } from '../utils/helpers';
import { fetchComments } from '../utils/api';

class Comments extends Component {
    constructor(props) {
        super(props);

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

    render(props) {
        const { title, by, descendants, id, score, time, type, url, kids } = this.props.location.state.post;
        const dateString = formatTimestamp(time);

        return (
            <div>
                <h2>{title}</h2>
                <p>by {by} on {dateString} with {descendants} comments</p>
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

export default Comments;