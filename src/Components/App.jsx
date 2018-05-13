import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import Challenges from './Challenges';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      page: 'login',
      progress: [],
    };

    this.updateProgress = this.updateProgress.bind(this);
    this.cookies = new Cookies();
  }
  componentWillMount() {
    if (this.cookies.get('user-progress')) {
      return this.updateProgress(this.cookies.get('user-progress'));
    }
  }
  updateProgress(progress) {
    this.setState({
      progress,
    });
    setTimeout(() => {
      this.cookies.set('user-progress', this.state.progress);
    }, 0);
  }

  render() {
    return (
      <div className="fullscreen-container homepage">
        <Container fluid textAlign="center" id="homepage-container">
          <Header as="h1" id="welcome-header">
            BattlePass Challenge Tracker
          </Header>
          <Challenges progress={this.state.progress} updateProgress={this.updateProgress} />
        </Container>
      </div>
    );
  }
}

export default App;
