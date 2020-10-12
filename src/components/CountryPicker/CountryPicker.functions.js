export const filterArray = (countryList, inputValue) =>
  countryList.sort().filter((country) =>
    // TODO Regexp
    country.toLowerCase().startsWith(inputValue.toLowerCase())
  );
