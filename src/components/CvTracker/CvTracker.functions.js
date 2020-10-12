export const getStatisticsJSON = async () => {
  try {
    const result = await fetch('https://covid-193.p.rapidapi.com/statistics', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': 'f77bd974e3msh8c9bee8afa289d4p15fffbjsn482adf77f486',
      },
    });
    const json = await result.json();
    return json.response;
  } catch (e) {
    console.log(e);
  }
};

export const getCountryList = (statistics) =>
  statistics.map((item) => item.country);

export const getCountryData = (countryName, statistics) => {
  for (const statItem of statistics) {
    if (statItem.country === countryName) return statItem;
  }
};
