import React, { Component } from 'react';
import numeral from 'numeral';
import moment from 'moment';
import './card.scss';
class DailyWeatherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
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

  onCardClick = data => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  renderHourlyWeather = () => {
    const { active } = this.state;
    const { hourlyData } = this.props;
    return (
      <div className="hourly-container">
        {active ? (
          <div className="hourly-box">
            {hourlyData.map(hourdata => {
              return (
                <div className="hourly-cell">
                  <div>{moment(hourdata.data.dt * 1000).format('h:mm a')}</div>
                  <div>
                    {numeral(hourdata.data.main.temp_max).format('0,0')} °C
                  </div>
                  <div>
                    {numeral(hourdata.data.main.temp_min).format('0,0')} °C
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  };

  render() {
    const { data, hourlyData } = this.props;
    return (
      <div>
        <div className="card" onClick={this.onCardClick}>
          <div className="weekday">{this.getDayOfWeek(data.key)}</div>
          <img
            src={`https://openweathermap.org/img/w/${data.icon}.png`}
            alt=""
            style={{ objectFit: 'contain' }}
          />
          <div>{numeral(data.temp_max).format('0,0')} °C</div>
          <div>{numeral(data.temp_min).format('0,0')} °C</div>
          <p>{data.description}</p>
        </div>
        {this.renderHourlyWeather()}
      </div>
    );
  }
}

export default DailyWeatherCard;
