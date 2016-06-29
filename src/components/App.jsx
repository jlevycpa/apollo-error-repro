import React from 'react';

// import { Grid, Row, Col } from 'react-bootstrap'

class App extends React.Component {
  render() {
    return (
      <div>
        {'theApp'}
        {this.props.children}
      </div>
    )
  }
}

export default App;
