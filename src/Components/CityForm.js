import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <>
        <Form onSubmit={this.getCityData}>
          <label > Locate a City
            <input type="text" onInput={this.handleInput} />
            <Button type="submit">Explore!</Button>
          </label>

        </Form>
      
      </>
    );
  }
}

export default CityForm;