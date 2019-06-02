import React, {Component} from 'react'
import apiKey from '../api/index.js'
class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      dailyData: null,
    }
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
      this.setState({
        fullData: data,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }
  filterDailyWeather(data) {
    console.log('filtering')
    let dailyData;
    if (data) {
      console.log(data);
    dailyData = data.list.filter(reading => {   
        return reading.dt_txt.includes("18:00:00")
        })
    }
  return dailyData  
}
  getDayOfWeek = (date) => {
    var dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }
  
  // alert( "Today is a " + getDayOfWeek(new Date()) + "!" );
  

  renderWeatherCards = () => {
    const {dailyData} = this.state;
    console.log('here');
    return(<div>
      {dailyData ? dailyData.map(data => {
      return(
      <div>
        <div>{this.getDayOfWeek(data.dt_txt.slice(0,11))}</div>
        <div>{data.main.temp_max}</div>
        <div>{data.main.temp_min}</div>
      </div>)
    }): <div>not fetched</div>}
    </div>);
  }


  render() {
    return(<>{this.renderWeatherCards()}</>)
  }
}

export default WeatherContainer;