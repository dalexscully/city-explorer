import React from 'react';
import Card from 'react-bootstrap/Card';
import './Movies.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let movieDataParsed = this.props.movieData.map((movie) => (
      <Col className='m-4'>
        <Card className='movieCard'>
          <Card.Img variant="top" src={`https://tmdb.org/t/p/w300${movie.img}`} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              {movie.overview}
            </Card.Text>
        </Card.Body>
      </Card>
      </Col >
    ))

    return (
      <Container id='contain' fluid>
        <Row id='row' xs={1} sm={1} md={2} lg={4} className='g-4'>
          {movieDataParsed}
        </Row>
      </Container>
    );
  }
}


export default Movies





