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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/global/general.js":
/*!****************************************!*\
  !*** ./resources/js/global/general.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Vue.mixin({
  updated: function updated() {
    this.closeLoading();
  },
  data: function data() {
    return {
      element_ally: {},
      status_config: false //Set los objetos necesarios para el modulo

      /*  token: '',
        user: '',
        urlp: '',
        list: [],
        allies: {},
        count_contacts: '',
        searchQuery: '',
        find: { search: '', type_search: 0, brand_id: 0, line_id: 0, company_id: 0, company_brand_id: 0, department_id: 0, city_id: 0, date_start: '', date_end: '', active: false },
        temp: {},
        password: { password: '', password_confirmation: '' },
        element: {},
        parameters: {
            brands: [],
            lines: [],
            cities: [],
            user: [],
        },
        pagination: {
            'total': 0,
            'current_page': 0,
            'per_page': 0,
            'last_page': 0,
            'from': 0,
            'to': 0
        },
        offset: 5,*/

    };
  },
  mounted: function mounted() {},
  computed: {},
  methods: {
    elementInitialConfigAlly: function elementInitialConfigAlly() {
      return {
        allowed_vehicles: '',
        //nit: '',
        status: 'Inactivo'
      };
    },
    changeStatusConfig: function changeStatusConfig() {
      if (this.status == true) {
        this.element.status = 'Activo';
      } else {
        this.element.status = 'Inactivo';
      }
    },
    createConfigureAlly: function createConfigureAlly() {
      this._storeElement(this.setUrl('/admin/ally/store'), this._jsonToForm(this.element), '#crear-element');
    },
    configuracionAlly: function configuracionAlly(reg) {
      console.log(reg);
      this.element = this.elementInitialConfigAlly();
      this.element = reg;

      if (reg.status == 'Activo') {
        this.status_config = true;
      } else {
        this.status_config = false;
      }

      this.changeStatusConfig();
      this.openModal('#configure-ally');
    }
  }
});

/***/ }),

/***/ 5:
/*!**********************************************!*\
  !*** multi ./resources/js/global/general.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laragon\www\connect-api\resources\js\global\general.js */"./resources/js/global/general.js");


/***/ })

/******/ });