import React, { Component } from 'react';
import apiKey from '../api/index.js';
import DailyWeatherCard from './DailyWeatherCard.js';
import WeatherGraph from './WeatherGraph.js';
import './card.scss';
import './graph.scss';

class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: null,
      dailyData: null,
      active: false,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Yerevan,am&appid=${apiKey}&units=metric`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const hourlyData = this.filterHourlyWeather(data);
        const dailyData = this.filterDailyWeather(data);
        const axisData = this.filterChartData(data);
        const minMaxData = this.filterMinMax(hourlyData);
        this.setState({
          fullData: data,
          dailyData: dailyData,
          hourlyData: hourlyData,
          axisData: axisData,
          minMaxData: minMaxData,
        });
      });
  };
  filterDailyWeather(data) {
    let dailyData;
    if (data) {
      dailyData = data.list.filter(reading => {
        return reading.dt_txt.includes('15:00:00');
      });
    }
    return dailyData;
  }

  filterMinMax = hourlyData => {
    let retArray = [];
    hourlyData.map(dayData => {
      let maxTemp = -200;
      let minTemp = 200;
      let description = dayData.value[0].data.weather[0].description;
      let icon = dayData.value[0].data.weather[0].icon;
      dayData.value.map(day => {
        if (day.data.main.temp_max >= maxTemp) {
          maxTemp = day.data.main.temp_max;
        }
        if (day.data.main.temp_min <= minTemp) {
          minTemp = day.data.main.temp_min;
        }
      });
      retArray.push({
        key: dayData.key,
        temp_max: maxTemp,
        temp_min: minTemp,
        icon,
        description,
      });
    });
    return retArray;
  };

  filterHourlyWeather = data => {
    let retObj = {};
    data.list.map(el => {
      let elData = new Date(el.dt * 1000);
      let strDate = elData.toLocaleDateString();
      if (!retObj[strDate]) {
        retObj[strDate] = [];
      }
      let hourKey = elData.getHours();
      let finalVal = {};
      finalVal.hour = hourKey;
      finalVal.data = el;
      retObj[strDate].push(finalVal);
    });
    let finalArray = [];
    Object.keys(retObj).map(key => {
      finalArray.push({ key, value: retObj[key] });
    });
    return finalArray;
  };

  filterChartData = weatherData => {
    const axisData = weatherData.list.map(el => {
      return { date: el.dt * 1000, temp: el.main.temp };
    });
    return axisData;
  };
  renderWeatherCards = () => {
    const { minMaxData, hourlyData } = this.state;
    return (
      <div className="card-container">
        {minMaxData ? (
          minMaxData.map((data, index) => {
            return (
              <DailyWeatherCard
                data={data}
                hourlyData={hourlyData[index].value}
              />
            );
          })
        ) : (
          <div>not fetched</div>
        )}
      </div>
    );
  };

  render() {
    const { fullData } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'column',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {this.renderWeatherCards()}
        <div className="graph-container">
          <WeatherGraph weatherData={fullData ? fullData : ''} />
        </div>
      </div>
    );
  }
}

export default WeatherContainer;
