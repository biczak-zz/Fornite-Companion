import React, { Component } from 'react';
import { Checkbox, Button, Header, Icon, Input, Segment, Progress } from 'semantic-ui-react';

class Challenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.challenge.completed,
      progress: this.props.challenge.progress,
      goal: this.props.challenge.goal,
      checkedBoxes: 0,
      userInput: undefined,
    };

    this.incrementProgress = this.incrementProgress.bind(this);
    this.decrementProgress = this.decrementProgress.bind(this);
    this.inputProgress = this.inputProgress.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }
  componentWillMount() {
    if (this.props.challenge.id === '0102') {
      console.log(`Mounting: ${JSON.stringify(this.props.challenge)}`);
    }
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

  shouldComponentUpdate(newProps, newState) {
    if (this.state.progress !== newProps.challenge.progress) {
      this.setState({
        completed: this.props.challenge.completed,
        progress: this.props.challenge.progress,
        goal: this.props.challenge.goal,
      });
      return true;
    }
    return false;
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
    window.gtag('event', 'Progress Incremented');
    return this.props.updateChallenge(this.props.challenge.id, this.state.progress + 1);
  }

  decrementProgress() {
    console.log(`this.state.progress is a ${typeof this.state.progress}`);
    if (this.state.progress > 0) {
      alert('Decrementing');
      const increment = (this.state.progress - 1) / this.state.goal;
      const percentage = increment * 100;
      window.gtag('event', 'Progress Decremented');
      this.setState({
        progress: this.state.progress - 1,
        percent: percentage,
      });
      return this.props.updateChallenge(this.props.challenge.id, this.state.progress - 1);
    }
  }

  inputProgress(e) {
    const userInput = e.target.value;
    if (Number(userInput) > this.props.challenge.goal) {
      e.target.value = this.props.challenge.goal;
    } else if (Number(userInput) < 0) {
      e.target.value = 0;
    }
    return this.setState({
      userInput: e.target.value,
    });
  }

  submitInput() {
    window.gtag('event', 'Input Submitted');
    let input = this.state.userInput;
    if (this.state.userInput > this.state.goal) {
      input = this.state.goal;
    } else if (this.state.userInput < 0) {
      input = 0;
    } else if (!this.state.userInput || this.state.userInput === '') {
      input = this.state.progress;
    }

    this.setState({
      progress: input,
      percent: input / this.state.goal * 100,
      userInput: undefined,
    });
    return this.props.updateChallenge(this.props.challenge.id, input);
  }

  toggleCheckbox(e) {
    if (![...e.currentTarget.classList].includes('checked')) {
      this.setState({
        progress: 1,
      });
      return this.props.updateChallenge(this.props.challenge.id, this.props.challenge.goal);
    }
    this.setState({
      progress: 0,
    });
    return this.props.updateChallenge(this.props.challenge.id, 0);
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
            value={Number(this.state.userInput) || this.state.userInput}
            onChange={this.inputProgress}
          />
          <Button className="challenge-input" onClick={this.submitInput} content="Update" />
        </div>
      );
    };

    const challengeReward =
      Number(this.props.challenge.progress) === this.props.challenge.goal
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
          percent={this.state.progress / this.props.challenge.goal * 100}
          className="challenge-progress-bar"
        >
          <span className="challenge-progress-text">
            {`${this.state.progress} / ${this.props.challenge.goal}`}
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
