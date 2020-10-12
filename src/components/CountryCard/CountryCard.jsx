import React, { useState } from 'react';

import './CountryCard.scss';

const CountryCard = (props) => {
  const { cases, country, deaths, time } = props.countryData;

  return (
    <section className="CountryCard">
      <div className="CountryCard__col">
        {props.icon}

        <span className="CountryCard__title">
          {country.split('-').join(' ')}
        </span>
      </div>
      <div className="CountryCard__col">
        <h2 className="CountryCard__total red">{cases.active}</h2>
        <h3 className="CountryCard__new">{cases.new}</h3>
        <span className="CountryCard__title">Active</span>
      </div>
      <div className="CountryCard__col">
        <h2 className="CountryCard__total green">{cases.recovered}</h2>
        <span className="CountryCard__title">Recovered</span>
      </div>
      <div className="CountryCard__col">
        <h2 className="CountryCard__total">{deaths.total}</h2>
        <h3 className="CountryCard__new">{deaths.new}</h3>
        <span className="CountryCard__title">Deaths</span>
      </div>
      <button
        className="CountryCard__remove-btn"
        onClick={() => props.removeTrackedCountry(props.index)}
      >
        x
      </button>
    </section>
  );
};

export default CountryCard;
