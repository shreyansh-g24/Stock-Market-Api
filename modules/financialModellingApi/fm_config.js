// FINANCIAL MODELLING API (VERSION 3) : CONFIG //
// Importing Modules
let fetch = require("node-fetch");

module.exports = {

  // Declaring global variables and constants //
  constants: {
    // NY Time zone offset
    TimezoneOffset_NY: -4,
    // NYSE timings
    NYSE_open_hours: 9,
    NYSE_open_minutes: 30,
    NYSE_close_hours: 16,
    NYSE_close_minutes: 0,
  },

  // URL's for financial modelling api calls
  apiURLs: {

    // is the market open, holidays, exchange's name, working hours
    "NYSE Hours": "https://financialmodelingprep.com/api/v3/is-the-market-open",

    // Daily most active, loser and daily stocks
    "Most Active Stocks (Daily)": "https://financialmodelingprep.com/api/v3/stock/actives",
    "Most Gainer Stocks (Daily)": "https://financialmodelingprep.com/api/v3/stock/gainers",
    "Most Loser Stocks (Daily)": "https://financialmodelingprep.com/api/v3/stock/losers",

    // Sectors' performances
    "Sectors": "https://financialmodelingprep.com/api/v3/stock/sectors-performance",

    // Major Indexes Realtime Performance
    "Major Indexes": "https://financialmodelingprep.com/api/v3/majors-indexes",

    // Forex Realtime OHLC
    "Forex": "https://financialmodelingprep.com/api/v3/forex",
  },

  // printing error in console
  consoleError: function (err) {
    console.log(__filename + ": err: " + err);
    return 0;
  },

  // Checking if the stock market is open
  isOpenNYSE: async function () {

    // Getting new york time
    let nytime = this.calcTime(this.constants.TimezoneOffset_NY);
    let nytime_hours = nytime.getHours();
    let nytime_minutes = nytime.getMinutes();

    // if timenow is between nyse open hours
    if (nytime_hours >= this.constants.NYSE_open_hours &&
      nytime_hours <= this.constants.NYSE_close_hours) {

      // fetching and returning status
      let response = await fetch(this.apiURLs["NYSE Hours"]);
      let data = response.json();

      return data.then(isOpen => isOpen.isTheStockMarketOpen);
    }
    // if timenow doesn't lie between nyse open hours
    else {
      return false;
    };
  },

  // Calculating time given the timezone offset of target place
  // Receives time zone offset e.g. ("-4" for new york | Eastern Daylight Time)
  // Returns current new york time
  calcTime: function (offset) {
    let timeNow = new Date();
    let utcTime = timeNow.getTime() + (timeNow.getTimezoneOffset() * 60000);
    let targetCityTime = new Date(utcTime + (3600000 * offset));
    return targetCityTime;
  },

  // Normalizing home page data: actives, losers, gainers, indexes, sectors, forex
  // data: Receives data to be nomalised, an object with all the information above.
  normalizeHomeData: function (dataObj = 0) {

    // Declaring variables
    let normalizedData = [];
    let tabData = {};

    // Handling errors
    if (dataObj === 0) {
      this.consoleError("normalizeHomeData called with insufficient arguments!");
      return 1;
    }
    else if ((Object.entries(dataObj).length === 0 && dataObj.constructor === Object) || dataObj.constructor === Array) {
      tabData = { err: "normalizeHomeData called with inaccurate arguments!" };
      normalizedData.push(tabData);
      return normalizedData;
    }

    // normalising data
    for (let key in dataObj) {

      // resetting tabData
      tabData = {};

      // if there's error or the data is for NYSE hours
      if (dataObj[key].err || key === "NYSE Hours") {
        tabData = dataObj[key];
      }
      // if there's no error
      else if (!dataObj[key].err) {

        // saving heading
        tabData.head = key;

        // accessing nested object
        for (let key1 in dataObj[key]) {

          // saving keyword
          tabData.keyword = key1;

          let _originalHeaders = [];
          // checking if the data is an array
          if(dataObj[key][key1].constructor === Array){
            tabData.data = dataObj[key][key1].map(val => {
              // looping through keys in val if not done already to save original headers
              if (_originalHeaders.length === 0) {
                for (let header in val) {
                  _originalHeaders.push(header);
                }
                // adding original headers list to tabData
                tabData._originalHeaders = _originalHeaders;
              }

              // Declaring variables to store val's values
              let name;
              let change;
              let changePercentage;
              let price;

              // Handling name
              if (val.ticker && val.companyName) name = val.companyName + " (" + val.ticker + ")";
              else if (val.ticker && val.indexName) name = val.indexName + " (" + val.ticker + ")";
              else if (val.ticker) name = val.ticker;
              else if (val.sector) name = val.sector;
              else name = "undefined";
              // Handling changes and changesPercentage
              val.changes ? change = val.changes : "undefined";
              val.changesPercentage ? changePercentage = val.changesPercentage : "undefined";
              // Handling Price
              if (val.price) price = val.price;
              else if (val.bid && val.ask && val.open && val.high && val.low) {
                let { bid, ask, open, high, low } = val;
                price = { bid, ask, open, high, low };
              }
              else price = "undefined";

              // replacing "%5" in names with "."
              if (typeof (name) === "string" && name.includes("%5")) name = name.replace("%5", ".");

              // returning original data if no match found
              if (name === "undefined" && change === "undefined" && changePercentage === "undefined" && price === "undefined") {
                return val;
              }
              return { name, change, changePercentage, price };
            });
          }
          else if(dataObj[key][key1].constructor !== Array){
            tabData.data = dataObj[key][key1];
          }
        }
      }
      // pushing to normalize data array
      normalizedData.push(tabData);
    }
    return normalizedData;
  },

};
