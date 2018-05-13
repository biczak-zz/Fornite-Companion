import React, { Component } from 'react';
import { Checkbox, Button, Header, Icon, Input, Segment, Progress } from 'semantic-ui-react';

class Challenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false,
      progress: this.props.challenge.progress,
      goal: this.props.challenge.goal,
      percent: 0,
      checkedBoxes: 0,
      userInput: '',
      reward: 0,
    };

    this.incrementProgress = this.incrementProgress.bind(this);
    this.decrementProgress = this.decrementProgress.bind(this);
    this.inputProgress = this.inputProgress.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  componentDidMount() {
    const checkedBoxes = document.getElementsByClassName('ui checked checkbox');
    this.setState({
      checkedBoxes: checkedBoxes.length,
    });
    // Only show the '(HARD)' Label for Hard Challenges
    if (!this.props.challenge.hard) {
      document.getElementById(this.props.challenge.id).classList.add('hide');
    }
  }

  incrementProgress() {
    if (this.state.progress < this.state.goal) {
      const increment = (this.state.progress + 1) / this.state.goal;
      const percentage = increment * 100;
      this.setState({
        progress: this.state.progress + 1,
        percent: percentage,
      });
    }
    return this.props.updateChallenge(this.props.challenge.id, this.state.progress + 1);
  }

  decrementProgress() {
    if (this.state.progress > 0) {
      const increment = (this.state.progress - 1) / this.state.goal;
      const percentage = increment * 100;
      this.setState({
        progress: this.state.progress - 1,
        percent: percentage,
      });
    }
    return this.props.updateChallenge(this.props.challenge.id, this.state.progress + 1);
  }

  inputProgress(e) {
    this.setState({
      userInput: e.target.value,
    });
  }

  submitInput() {
    let input = this.state.userInput;
    if (this.state.userInput > this.state.goal) {
      input = this.state.goal;
    } else if (this.state.userInput < 0) {
      input = 0;
    } else if (this.state.userInput === '') {
      input = this.state.progress;
    }

    this.setState({
      progress: input,
      percent: input / this.state.goal * 100,
      userInput: '',
    });
    return this.props.updateChallenge(this.props.challenge.id, input);
  }

  toggleCheckbox(e) {
    setTimeout(() => {
      const checkedBoxes = document.getElementsByClassName('ui checked checkbox');
      if (checkedBoxes.length > this.state.checkedBoxes) {
        this.setState({
          progress: 1,
          checkedBoxes: checkedBoxes.length,
        });
      } else {
        this.setState({
          progress: 0,
          checkedBoxes: checkedBoxes.length,
        });
      }
    }, 10);
  }

  render() {
    const inputButtonsOrCheckbox = () => {
      if (this.props.challenge.completed) {
        return (
          <div
            style={{
              justifySelf: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="checkmark" size="large" style={{ color: 'springgreen' }} />
          </div>
        );
      }
      if (this.props.challenge.goal === 1) {
        return (
          <div
            style={{
              justifySelf: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Checkbox label="Complete" onChange={this.toggleCheckbox} />
          </div>
        );
      } else if (this.props.challenge.goal <= 10) {
        return (
          <div
            style={{
              justifySelf: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              className="challenge-buttons"
              negative
              onClick={this.decrementProgress}
              icon="minus"
              size="tiny"
            />
            <Button
              className="challenge-buttons"
              positive
              onClick={this.incrementProgress}
              icon="plus"
              size="tiny"
            />
          </div>
        );
      }
      return (
        <div
          style={{
            justifySelf: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Input
            className="challenge-input"
            type="number"
            value={this.state.userInput}
            onChange={this.inputProgress}
          />
          <Button className="challenge-input" onClick={this.submitInput} content="Update" />
        </div>
      );
    };

    const challengeReward =
      Number(this.state.progress) === this.state.goal
        ? 'challenge-reward-complete'
        : 'challenge-reward-incomplete';

    return (
      <Segment className="challenge-segment">
        <Header as="h2" className="challenge-header">
          {this.props.challenge.title}{' '}
          <span id={this.props.challenge.id} className="challenge-hard">
            (HARD)
          </span>
        </Header>
        {inputButtonsOrCheckbox()}
        <Progress
          indicating
          percent={this.state.progress / this.state.goal * 100}
          className="challenge-progress-bar"
        >
          <span className="challenge-progress-text">
            {`${this.state.progress} / ${this.state.goal}`}
          </span>
        </Progress>
        <p className="challenge-reward-text">
          <span className={challengeReward}>{this.props.challenge.reward} XP</span>
        </p>
      </Segment>
    );
  }
}

export default Challenge;
