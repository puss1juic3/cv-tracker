import React, { useState } from 'react';

import './CountryPicker.scss';
import { filterArray } from './CountryPicker.functions';

const CountryPicker = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [isCountryListOpened, setIsCountryListOpened] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setIsCountryListOpened(true);
  };

  const handleCountryClick = (event) => {
    props.addTrackedCountry(
      event.target.textContent.split(' ').join('-'),
      props.index
    );
    setIsCountryListOpened(false);
    setInputValue(event.target.textContent);
  };

  return (
    <section className="CountryPicker">
      <span className="CountryPicker__input-label">Select country</span>
      <input
        className="CountryPicker__input"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsCountryListOpened(true)}
        // Wait for country selection on click to CountryList, then blur
        onBlur={() => setTimeout(() => setIsCountryListOpened(false), 150)}
      />

      <div
        className={
          isCountryListOpened
            ? 'CountryPicker__list'
            : 'CountryPicker__list hidden'
        }
        onClick={handleCountryClick}
      >
        {filterArray(props.countryList, inputValue).map((country) => (
          <div key={country} className="CountryPicker__list-item">
            {country.split('-').join(' ')}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountryPicker;
