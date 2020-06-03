import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header.jsx';
import Articles from './components/Articles.jsx';
import ArticleText from './components/ArticleText.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Comments from './components/Comments.jsx';
import './index.scss';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <ErrorBoundary>
                        <Switch>
                            <Route exact path='/' render={() => <Articles type='top' />} />
                            <Route path='/new' render={() => <Articles type='new' />} />
                            <Route path='/article' component={ArticleText} />
                            <Route path='/comments' component={Comments} />
                            <Route render={() => <h1>404</h1>} />
                        </Switch>
                    </ErrorBoundary>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
