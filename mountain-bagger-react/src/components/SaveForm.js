import React, { Component } from 'react';

class SaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveName: '',
      error: false,
      errorValue: 'A route name must be given',
    };
  }

  onChange = (event) => {
    this.setState({
      saveName: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.saveRoute(this.state.saveName);
  };

  render() {
    return (
      <div className="save-form">
        <form onSubmit={this.onSubmit}> {/* {() => {this.onSubmit(); this.props.toggleSaveForm(false)}}> */}
          <input type="text" name="save" onChange={this.onChange} value={this.state.saveName} placeholder="Name of route" />
          <button type="submit">
            Save route
          </button>
          <button onClick={() => {this.props.saveStaticMap(this.state.saveName, this.props.boundingBox); this.props.toggleSaveForm(false)}}>
            Save map
          </button>
          <button onClick={() => {this.props.clearRoute(); this.props.toggleSaveForm(false)}}>
            Clear
          </button>
        </form>
      </div>
    );
  };
}

export default SaveForm;
