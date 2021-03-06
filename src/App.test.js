import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { cityData } from './api';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render the Welcome component', () => {
    expect(wrapper.find('Welcome').length).toEqual(1);
  });

  it('should render the HourlyForecast component', () => {

    wrapper.setState({ 
      displayingWelcome: false,
      displayingHourlyForecast: true 
    });

    expect(wrapper.find('HourlyForecast').length).toEqual(1);
  });

  it('should render the DailyForecast component', () => {
    wrapper.setState({ 
      displayingWelcome: false,
      displayingDailyForecast: true 
    });

    expect(wrapper.find('DailyForecast').length).toEqual(1);
  });

  it('should render the Header component', () => {
    wrapper.setState({ 
      isLoaded: true 
    });

    expect(wrapper.find('Header').length).toEqual(1);
  });

  it('should render the CurrentForecast component', () => {
    wrapper.setState({ 
      isLoaded: true 
    });

    expect(wrapper.find('CurrentForecast').length).toEqual(1);
  });

  it('should render the Navigation component', () => {
    wrapper.setState({ 
      isLoaded: true 
    });

    expect(wrapper.find('Navigation').length).toEqual(1);
  });

  it('should instantiate with default state properties', () => {
    expect(wrapper.state()).toEqual({
      displayingWelcome: true,
      displayingHourlyForecast: false,
      displayingDailyForecast: false,
      cityData: null,  
      hourlyData: [],
      dailyData: [],
      isLoaded: false,
    });
  });

  it('should update hourlyData in state', () => {
    wrapper.setState({ 
      cityData: cityData 
    });
    wrapper.instance().updateHourlyData();

    expect(wrapper.state('hourlyData')).toEqual(
      [ { hour: '12:00 PM', hourCondition: 'Partly Cloudy', temp: 47 },
        { hour: '1:00 PM', hourCondition: 'Partly Cloudy', temp: 49 },
        { hour: '2:00 PM', hourCondition: 'Partly Cloudy', temp: 49 },
        { hour: '3:00 PM', hourCondition: 'Clear', temp: 51 },
        { hour: '4:00 PM', hourCondition: 'Clear', temp: 50 },
        { hour: '5:00 PM', hourCondition: 'Clear', temp: 48 },
        { hour: '6:00 PM', hourCondition: 'Clear', temp: 45 } ]
    );
  });

  it('should update dailyData in state', () => {
    wrapper.setState({ 
      cityData: cityData 
    });
    wrapper.instance().updateDailyData();

    expect(wrapper.state('dailyData')).toEqual(
      [ { day: 'Wednesday',
        dailyCondition: 'Partly Cloudy',
        high: '51',
        low: '32' },
      { day: 'Thursday',
        dailyCondition: 'Clear',
        high: '55',
        low: '51' },
      { day: 'Friday',
        dailyCondition: 'Chance of Rain',
        high: '57',
        low: '44' },
      { day: 'Saturday', 
        dailyCondition: 'Rain', 
        high: '47', 
        low: '30' },
      { day: 'Sunday',
        dailyCondition: 'Overcast',
        high: '37',
        low: '22' },
      { day: 'Monday', 
        dailyCondition: 'Clear', 
        high: '35', 
        low: '19' },
      { day: 'Tuesday',
        dailyCondition: 'Partly Cloudy',
        high: '32',
        low: '20' },
      { day: 'Wednesday',
        dailyCondition: 'Partly Cloudy',
        high: '33',
        low: '26' },
      { day: 'Thursday',
        dailyCondition: 'Snow Showers',
        high: '35',
        low: '23' },
      { day: 'Friday',
        dailyCondition: 'Partly Cloudy',
        high: '31',
        low: '18' } ]
    );
  });

  it('should set local storage with data from state', () => {
    wrapper.setState({
      cityData: {city: 'data'},
      hourlyData: [1, 2, 3],
      dailyData: [1, 2, 3]
    });

    wrapper.instance().setLocalStorage();
    const storageLength = JSON.parse(localStorage.getItem('cityData')).length;

    expect(storageLength).toEqual(3);
  });

  it('should get values from local storage and set state', () => {
    wrapper.setState({
      cityData: {city: 'data'},
      hourlyData: [1, 2, 3],
      dailyData: [1, 2, 3]
    });

    wrapper.instance().setLocalStorage();
    wrapper.setState({
      cityData: {city: 'newData'},
      hourlyData: [4, 5, 6],
      dailyData: [4, 5, 6]
    });
    wrapper.instance().getFromLocalStorage();
    expect(wrapper.state('cityData')).toEqual({
      city: 'data'
    });
    expect(wrapper.state('hourlyData')).toEqual(
      [1, 2, 3]
    );
    expect(wrapper.state('dailyData')).toEqual(
      [1, 2, 3]
    );
  });

  it('should change state to hourly settings', () => {
    wrapper.setState({
      displayingWelcome: true,
      displayingHourlyForecast: false,
      displayingDailyForecast: true
    });
    wrapper.instance().changeToHourly();

    expect(wrapper.state('displayingWelcome')).toEqual(false);
    expect(wrapper.state('displayingHourlyForecast')).toEqual(true);
    expect(wrapper.state('displayingDailyForecast')).toEqual(false);
  });

  it('should change state to daily settings', () => {
    wrapper.setState({
      displayingWelcome: true,
      displayingHourlyForecast: true,
      displayingDailyForecast: false
    });
    wrapper.instance().changeToDaily();

    expect(wrapper.state('displayingWelcome')).toEqual(false);
    expect(wrapper.state('displayingHourlyForecast')).toEqual(false);
    expect(wrapper.state('displayingDailyForecast')).toEqual(true);
  });
});