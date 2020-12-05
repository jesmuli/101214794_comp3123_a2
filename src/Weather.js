import React, { Component } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Weather extends Component {

    //Define state default values
    constructor() {
        super();
        this.state = {
            forecast: [],
            coord: {},
            weather: [],
            main: {},
            wind: {},
            clouds: {},
            sys: {},    
        };
    }
    
    //Component Lifecycle Callback
    componentDidMount() {
        // retrieve weather info
        axios.get(`https:api.openweathermap.org/data/2.5/weather?q=Toronto&appid=0075d6a7c0a4afa060d8299f822f958f`)
        .then(res => {
            console.log(res.data);
            // retrieve data objects
            const forecast = res.data;
            const coord = forecast.coord;
            const weather = forecast.weather[0];
            const main = forecast.main;
            const wind = forecast.wind;
            const clouds = forecast.clouds;
            const sys = forecast.sys;

            // set states
            this.setState({ forecast, coord, weather, main, wind,
                clouds, sys });
        })
            .catch(err => {
                console.error("Error : ", err)
        })
    }


    render() {
        
        // convert unix timestamp
        const getDT=(dt)=>{
            return new Date(dt * 1000) + ""
        }

        // obj to unix timestamps
        var dt_forecasted = parseInt(this.state.forecast.dt+"");
        var dt_sunrise = parseInt(this.state.sys.sunrise+"");
        var dt_sunset = parseInt(this.state.sys.sunset+"");

        // get icon image
        var icon = 'http://openweathermap.org/img/wn/' + this.state.weather.icon + '@4x.png';

        // convert Kelvin temperature to celcius
        var temp = parseInt(this.state.main.temp - 273.15) + "°C"
        var temp_feel = parseInt(this.state.main.feels_like - 273.15) + "°C"
        var temp_min = parseInt(this.state.main.temp_min - 273.15) + "°C"
        var temp_max = parseInt(this.state.main.temp_max - 273.15) + "°C"

        
        return (
            <Container className="container-fluid text-center App-header p-3">
                <div className="weather-cont p-3">
                    <h1 className="display-4 text-secondary">Weather Forecast</h1>
                    <h2>{this.state.forecast.name}, {this.state.sys.country}</h2>
                    <p className='small'>latitude: {this.state.coord.lat} &nbsp;
                        longitude: {this.state.coord.lon}</p>
                    <p>{getDT(dt_forecasted)}</p>
                    <div className="row justify-content-center">
                        <div className="">
                            <img className="App-logo" src = {icon} />
                        </div>
                        <div className="mt-4">
                            <h2 className="display-4 text-primary">{temp}</h2>
                            <h2 className="text-primary">{this.state.weather.main}</h2>   
                        </div>
                    </div>
                    <div className="border border-secondary rounded p-2 m-2 justify-content-center">
                        <div className="row justify-content-center">
                            <p className="col offset-md-1 text-left"><b className='small'>DESC:</b> {this.state.weather.description}</p>
                            <p className="col text-left"><b className='small'>CLOUDINESS:</b> {this.state.clouds.all}%</p>  
                            <p className='col text-left'><b className='small'>FEELS LIKE:</b> {temp_feel}</p>                   
                        </div>
                       
                        <div className="row justify-content-center">
                            <p className="col offset-md-2 text-left"><b className='small'>MIN:</b> {temp_min}</p>
                            <p className='col text-left'><b className='small'>MAX:</b> {temp_max}</p>
                        </div>
                        <div className="row justify-content-center">
                            <p className="col offset-md-2 text-left"><b className='small'>PRESSURE:</b> {this.state.main.pressure} hPa</p>
                            <p className='col text-left'><b className='small'>HUMIDITY:</b> {this.state.main.humidity}%</p>
                        </div>
                        <div className="row justify-content-center">
                            <p className="col offset-md-2 text-left"><b className='small'>WIND SPEED:</b> {this.state.wind.speed}mps</p>
                            <p className='col text-left'><b className='small'>WIND DEGREE:</b> {this.state.wind.deg}°</p>
                        </div>
                        <p><b className='small'>SUNRISE:</b> {getDT(dt_sunrise)}</p>
                        <p><b className='small'>SUNSET:</b> {getDT(dt_sunset)}</p>
                    </div>
                </div>
            </Container>
        )
    }
}