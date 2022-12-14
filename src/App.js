import React from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import CityForm from './Components/CityForm';
import Weather from './Components/Weather';
import Movies from './Components/Movies';
import './App.css'
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      lat: '',
      lon: '',
      errorMessage: '',
      weather: [],
      movies: [],
      img: ''
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    console.log(this.state.city);

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITYEXPLORER_API_KEY}&q=${this.state.city}&format=json`

      let cityData = await axios.get(url);
      let showData = cityData.data[0];
      // console.log(cityData.datals[0]);

      this.setState({
        cityData: showData,
        error: false,
        lon: cityData.data[0].lon,
        lat: cityData.data[0].lat,
      }, this.makeApiCall);

      console.log(this.state)

    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message,
      })
    }
    
  }
  makeApiCall = async () => { 
    
    await this.getWeatherData();
    await this.getMovies();

  }
  getWeatherData = async () => {
    try {
      console.log(process.env.REACT_APP_SERVER)
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.lon}`;

      console.log(url);
      console.log('weather url', url);

      let weatherData = await axios.get(url);

      this.setState({
        weather: weatherData.data
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  }

  getMovies = async () => {
    try {
      let movieData = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city_name=${this.state.city}`)
      this.setState({
        movies: movieData.data

      })
    } catch (error) {
      this.setState({
        error: false,
        errorMessage: error.message
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div id='item'>

        <Header />
        
        <Main />

        <CityForm getCityData={this.getCityData} handleInput={this.handleInput} />


        {
          this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <div>
              <p id='title'>{this.state.cityData.display_name}</p>
              <p id='lat'>{this.state.cityData.lat}</p>
              <p id='lon'> {this.state.cityData.lon}</p>
              {this.state.cityData.display_name &&
                <img id="map" alt='location Map' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYEXPLORER_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`} />}
            </div>
        }

        {this.state.movies.length &&
          <Movies
          movieData={this.state.movies} /> 
        }

        <Weather
          weatherData={this.state.weather} />
        <Footer />
      </div>

    )
  }

}

export default App;
