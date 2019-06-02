import React, { Component } from 'react';
import apiKey from '../api/index.js';
import DailyWeatherCard from './DailyWeatherCard.js';
import './card.scss';
class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      dailyData: null,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=Yerevan,am&appid=${apiKey}&units=metric`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const dailyData = this.filterDailyWeather(data);
        this.setState(
          {
            fullData: data,
            dailyData: dailyData,
          },
          () => console.log(this.state)
        );
      });
  };
  filterDailyWeather(data) {
    console.log('filtering');
    let dailyData;
    if (data) {
      console.log(data);
      dailyData = data.list.filter(reading => {
        return reading.dt_txt.includes('15:00:00');
      });
    }
    return dailyData;
  }


  renderWeatherCards = () => {
    const { dailyData } = this.state;
    console.log('here');
    return (
      <div className='card-container'>
        {dailyData ? (
          dailyData.map(data => {
            return <DailyWeatherCard data={data} />;
          })
        ) : (
          <div>not fetched</div>
        )}
      </div>
    );
  };

  render() {
    return <>{this.renderWeatherCards()}</>;
  }
}

export default WeatherContainer;
