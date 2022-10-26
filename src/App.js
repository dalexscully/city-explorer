import React from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import CityForm from './Components/CityForm';
import Weather from './Components/Weather';
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
      img: '',
      weatherData: [],
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

      // console.log(cityData.datals[0]);
      this.setState({
        cityData: cityData.data[0],
        error: false,
        lon: cityData.data[0].lon,
        lat: cityData.data[0].lat,
      });

      console.log(this.state)

    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message,
      })
    }

  }

  getWeatherData = async () => {
    
    // TODO: BUILD OUT FUNCTIONALITY TO CALL MY SERVER AND GET PET DATA
    
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.cityName}`;

      let weatherData = await axios.get(url);

      this.setState({
        weatherData: weatherData.data,
      
      })
   
  }

  render() {
    return (
      <>
        <Weather 
        weatherData={this.state.weatherData}/>

        <Header />

        <CityForm 
        getCityData={this.getCityData} handleInput={this.handleInput}/>

        <Main />

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
              <img id="map" alt='location Map'src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYEXPLORER_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`} />}
            </div>
        }
        <Footer />
      </>
    )
  }

}

export default App;