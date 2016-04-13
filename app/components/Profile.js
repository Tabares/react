var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfiles = require('./Github/UserProfiles');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

//TODO: mixins
var Profile = React.createClass({
  mixins : [ReactFireMixin],
  getInitialState: function(){
    return{
      notes: [1,2,3],
       bio: {
         name: 'Jose Tabares'
       },
       repos: ['a', 'b', 'c']
     }
  },
  componentDidMount: function(){
    this.ref = new Firebase('https://radiant-fire-9853.firebaseio.com/');
    var childRef = this.ref.child(this.props.params.username);
    this.bindAsArray(childRef, 'notes');
  },
  componentWillUnmount: function(){
    this.unbind('notes');
  },
  render: function(){
    console.log(this.props)
    return(
      <div className="row">
        <div className="col-md-4">
          <UserProfiles username={this.props.params.username} bio={this.state.bio} />
          User Profile --> {this.props.params.username}
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username}  repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes  username={this.props.params.username} notes={this.state.notes} />
        </div>
      </div>

    )
  }

});

module.exports = Profile;
