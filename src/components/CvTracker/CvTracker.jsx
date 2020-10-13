import React, { useEffect, useState } from 'react';

import './CvTracker.scss';

import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as WorldLogo } from './world.svg';

import CountryCard from '../CountryCard/CountryCard';
import CountryPicker from '../CountryPicker/CountryPicker';
import {
  getCountryData,
  getCountryList,
  getStatisticsJSON,
} from './CvTracker.functions';

function CvTracker() {
  const [statistics, setStatistics] = useState([]);
  const [trackedCountries, setTrackedCountries] = useState(
    JSON.parse(localStorage.getItem('trackedCountries')) || []
  );

  useEffect(() => {
    getStatisticsJSON().then(setStatistics);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'trackedCountries',
      JSON.stringify(trackedCountries.filter((country) => country != null))
    );
  }, [trackedCountries]);

  const addTrackedCountry = (countryName, index) => {
    const trackedCountryCopy = [...trackedCountries];
    trackedCountryCopy[index] = countryName;
    setTrackedCountries(trackedCountryCopy);
  };

  const removeTrackedCountry = (index) => {
    const trackedCountryCopy = [...trackedCountries];
    trackedCountryCopy.splice(index, 1);
    setTrackedCountries(trackedCountryCopy);
  };

  return (
    <div className="CvTracker">
      <header className="CvTracker__header">
        <Logo />
        <span className="CvTracker__header-text">COVID-19 Tracker</span>
      </header>
      {trackedCountries.map((item, index) => {
        const countryData = getCountryData(item, statistics);
        // Country is not picked
        if (item === null)
          return (
            <CountryPicker
              key={item + index}
              countryList={getCountryList(statistics)}
              addTrackedCountry={addTrackedCountry}
              index={index}
            />
          );
        // When fetch is over
        else if (countryData) {
          return (
            <CountryCard
              key={item + index}
              countryData={getCountryData(item, statistics)}
              index={index}
              removeTrackedCountry={removeTrackedCountry}
            />
          );
        }
      })}
      <button
        className="CvTracker__btn"
        onClick={() => setTrackedCountries([...trackedCountries, null])}
      >
        +
      </button>
      {/*<span className="CvTracker__lastUpdate">*/}
      {/*  {statistics[0] ? statistics[0].time : ''}*/}
      {/*</span>*/}
    </div>
  );
}

export default CvTracker;
