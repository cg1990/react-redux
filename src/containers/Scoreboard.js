import React, {Component, PropTypes} from 'react';
import { bindActionCreator} from 'redux';
import * as PlayerActionCreators from '../action/player';
import { connect } from 'react-redux';
import Player from '../components/Player';
import Header from '../components/Header';
import AddPlayerForm from '../components/AddPlayerForm';


class Scoreboard extends Component{

  static propTypes ={
    players: PropTypes.array.isRequired
  };

  render() {

    const {dispatch, players} = this.props;
    const addPlayer = bindActionCreator(PlayerActionCreators.addPlayer, dispatch);
    const removePlayer = bindActionCreator(PlayerActionCreators.removePlayer, dispatch);
    const updatePlayerScore = bindActionCreator(PlayerActionCreators.updatePlayerScore, dispatch);

    const playerComponent = player.map((player, index) => (
      <Player
      index = {index}
      name = {player.name}
      score = {player.score}
      key = {player.name}
      updatePlayerScore = {updatePlayerScore}
      removePlayer = {removePlayer}
      />
    )
  );

    return (
      <div className="scoreboard">
        <Header players={players} />
        <div className="players">
         { playerComponent }
        </div>
        <AddPlayerForm addPlayer = {addPlayer} />
      </div>
    );
  }
};

// Move to components/Stats.js
// -----------------------------------------------------------------------
function Stats(props) {
  const playerCount = props.players.length;
  const totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{playerCount}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
};

function Counter(props) {
 return (
   <div className="counter" >
     <button className="counter-action decrement" onClick={() => props.onChange(-1)}>
       -
     </button>
     <div className="counter-score"> {props.score} </div>
     <button className="counter-action increment" onClick={() => props.onChange(1)}>
       +
     </button>
   </div>
 );
}

Counter.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  score: React.PropTypes.number.isRequired,
};

const AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return { name: '' };
  },

  onNameChange: function (e) {
    const name = e.target.value;
    this.setState({ name: name });
  },

  onSubmit: function (e) {
    if (e) e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({ name: '' });
  },

  render: function () {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
            placeholder="Player Name"
          />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
})


const mapStateToProps = stats =>(
  {
  players: state
  }
);

export default connect(mapStateToProps)(Scoreboard);