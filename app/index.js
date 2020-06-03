import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header.jsx';
import Articles from './components/Articles.jsx';
import ArticleText from './components/ArticleText.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Comments from './components/Comments.jsx';
import AuthorInfo from './components/AuthorInfo.jsx';
import { ThemeProvider, ThemeConsumer } from './contexts/theme.js';
import './index.scss';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: 'dark',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <Header />
                        <ErrorBoundary>
                            <Switch>
                                <Route exact path='/' render={() => <Articles type='top' />} />
                                <Route path='/new' render={() => <Articles type='new' />} />
                                <Route path='/article' component={ArticleText} />
                                <Route path='/comments' component={Comments} />
                                <Route path='/author' component={AuthorInfo} />
                                <Route render={() => <h1>404</h1>} />
                            </Switch>
                        </ErrorBoundary>
                    </div>
                </ThemeProvider>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
