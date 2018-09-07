import React from 'react';
import './HourlyForecast.css'
import Card from './Card'

export default function HourlyForecast(props) {
  return(
      <div className='hourly-page-container'>
        <h1 className='hourly-title'>7-Hour Forecast</h1>
        <p className='hourly-city'>City</p>
        <section className='hourly-card-container'>
          {
        props.hourlyWeatherData.map((hour, index) => {
          return (
            <Card hourlyWeatherData={props.hourlyWeatherData} hour={hour} key={index} />
            )
        })
      }
        </section>
      </div>
  );
}