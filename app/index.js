import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                Hello world!
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))

export default index;