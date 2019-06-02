import React, { Component } from 'react';
import numeral from 'numeral';
import './card.scss';
class DailyWeatherCard extends Component {
  getDayOfWeek = date => {
    var dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][dayOfWeek];
  };

  render() {
    const { data } = this.props;
    return (
      <div className='card'>
        <div className="weekday">{this.getDayOfWeek(data.dt_txt.slice(0, 11))}</div>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="" style={{objectFit: "contain"}}
        />
        <div>{numeral(data.main.temp_max).format('0,0')} °C</div>
        <div>{numeral(data.main.temp_min).format('0,0')} °C</div>
        <p>{data.weather[0].description}</p>
      </div>
    );
  }
}

export default DailyWeatherCard;
