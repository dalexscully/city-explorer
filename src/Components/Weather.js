import React from 'react';
import Card from 'react-bootstrap/Card';


class Weather extends React.Component {
  render(){
    
    return (
      <div>
       <Card>{this.props.weatherData}</Card>
      </div>
    )
  }
}

export default Weather;