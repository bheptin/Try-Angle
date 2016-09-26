import React, { Component } from 'react';
import Select from 'react-select';
import MediaQuery from 'react-responsive';
import 'react-select/dist/react-select.css';

class MobileSelect extends Component {
  constructor() {
    super();
    this.state = {value: []};
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(value) {
    this.setState({value});
  }
  handleCheck()
  render() {
    let options = this.props.myChoices.map(choice => {
      return {value: choice.id, label: choice.name}
    });
    return (
      <div>
        <MediaQuery query='(max-width: 700px)'>
          <Select
            multi={true}
            value={this.state.value}
            placeholder="Make some choices"
            options={options}
            onChange={this.handleSelect}/>
        </MediaQuery>
        <MediaQuery query='(min-width: 701px)'>
          <Select
            multi={true}
            value={this.state.value}
            placeholder=""
            searchable={false}
            noResultsText={false}/>
        </MediaQuery>
      </div>
    )
  }
}

export default MobileSelect;
