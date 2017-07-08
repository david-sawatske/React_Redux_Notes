// React Sparklines library for graph build
// from documentation:
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
...
<Sparklines data={[5, 10, 5, 20]}> // it expects an array of numbers
  <SparklinesLine color="blue" />
</Sparklines>

// data we have from weather API
weather: [
  city: {name: 'city'}
  list: [
    {main: {temp: 260, humidity: 40, pressure: 55}} // we want and array for all
    // ...                                          // daily temps, one for all
  ]                                                 // humids... for the city
]

// install sparklines library
$ npm install --save react-sparklines

// assembling data and logging to check and importing sparklines
// ./containers/weather_list

import { Sparklines, SparklinesLine } from 'react-sparklines'
// Sparklines = parent el   SparklinesLine = child el for additional config

class WeatherList extends Component {
  renderWeather(cityData) {
    const cityName = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp) // temps in K

    return (
      <tr key={cityName}>
        <td>{cityName}</td>
        <td>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red" />
          </Sparklines>
        </td>
      </tr>
    )
  }


// refactoring to reuseable component
// - will be getting data from 'renderWeather(cityData)'
// - does not need to talk to Redux, it's a component

// class based component or function based
// - no state is needed, it is a function based

// new file ./components/chart.js
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines'

export default (props) => { // passing data in a property called 'data'
  return(
    <div>
      <Sparklines height={120} width={180} data={props.data}> // prop 'data'
        <SparklinesLine color={props.color} /> // possible to config color
      </Sparklines>
    </div>
  );
};

// import to back into WeatherList for display
// ./containers/weather_list
// ...
import Chart from '../components/chart';  // import here

class WeatherList extends Component {
  // ...
    return (
      <tr key={cityName}>
        <td>{cityName}</td>
        <td> // Chart expects 2 properties, color and data
          <Chart data={temps} color="orange" />
        </td>
      </tr>
    )
  }

// pulling data for pressure and humidity
// ./containers/weather_list
class WeatherList extends Component {
  // ...
  // getting data
  const pressures = cityData.list.map(weather => weather.main.pressure);
  const humidities = cityData.list.map(weather => weather.main.humidity);
  // ...
  return (
    <tr key={cityName}>
      <td>{cityName}</td>
      <td><Chart data={temps} color="orange" /></td>
      <td><Chart data={pressures} color="green" /></td> // adding charts for
      <td><Chart data={humidities} color="blue" /></td> // the data
    </tr>


// adding reference line and number for 5 day averages
// new file ./components/chart.js
import React from 'react';     // pulling additional '...ReferenceLine' property
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines'
import _ from 'lodash'; // for calc average

export default (props) => { // passing data in a property called 'data'
  return(
    <div>
      <Sparklines height={120} width={180} data={props.data}>
        <SparklinesLine color={props.color} />
        <SparklinesReferenceLine type="avg" /> // from documentation
      </Sparklines>
      <div>{average(props.data)}</div>
    </div>
  );
};

// write 'average()' helper function used above with lodash methods
function average(data) {
  return _.round(_.sum(data)/data.length);
}

// adding units
// ./containers/weather_list
// ...
return (
  <tr key={cityName}>
    <td>{cityName}</td> // adding the property 'units' to the chart
    <td><Chart data={temps} color="orange" units="K" /></td>
    <td><Chart data={pressures} color="green" units="pHa" /></td>
    <td><Chart data={humidities} color="blue" units="%" /></td>
  </tr>
);
// ...
// using the properties passed to chart inside the chart component
// ./components/chart
export default (props) => {
  return(
    <div>
      <Sparklines height={120} width={180} data={props.data}>
        <SparklinesLine color={props.color} />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>{average(props.data)} {props.units}</div> // here
    </div>
  );
};
