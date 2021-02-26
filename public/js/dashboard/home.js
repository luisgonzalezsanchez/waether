/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dashboard/home.js":
/*!****************************************!*\
  !*** ./resources/js/dashboard/home.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

new Vue({
  el: '#main',
  created: function created() {
    //this.getWelcome();
    this.currentUser();
    this.element = this.elementInitialState();
  },
  data: {
    user: {},
    find: {
      search: ''
    },
    element: {},
    viewmap: false,
    lat: '',
    lng: ''
  },
  updated: function updated() {
    this.closeLoading();
  },
  mounted: function mounted() {
    this.searchLocation();
  },
  methods: {
    getList: function getList(page) {},
    elementInitialState: function elementInitialState() {
      return {
        information: {
          humidity: '',
          temperature: '',
          wind: ''
        },
        humidity: '',
        temperature: '',
        temperature_max: '',
        temperature_min: '',
        text: '',
        wind: '',
        wind_direction: '',
        country: '',
        city: '',
        lat: '',
        lng: ''
      };
    },
    getWelcome: function getWelcome() {
      var _this = this;

      axios.get('dashboard/home').then(function (response) {
        if (response.data.status == 'OK') {
          _this.message = response.data.message;
        } else {}
      })["catch"](function (error) {
        _this._errorProccessor(error);
      });
    },
    searchLocation: function searchLocation() {
      var _this2 = this;

      var map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: -33.8688,
          lng: 151.2195
        },
        zoom: 11,
        mapTypeId: "roadmap"
      }); // Create the search box and link it to the UI element.

      var input = document.getElementById("pac-input");
      var searchBox = new google.maps.places.SearchBox(input); //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // Bias the SearchBox results towards current map's viewport.

      map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
      });
      var markers = []; // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.

      searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        } else {
          _this2.viewmap = true;
        } // Clear out the old markers.


        markers.forEach(function (marker) {
          marker.setMap(null);
        });
        markers = []; // For each place, get the icon, name and location.

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          }; //obtengo coordenadas

          _this2.lat = place.geometry.location.lat();
          _this2.lng = place.geometry.location.lng(); //

          _this2.getTiempo(); // Create a marker for each place.


          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    },
    getTiempo: function getTiempo() {
      var _this3 = this;

      idapi = 'X5E44XzzX44epMj';
      var url = 'https://api.tutiempo.net/json/?lan=es&apid=' + idapi + '&ll=' + this.lat + ',' + this.lng;
      console.log('url', url); //interactuar con la data y servicio por medio de axios

      axios.get(url).then(function (response) {
        if (response.data.error) {
          _this3.alertError(response.data.error);
        } else {
          console.log(response.data);
          _this3.element.temperature_max = response.data.day1.temperature_max;
          _this3.element.temperature_min = response.data.day1.temperature_min;
          _this3.element.humidity = response.data.hour_hour.hour1.humidity;
          _this3.element.temperature = response.data.hour_hour.hour1.temperature;
          _this3.element.text = response.data.hour_hour.hour1.text;
          _this3.element.wind = response.data.hour_hour.hour1.wind;
          _this3.element.wind_direction = response.data.hour_hour.hour1.wind_direction;
          _this3.element.information.humidity = response.data.information.humidity;
          _this3.element.information.temperature = response.data.information.temperature;
          _this3.element.information.wind = response.data.information.wind;
          _this3.element.country = response.data.locality.country;
          _this3.element.city = response.data.locality.name;
          _this3.element.lat = _this3.lat;
          _this3.element.lng = _this3.lng; //se salva el registro

          _this3._storeElement(_this3.setUrl('/dashboard/weather/store'), _this3._jsonToForm(_this3.element), '');
        }
      })["catch"](function (error) {
        _this3._errorProccessor(error);
      });
    }
  }
});

/***/ }),

/***/ 2:
/*!**********************************************!*\
  !*** multi ./resources/js/dashboard/home.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/vagrant/desarrollo/casatoro/tiempo/resources/js/dashboard/home.js */"./resources/js/dashboard/home.js");


/***/ })

/******/ });