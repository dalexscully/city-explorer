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
      <Col className='m-5'>
        <Card className='h-100 movieCard'>
          <Card.Img variant="top" src={`https://tmdb.org/t/p/w300${movie.img}`} />
          <Card.Body>
            <Card.Title id= 'title'>{movie.title}</Card.Title>
            <Card.Text id= 'body'>
              {movie.overview}
            </Card.Text>
        </Card.Body>
      </Card>
      </Col >
    ))

    return (
      <Container id='contain' fluid>
        <Row id='row' xs={1} sm={1} md={2} lg={4}>
          {movieDataParsed}
        </Row>
      </Container>
    );
  }
}


export default Movies





