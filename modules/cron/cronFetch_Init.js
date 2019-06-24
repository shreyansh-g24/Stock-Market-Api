// MODULES: CRON_FETCH.JS //
// Fetching Data and updating DB using cron //

// Importing modules //
let fetch = require("node-fetch");
let cron = require("node-cron");
let HomeData = require("./../../models/HomeData");

// Declaring Global Variables and constants //
const FM_CONFIG = require("./../financialModellingApi/fm_config");
let _gTempStore = {};
let _gDataStore = {};

// Declaring functions //

// updating Home data document, or creating one if none exists
// data: receives data to be updated
function updateHomeData(data = null) {

  if (!data) return consoleError("updateHomeData called with insufficient arguments!");

  HomeData.find({}, (err, docs) => {
    if (err) return consoleError(JSON.stringify(err));
    // if no doc exists
    if (docs.length === 0) {
      HomeData.create({ data: JSON.stringify(data) }, (err, doc) => {
        if (err) return consoleError(JSON.stringify(err));
        return doc;
      });
      return 0;
    }
    // if docs exist
    let _id = docs[0]._id;
    HomeData.findByIdAndUpdate(_id, { data: JSON.stringify(data) }, { new: true, useFindAndModify: false }, (err, doc) => {
      if (err) return consoleError(JSON.stringify(err));
      return doc;
    });
  });
  return 0;
}

// Resetting _gDataStore value
// Returns 0 on success
function reset_gStore() {
  _gTempStore = {};
  _gTempStore = Object.assign({}, _gDataStore);
  _gDataStore = {};
  return 0;
}

// Printing error in console
function consoleError(err = null) {
  if (!err) return 1;
  console.log(__filename + ": err: ", err);
  return 0;
}

// fetching and updating global data store
// apiUrls: object with key value pairs being headers and urls to fetch the data from.
// updates _gDataStore variable with the fetched data
// returns 0 on success
function fetchData(apiUrls = null) {

  reset_gStore();

  if (apiUrls === null) {
    consoleError("fetchData called with insufficient arguments!");
    return 1;
  }

  for (let key in apiUrls) {

    fetch(apiUrls[key])
      .then(response => response.json())
      .then(data => {
        _gDataStore[key] = data;
        console.log("=======================================================================");
        console.log("LOG 1.1: cronfetch-fetchData-Data\n", JSON.stringify(data, null, 2));
        console.log("=======================================================================");
        console.log("LOG 1.2: cronfetch-fetchData-_gDataStore\n", JSON.stringify(_gDataStore[key], null, 2));
        console.log("=======================================================================");        
      })
      .catch(err => {

        _gDataStore[key] = { errMessage: "cronfetch_init: fetchData: Unable to fetch data!", err };

      });
  }

  return 0;
}

// cron job to fetch the data
// UPDATE fetchTime here to change fetching frequency
let task_fetchData = (function () {
  let fetchTime = "*/2 * * * *";

  let task = cron.schedule(fetchTime, () => {
    fetchData(FM_CONFIG.apiURLs);
  });

  return task;
})();

// Declaring and exporting init function //
// UPDATE taskTime here to change the frequency of checking if the market is open.
let cronInit = function () {
  // Declaring time variables
  let taskTime = "*/6 * * * * *";

  // Creating cron task
  let task = cron.schedule(taskTime, () => {

    // updating home data, irrespective of whether the market is open or not.
    updateHomeData(FM_CONFIG.normalizeHomeData(_gDataStore));

    // Initial fetch if _gDataStore is empty
    if (Object.entries(_gDataStore).length === 0 && _gDataStore.constructor === Object) {
      fetchData(FM_CONFIG.apiURLs);
    }

    // Checking if market is open
    FM_CONFIG.isOpenNYSE()
      .then(isOpen => {

        // If market is open, start fetching task
        if (isOpen) {
          task_fetchData.start();
        }
        // if market is closed, stop fetching task
        else if (!isOpen) {
          task_fetchData.stop();
        }

      })
      .catch(err => {
        consoleError("isOpenNYSE emitted unexpected error: ", JSON.stringify(err));
      });
  });

  task.start();

  return 0;
};

module.exports = cronInit;
