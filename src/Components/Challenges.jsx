import React, { Component } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import Challenge from './Challenge';

class Challenges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: -1,
      challenges: [
        {
          week: 1,
          challenges: [
            {
              id: '0101',
              title: 'Deal damage with Sniper Rifles to opponents',
              progress: 0,
              goal: 500,
              completed: false,
              hard: false,
              reward: 500,
            },
            {
              id: '0102',
              title: 'Search Chests in Haunted Hills',
              progress: 0,
              goal: 7,
              completed: false,
              hard: false,
              reward: 500,
            },
            {
              id: '0103',
              title: 'Use a Port-a-Fort',
              progress: 0,
              goal: 1,
              completed: false,
              hard: false,
              reward: 500,
            },
            {
              id: '0104',
              title: 'Search F-O-R-T-N-I-T-E Letters',
              progress: 0,
              goal: 8,
              completed: false,
              hard: false,
              reward: 500,
            },
            {
              id: '0105',
              title: 'Follow the treasure map found in Tomato Town',
              progress: 0,
              goal: 1,
              completed: false,
              hard: true,
              reward: 1000,
            },
            {
              id: '0106',
              title: 'Pistol Eliminations',
              progress: 0,
              goal: 3,
              completed: false,
              hard: true,
              reward: 1000,
            },
            {
              id: '0107',
              title: 'Eliminate opponents in Flush Factory',
              progress: 0,
              goal: 3,
              completed: false,
              hard: true,
              reward: 1000,
            },
          ],
        },
        {
          week: 2,
          challenges: [
            {
              id: '0201',
              title: 'Search Chests in Greasy Grove',
              progress: 0,
              goal: 7,
              completed: false,
              hard: false,
              reward: 500,
            },
            {
              id: '0202',
              title: 'Consume Hop Rocks',
              progress: 0,
              goal: 7,
              completed: false,
              hard: false,
              reward: 500,
            },
            {
              id: '0203',
              title: 'Deal damage with Suppressed Weapons to opponents',
              progress: 0,
              goal: 500,
              completed: false,
              hard: false,
              reward: 500,
            },
            {
              id: '0204',
              title: 'Dance in front of different film cameras',
              progress: 0,
              goal: 7,
              completed: false,
              hard: false,
              reward: 500,
            },
            {
              id: '0205',
              title: 'Search between a Scarecrow, Pink Hotrod, and a Big Screen',
              progress: 0,
              goal: 1,
              completed: false,
              hard: true,
              reward: 1000,
            },
            {
              id: '0206',
              title: 'Explosive Weapon Eliminations',
              progress: 0,
              goal: 3,
              completed: false,
              hard: true,
              reward: 1000,
            },
            {
              id: '0207',
              title: 'Eliminate opponents in Tomato Town',
              progress: 0,
              goal: 3,
              completed: false,
              hard: true,
              reward: 1000,
            },
          ],
        },
      ],
    };

    this.renderChallenges = this.renderChallenges.bind(this);
    this.goBack = this.goBack.bind(this);
    this.updateChallenge = this.updateChallenge.bind(this);
  }

  componentDidMount() {
    if (this.props.progress.length > 0) {
      this.setState({
        challenges: this.props.progress,
      });
    }
  }
  renderChallenges(e) {
    this.setState({
      active: e.target.value - 1,
    });
  }

  goBack() {
    this.setState({
      active: -1,
    });
  }

  updateChallenge(id, updatedData) {
    const newChallenges = this.state.challenges.slice();

    newChallenges.forEach((week) => {
      week.challenges.forEach((challenge) => {
        if (challenge.id === id) {
          challenge.progress = updatedData;
        }
        if (Number(challenge.progress) === challenge.goal) {
          challenge.completed = true;
        }
      });
    });
    this.setState({
      challenges: newChallenges,
    });
    return this.props.updateProgress(this.state.challenges);
  }

  render() {
    const showOrHide = this.state.active !== -1 ? '' : 'hide';

    const renderButtons = () => {
      const count = -1;
      if (this.state.active === -1) {
        return this.state.challenges.map(week => (
          <Button value={week.week} content={`Week ${week.week}`} onClick={this.renderChallenges} />
        ));
      }
      return this.state.challenges[this.state.active].challenges.map(challenge => (
        <Challenge
          key={challenge.id}
          updateChallenge={this.updateChallenge}
          challenge={challenge}
          className="challenge"
        />
      ));
    };

    return (
      <Container>
        <Button id="top-button" content="Go Back" onClick={this.goBack} className={showOrHide} />
        <Container id="challenge-container">{renderButtons()}</Container>
        <Button id="bottom-button" content="Go Back" onClick={this.goBack} className={showOrHide} />
      </Container>
    );
  }
}

export default Challenges;
