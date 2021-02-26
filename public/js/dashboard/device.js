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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dashboard/device.js":
/*!******************************************!*\
  !*** ./resources/js/dashboard/device.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

new Vue({
  el: '#main',
  created: function created() {
    this.currentUser();
    this.getListMethod(); //generic.js
    //this.getParameters();
    // this.getParametersHomologations();
    //this.getContacts();

    this.element = this.elementInitialState();
  },
  updated: function updated() {
    this.closeLoading();
  },
  mounted: function mounted() {},
  data: {
    status: false,
    list: [],
    element: {},
    parameters: {},
    allies: {}
  },
  methods: {
    elementInitialState: function elementInitialState() {
      return {
        firmware: '',
        imei: '',
        vin: '',
        apn: '',
        apn_user: '',
        apn_password: '',
        device_type: '',
        iccid: '',
        status: 'Inactivo',
        company_id: ''
      };
    },
    getList: function getList(page) {
      this._getList(this.setUrl('/dashboard/device'), page);
    },
    getListSearch: function getListSearch(page) {
      this._getListSearch(this.setUrl('/dashboard/device/search'), page);
    },
    getParameters: function getParameters(page) {//this._getParameters(this.setUrl('/api/v1/dashboard/banners/parameters'));
    },
    //Enviar al servicio los datos para crear
    createElement: function createElement() {
      this._storeElement(this.setUrl('/dashboard/device/store'), this._jsonToForm(this.element), '#crear-element');
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
      this.openModal('#ver-detalle');
    },
    editElement: function editElement(reg) {
      this.getAllies();
      this.element = this.elementInitialState();
      this.element = reg;

      if (reg.status == 'Activo') {
        this.status = true;
      } else {
        this.status = false;
      }

      this.changeStatus();
      this.openModal('#editar-element');
    },
    saveElement: function saveElement() {
      var _this = this;

      this.openLoading();
      var service = this.setUrl('/dashboard/device/update/' + this.element.id); //la función _updateElement permite la acutalización de datos
      //            this._updateElement(service, this._jsonToForm(this.element), '#editar-categoria-terms');

      var currentModal = '#editar-element';
      var url = service; //interactuar con la data y servicio por medio de axios

      axios.post(url, this.element).then(function (response) {
        //al obtener el estatus del servicio confirma exito o errores
        if (response.data.status == 'OK') {
          _this.element = _this.elementInitialState();

          _this.closeLoading();

          _this.closeModal('#editar-element');

          _this.alertSuccess(response.data.message);

          _this.getListMethod();
        } else {
          _this.alertError(response.data.errors);

          _this.closeLoading();

          _this.getListMethod(); //configElement(reg, index)

        }
      })["catch"](function (error) {
        _this._errorProccessor(error);
      });
    },
    confirmarChangeStatus: function confirmarChangeStatus() {
      this.openModal('#confirm_status');
    },
    openCreateModal: function openCreateModal(id) {
      this.element = this.elementInitialState();
      this.getAllies();
      this.openModal(id);
    },
    //Abrir modal confirmación de eliminación de recordatorio
    deleteElement: function deleteElement(reg) {
      this.openModal('#delete-elemnt'); //obtener el id del recordatorio a eliminar

      this.elementDelete = reg.id;
    },
    confirmDeleteElement: function confirmDeleteElement(elementDelete) {
      //obtener url de servicio
      var service = this.setUrl('/dashboard/device/destroy/') + elementDelete; //borrar el recordatorio

      this._destroyElement_alt(service, '#delete-elemnt'); //actualizar list


      this.getListMethod();
    },
    getAllies: function getAllies() {
      var _this2 = this;

      var url = this.setUrl('/admin/onlyCompanies');
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this2.allies = response.data;
        } else {//this._errorAccess();
        }
      })["catch"](function (error) {
        _this2._errorProccessor(error);
      });
    }
  }
});

/***/ }),

/***/ 3:
/*!************************************************!*\
  !*** multi ./resources/js/dashboard/device.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/vagrant/desarrollo/casatoro/tiempo/resources/js/dashboard/device.js */"./resources/js/dashboard/device.js");


/***/ })

/******/ });