import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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

  columnDefs = [
    { headerName: 'avatar_url', 
      field: 'avatar_url',
      cellRenderer: (params)=>`<img src={${params.data.avatar_url}} style={{width:75}}/>` },
    {headerName: 'id', field: 'id'},
    {headerName: 'name', field: 'name'},
    {headerName: 'login', field: 'login'}
  ]
  

  initializeM = () => {
    console.log(this.props);
    this.setState((state, props) => {
      return {names: props.names}
    })
    console.log(this.state);
    this.props.names.map(name => {
      this.updateStatewithProfiles(name);
    });
  }

  componentDidMount() {
    this.initializeM()
  }

  render(){
  //   const rowData = [
  //      {make: "Toyota", model: "Celica", price: 35000},
  //      {make: "Ford", model: "Mondeo", price: 32000},
  //      {make: "Porsche", model: "Boxter", price: 72000}
  //  ];
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter Github profile name"
            ref={this.enteredUserName}/>
          <button>enter</button>
        </form>
        {/* {this.state.profiles.map(profile => (
         <div>
          <img src={profile.avatar_url} style={{width:75}}/>
          <div style={{display:'inline-block', margin: '0.5rem'}}>{profile.id}</div>
          <div style={{display:'inline-block', margin: '0.5rem'}}>{profile.name}</div>
          <div style={{display:'inline-block', margin: '0.5rem'}}>{profile.login}</div>       
         </div> 
        ))} */}
        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
          <AgGridReact rowData={this.state.profiles}
              defaultColDef={{
                  initialWidth: 100,
                  sortable: true,
                  resizable: true}}
              columnDefs={this.columnDefs}>
            <AgGridColumn field="avatar_url"></AgGridColumn>
            <AgGridColumn field="id"></AgGridColumn>
            <AgGridColumn field="name"></AgGridColumn>
            <AgGridColumn field="login"></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    );
  };
}

