import React, { Component } from 'react';
import { Button, Container, Dropdown } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import Challenge from './Challenge';

class Challenges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'ALL',
      current: [],
      saved: this.props.progress,
      active: -1,
      challenges: [
        {
          week: 'Starter',
          challenges: [
            {
              id: '0001',
              title: 'Outlive Opponents',
              progress: 0,
              goal: 1000,
              completed: false,
              hard: false,
              reward: 5,
            },
            {
              id: '0002',
              title: 'Play Matches with friends',
              progress: 0,
              goal: 10,
              completed: false,
              hard: false,
              reward: 5,
            },
            {
              id: '0003',
              title: 'Deal damage to opponents',
              progress: 0,
              goal: 5000,
              completed: false,
              hard: false,
              reward: 5,
            },
            {
              id: '0004',
              title: 'Land at different Named Locations',
              progress: 0,
              goal: 10,
              completed: false,
              hard: false,
              reward: 5,
            },
            {
              id: '0005',
              title: 'Play Matches',
              progress: 0,
              goal: 50,
              completed: false,
              hard: false,
              reward: 'Ace Spray',
            },
            {
              id: '0006',
              title: 'Play matches with at least one elimination',
              progress: 0,
              goal: 10,
              completed: false,
              hard: false,
              reward: 'Loading Screen Background',
            },
            {
              id: '0007',
              title: 'Win a Match',
              progress: 0,
              goal: 1,
              completed: false,
              hard: true,
              reward: '#1 Spray',
            },
          ],
        },
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
        {
          week: 'All',
          challenges: [],
        },
      ],
    };

    this.renderChallenges = this.renderChallenges.bind(this);
    this.goBack = this.goBack.bind(this);
    this.updateChallenge = this.updateChallenge.bind(this);
    this.markAllComplete = this.markAllComplete.bind(this);
    this.resetChallenges = this.resetChallenges.bind(this);
    this.filterChallenges = this.filterChallenges.bind(this);
    this.cookies = new Cookies();
  }

  componentDidMount() {
    if (localStorage.getItem('user-progress')) {
      this.setState({
        saved: JSON.parse(localStorage.getItem('user-progress')),
      });
      this.state.saved[this.state.saved.length - 1].challenges = [].concat(
        this.state.saved[0].challenges,
        this.state.saved[1].challenges,
        this.state.saved[2].challenges,
      );
    } else if (this.props.progress.length > 0) {
      this.setState({
        saved: this.props.progress,
      });
      this.state.saved[this.state.saved.length - 1].challenges = [].concat(
        this.props.progress[0].challenges,
        this.props.progress[1].challenges,
        this.props.progress[2].challenges,
      );
    }
    this.state.challenges[this.state.challenges.length - 1].challenges = [].concat(
      this.state.challenges[0].challenges,
      this.state.challenges[1].challenges,
      this.state.challenges[2].challenges,
    );
    return this.filterChallenges(undefined, { value: this.state.filter });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.active !== prevState.active) {
      return this.filterChallenges(undefined, { value: this.state.filter });
    }
  }
  renderChallenges(e) {
    if (this.state.saved.length > 0) {
      return this.setState({
        active: e.target.value,
        current: this.state.saved[e.target.value].challenges.slice(),
      });
    }
    return this.setState({
      active: e.target.value,
      current: this.state.challenges[e.target.value].challenges.slice(),
    });
  }

  goBack() {
    this.setState({
      active: -1,
    });
  }

  updateChallenge(id, updatedData) {
    if (this.state.saved.length > 0) {
      const newChallenges = this.state.saved.slice();

      newChallenges[this.state.active].challenges.forEach((challenge) => {
        if (challenge.id === id) {
          challenge.progress = updatedData;
        }
        if (Number(challenge.progress) === challenge.goal) {
          challenge.completed = true;
        }
      });
      this.setState({
        challenges: newChallenges,
        saved: newChallenges,
      });
      this.filterChallenges(undefined, { value: this.state.filter });
      return this.props.updateProgress(this.state.saved);
    }
    const newChallenges = this.state.challenges.slice();

    newChallenges[this.state.active].challenges.forEach((challenge) => {
      if (challenge.id === id) {
        challenge.progress = updatedData;
      }
      if (Number(challenge.progress) === challenge.goal) {
        challenge.completed = true;
      }
    });
    this.setState({
      challenges: newChallenges,
      saved: newChallenges,
    });
    this.filterChallenges(undefined, { value: this.state.filter });
    return this.props.updateProgress(this.state.challenges);
  }

  markAllComplete() {
    if (this.state.saved.length > 0) {
      const newState = this.state.saved.slice();
      newState[this.state.active].challenges.forEach((challenge) => {
        challenge.progress = challenge.goal;
        challenge.completed = true;
        this.updateChallenge(challenge.id, challenge.goal);
      });
      this.setState({
        saved: newState,
      });
    } else {
      const newState = this.state.challenges.slice();
      newState[this.state.active].challenges.forEach((challenge) => {
        challenge.progress = challenge.goal;
        challenge.completed = true;
        this.updateChallenge(challenge.id, challenge.goal);
      });
      this.setState({
        challenges: newState,
      });
    }
    window.gtag('event', 'All Challenges Marked Complete');
    return this.props.updateProgress(newState);
  }

  resetChallenges() {
    if (this.state.saved.length > 0) {
      const newState = this.state.saved.slice();
      newState[this.state.active].challenges.forEach((challenge) => {
        challenge.progress = 0;
        challenge.completed = false;
        this.updateChallenge(challenge.id, 0);
      });
      this.setState({
        saved: newState,
      });
    } else {
      const newState = this.state.challenges.slice();
      newState[this.state.active].challenges.forEach((challenge) => {
        challenge.progress = 0;
        challenge.completed = false;
        this.updateChallenge(challenge.id, 0);
      });
      this.setState({
        challenges: newState,
      });
    }
    window.gtag('event', 'All Challenges Reset');
  }

  filterChallenges(e, { value }) {
    let unfilteredChallenges;
    if (this.state.active === -1) {
      return this.setState({
        filter: 'ALL',
      });
    } else if (this.state.saved.length > 0) {
      console.log(JSON.stringify(this.state.saved[this.state.active]));
      unfilteredChallenges = this.state.saved[this.state.active].challenges.slice();
    } else {
      unfilteredChallenges = this.state.challenges[this.state.active].challenges.slice();
    }
    const filteredChallenges = [];
    unfilteredChallenges.forEach((challenge) => {
      if (value === 'INCOMPLETE') {
        console.log(`Incomplete. Challenge: ${challenge.completed}`);
        if (!challenge.completed) {
          console.log('Pushing');
          filteredChallenges.push(challenge);
        }
      } else if (value === 'COMPLETED') {
        console.log(`Complete. Challenge: ${challenge.completed}`);
        if (challenge.completed) {
          console.log('Pushing');
          filteredChallenges.push(challenge);
        }
      } else if (value === 'ALL') {
        filteredChallenges.push(challenge);
      }
    });

    this.setState({
      filter: value,
      current: filteredChallenges,
    });
  }

  render() {
    const showOrHide = this.state.active !== -1 ? '' : 'hide';

    const getChallenges = () => {
      // if (this.state.saved.length > 0) {
      //     weeks.challenges.map((challenge) => {
      //       console.log(`Challenge: ${JSON.stringify(challenge)}`);
      //       if (this.state.filter === 'INCOMPLETE' && !challenge.completed) {
      //         return (
      //           <Challenge
      //             key={challenge.id}
      //             updateChallenge={this.updateChallenge}
      //             challenge={challenge}
      //             className="challenge"
      //           />
      //         );
      //       } else if (this.state.filter === 'COMPLETED' && challenge.completed) {
      //         return (
      //           <Challenge
      //             key={challenge.id}
      //             updateChallenge={this.updateChallenge}
      //             challenge={challenge}
      //             className="challenge"
      //           />
      //         );
      //       }
      //       return (
      //         <Challenge
      //           key={challenge.id}
      //           updateChallenge={this.updateChallenge}
      //           challenge={challenge}
      //           className="challenge"
      //         />
      //       );
      //     });
      // } else {
      this.state.current.map((challenge) => {
        if (this.state.filter === 'INCOMPLETE' && !challenge.completed) {
          return (
            <Challenge
              key={challenge.id}
              updateChallenge={this.updateChallenge}
              challenge={challenge}
              className="challenge"
            />
          );
        } else if (this.state.filter === 'COMPLETED' && challenge.completed) {
          return (
            <Challenge
              key={challenge.id}
              updateChallenge={this.updateChallenge}
              challenge={challenge}
              className="challenge"
            />
          );
        }
        return (
          <Challenge
            key={challenge.id}
            updateChallenge={this.updateChallenge}
            challenge={challenge}
            className="challenge"
          />
        );
      });
    };

    const getButtons = () => {
      if (this.state.active !== -1) {
        getChallenges();
      }
      return this.state.challenges.map((week) => {
        console.log(week);
        if (week.week === 'Starter' || week.week === 'All') {
          return (
            <Button
              value={this.state.challenges.indexOf(week)}
              content={week.week}
              onClick={this.renderChallenges}
            />
          );
        }
        return (
          <Button value={week.week} content={`Week ${week.week}`} onClick={this.renderChallenges} />
        );
      });
    };

    // const allDone = () => {
    //   if (this.state.active >= 0 && this.state.saved.length > 0) {
    //     let flag = true;
    //     this.state.saved.forEach((week) => {
    //       week.challenges.forEach((challenge) => {
    //         if (flag === true) {
    //           if (!challenge.completed) {
    //             flag = false;
    //           }
    //         }
    //       });
    //     });
    //     if (flag === false) {
    //       return (
    //         <Button
    //           id="mark-all-button"
    //           content="Mark All as Complete"
    //           onClick={this.markAllComplete}
    //           className={showOrHide}
    //         />
    //       );
    //     }
    //     return (
    //       <Button
    //         id="mark-all-button"
    //         content="Reset these Challenges"
    //         onClick={this.resetChallenges}
    //         className={showOrHide}
    //       />
    //     );
    //     return this.props.updateProgress(this.state.saved);
    //   } else {
    //   if (this.state.active >= 0) {
    //     let flag = true;
    //     this.state.current.forEach((challenge) => {
    //       if (flag === true) {
    //         if (!challenge.completed) {
    //           flag = false;
    //         }
    //       }
    //     });
    //     if (flag === false) {
    //       return (
    //         <Button
    //           id="mark-all-button"
    //           content="Mark All as Complete"
    //           onClick={this.markAllComplete}
    //           className={showOrHide}
    //         />
    //       );
    //     }
    //     return (
    //       <Button
    //         id="mark-all-button"
    //         content="Reset these Challenges"
    //         onClick={this.resetChallenges}
    //         className={showOrHide}
    //       />
    //     );
    //   }
    //   return this.props.updateProgress(this.state.current);
    // }
    // };

    const renderButtons = () => {
      const fetchChallenges = this.state.current.map(challenge => (
        <Challenge
          key={challenge.id}
          updateChallenge={this.updateChallenge}
          challenge={challenge}
          className="challenge"
        />
      ));

      return fetchChallenges;
    };
    const options = [
      { key: 'ALL', value: 'ALL', text: 'Show All Challenges' },
      { key: 'COMPLETED', value: 'COMPLETED', text: 'Show Only Completed Challenges' },
      { key: 'INCOMPLETE', value: 'INCOMPLETE', text: 'Show Only Unfinished Challenges' },
    ];
    return (
      <Container>
        <Container id="challenge-weeks">{getButtons()}</Container>
        <Container>
          <Dropdown
            options={options}
            onChange={this.filterChallenges}
            placeholder="Show All Challenges"
            value={this.state.filter}
            id="challenge-filter-dropdown"
            className={showOrHide}
            // style={{ display: 'none' }}
          />
        </Container>
        <Container id="challenge-container">{renderButtons()}</Container>
        {/* {allDone()} */}
      </Container>
    );
  }
}

export default Challenges;
