import React, {Component} from 'react'
import apiKey from '../api/index.js'
class WeatherContainer extends Component {

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Yerevan,am&appid=${apiKey}`);
    const data = await api_call.json();
    console.log(data);
  }
  render() {
    return(<div>testing</div>);
  }
}

export default WeatherContainer;