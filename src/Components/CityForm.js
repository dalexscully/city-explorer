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
      <div>
        <Form id="form" onSubmit={this.props.getCityData}>
          <label > Locate A City
            <input type="text" onInput={this.props.handleInput} />
            <Button type="submit">Explore!</Button>
          </label>
        </Form>
      </div>
      
    );
  }
}

export default CityForm;