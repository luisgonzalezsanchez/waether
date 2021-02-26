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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dashboard/weather.js":
/*!*******************************************!*\
  !*** ./resources/js/dashboard/weather.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

new Vue({
  el: '#main',
  created: function created() {
    this.currentUser();
    this.getListMethod(); //generic.js

    this.element = this.elementInitialState();
  },
  updated: function updated() {
    this.closeLoading();
  },
  mounted: function mounted() {},
  data: {
    status: false,
    list: [],
    element: {}
  },
  methods: {
    elementInitialState: function elementInitialState() {
      var _ref;

      return _ref = {
        humidity: '',
        temperature: '',
        wind: ''
      }, _defineProperty(_ref, "humidity", ''), _defineProperty(_ref, "temperature", ''), _defineProperty(_ref, "temperature_max", ''), _defineProperty(_ref, "temperature_min", ''), _defineProperty(_ref, "text", ''), _defineProperty(_ref, "wind", ''), _defineProperty(_ref, "wind_direction", ''), _defineProperty(_ref, "country", ''), _defineProperty(_ref, "city", ''), _defineProperty(_ref, "lat", ''), _defineProperty(_ref, "lng", ''), _ref;
    },
    getList: function getList(page) {
      this._getList(this.setUrl('/dashboard/weather'), page);
    },
    getListSearch: function getListSearch(page) {
      this._getListSearch(this.setUrl('/dashboard/weather/search'), page);
    },
    //Enviar al servicio los datos para crear
    createElement: function createElement() {
      this._storeElement(this.setUrl('/dashboard/weather/store'), this._jsonToForm(this.element), '#crear-element');
    },
    changeStatus: function changeStatus() {
      if (this.status == true) {
        this.element.status = 'Activo';
      } else {
        this.element.status = 'Inactivo';
      }
    },
    viewElement: function viewElement(reg) {
      this.element = this.elementInitialState();
      this.element = reg;
      this.initMap();
      this.openModal('#ver-detalle');
    },
    //Abrir modal confirmación de eliminación de recordatorio
    deleteElement: function deleteElement(reg) {
      this.openModal('#delete-elemnt'); //obtener el id del recordatorio a eliminar

      this.elementDelete = reg.id;
    },
    confirmDeleteElement: function confirmDeleteElement(elementDelete) {
      //obtener url de servicio
      var service = this.setUrl('/dashboard/weather/destroy/') + elementDelete; //borrar el recordatorio

      this._destroyElement_alt(service, '#delete-elemnt'); //actualizar list


      this.getListMethod();
    },
    initMap: function initMap() {
      var myCenter = new google.maps.LatLng(this.element.lat, this.element.lng); //propiedades del mapa

      var mapProp = {
        center: myCenter,
        zoom: 11,
        mapTypeId: "roadmap"
      }; //crea el mapa

      var map = new google.maps.Map(document.getElementById("map_detalle"), mapProp);
      var marker = new google.maps.Marker({
        position: myCenter
      });
      marker.setMap(map);
    }
  }
});

/***/ }),

/***/ 4:
/*!*************************************************!*\
  !*** multi ./resources/js/dashboard/weather.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/vagrant/desarrollo/casatoro/tiempo/resources/js/dashboard/weather.js */"./resources/js/dashboard/weather.js");


/***/ })

/******/ });