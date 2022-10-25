import React from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import CityForm from './Components/CityForm';
import './App.css'
import axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      citylat: '',
      cityLon: '',
      errorMessage: '',
      img: ''
    }
  }


  handleInput = (event) => {
    event.preventDefault();
    this.setState({
      city: event.target.value
    })
  }

  getCityData = async (event) => {
    event.preventDefault();
    console.log(this.state.city);

    try {

      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITYEXPLORER_API_KEY}&q=${this.state.city}New York&format=json`

      let cityData = await axios.get(url)

      console.log(cityData.data[0]);
      this.setState({
        cityData: cityData.data[0],
        longitude: cityData.data[0].lon,
        latitude: cityData.data[0].lat
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
        
render() {
  
  return (
    <>
      <Header />
      <CityForm />
      <Main />
      <Footer />
    </>
  )
}

}

export default App;