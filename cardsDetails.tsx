import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';


export default class Card extends Component {
  constructor() {
    super();
    this.state = {profiles: [], names: []};
  }
  handleSubmit = (event) => {
      event.preventDefault(); 
      this.updateStatewithProfiles(this.enteredUserName.current.value);
      this.enteredUserName.current.value = '';
  }

  updateStatewithProfiles = async (name) => {
      const data = await this.getGithubData(name);
      
      this.setState((state, props) => {
        return {profiles: [...state.profiles, data]}
      });
  }

  getGithubData = async (userName) => {
    const resp = await axios.get(`https://api.github.com/users/${userName}`);

    return resp.data;
  }

  enteredUserName = React.createRef();
  

  initializeM = () => { 
    console.log(this.props);
    this.setState((state, props) => {
      // console.log({...state});
      // console.log(props);
      return {names: props.names}
    })
    console.log(this.state);
    this.props.names.map(name => {
      this.updateStatewithProfiles(name);
    });
    // this.updateStatewithProfiles
  }

  componentDidMount() {
    this.initializeM()
  }

  render(){
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter Github profile name"
            ref={this.enteredUserName}/>
          <button>enter</button>
        </form>
        {/* { this.props.names.map(name => <h3>{name}</h3>) } */}
        {this.state.profiles.map(profile => (
         <div>
          <img src={profile.avatar_url} style={{width:75}}/>
          <div style={{display:'inline-block', margin: '0.5rem'}}>{profile.id}</div>
          <div style={{display:'inline-block', margin: '0.5rem'}}>{profile.name}</div>
          <div style={{display:'inline-block', margin: '0.5rem'}}>{profile.login}</div>
          {/* <h3>{profile.login}</h3>
          <h3>{profile.id}</h3>
          <h3>{profile.id}</h3> */}
          
         </div> 
        ))}
      </div>
    );
  };
}

