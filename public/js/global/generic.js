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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/global/generic.js":
/*!****************************************!*\
  !*** ./resources/js/global/generic.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Vue.mixin({
  updated: function updated() {
    this.closeLoading();
  },
  data: function data() {
    return {
      //Set los objetos necesarios para el modulo
      app_web_service_maps: window.app_web_service_maps,
      app_web_service_maps_api_key: window.app_web_service_maps_api_key,
      token: '',
      user: '',
      urlp: '',
      list: [],
      count_contacts: '',
      searchQuery: '',
      find: {
        search: '',
        type_search: 0,
        brand_id: 0,
        line_id: 0,
        company_id: 0,
        company_brand_id: 0,
        department_id: 0,
        city_id: 0,
        date_start: '',
        date_end: '',
        active: false
      },
      temp: {},
      password: {
        password: '',
        password_confirmation: ''
      },
      element: {},
      parameters: {},
      pagination: {
        'total': 0,
        'current_page': 0,
        'per_page': 0,
        'last_page': 0,
        'from': 0,
        'to': 0
      },
      offset: 5
    };
  },
  mounted: function mounted() {},
  computed: {
    isActived: function isActived() {
      return this.pagination.current_page;
    },
    pagesNumber: function pagesNumber() {
      if (!this.pagination.to) {
        return [];
      }

      var from = this.pagination.current_page - this.offset;

      if (from < 1) {
        from = 1;
      }

      var to = from + this.offset;

      if (to > this.pagination.last_page) {
        to = this.pagination.last_page;
      }

      var pagesArray = [];

      while (from <= to) {
        pagesArray.push(from);
        from++;
      }

      return pagesArray;
    },
    lastShowElement: function lastShowElement() {
      var from = this.pagination.from;
      var to = 0;

      if (from + 9 > this.pagination.total) {
        //if (from + 19 > this.pagination.total) {
        to = this.pagination.total;
      } else {
        to = from + 9; //  to = from + 19;
      }

      return to;
    }
    /*
            filteredLines() {
                if (this.searchQuery) {
                    return this.element.lines.filter((line) => {
                        return line.name.startsWith(this.searchQuery);
                    })
                } else {
                    return this.element.lines;
                }
            }
           
    */

  },
  methods: {
    date_format: function date_format(date, format) {
      //let dateforma = window.moment.utc(date).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
      var dateforma = window.moment.utc(date).tz("America/Bogota").format(format);
      return dateforma;
    },
    redirectPage: function redirectPage(url) {
      var redictpage = this.setUrl(url);
      window.location.href = redictpage;
    },
    currentUser: function currentUser() {
      var _this = this;

      //Traer el token que se le asigna al usuario por medio del login
      var url = this.setUrl('/auth/user');
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this.user = response.data.user;
        }
      })["catch"](function (error) {
        _this._errorProccessor(error);
      });
    },
    setUrl: function setUrl(url) {
      return window.location.origin + url;
    },
    //Valores por default del panel de búsqueda
    cleanFind: function cleanFind() {
      this.find.search = '';
      this.viewmap = false;
      this.element = this.elementInitialState();
    },
    cleanSearch: function cleanSearch() {
      this.find.active = false;
      this.find.type_search = 0;
      this.searchQuery = '';
      this.cleanFind();
      this.getListMethod();
    },
    // traer del componente hijo los valores seleccionados en cada input
    updateName: function updateName(search_name) {
      this.find.search = search_name;
    },
    updateCity: function updateCity(search_name) {
      this.find.search = search_name;
    },
    updateTitle: function updateTitle(search_title) {
      this.find.search = search_title;
    },
    getListMethod: function getListMethod() {
      if (this.find.active == true) {
        this.getListSearch(this.pagination.current_page);
      } else {
        this.getList(this.pagination.current_page);
      }
    },
    closeLoading: function closeLoading() {
      $('.loading').hide();
    },
    openLoading: function openLoading() {
      $('.loading').show();
    },
    openModal: function openModal(id) {
      $(id).modal('show');
    },
    openDrop: function openDrop(id) {
      $(id).dropdown('show');
    },
    _closeModal: function _closeModal(id) {
      $(id).modal('hide');
    },
    closeModal: function closeModal(id) {
      if (typeof id == 'array') {
        for (var i = 0; i < id.length; i++) {
          this._closeModal(id[i]);
        }
      } else {
        this._closeModal(id);
      }
    },
    proccessMessage: function proccessMessage(message) {
      var response = '';

      if (_typeof(message) == 'object') {
        for (key in message) {
          if (message.hasOwnProperty(key)) {
            response += '<br>- ' + message[key];
          }
        }
      } else {
        return message;
      }

      return response;
    },
    alertSuccess: function alertSuccess(message) {
      $('.modal-exito-message').html(message);
      $('#modal-exito').modal('show');
    },
    alertError: function alertError(message) {
      message = this.proccessMessage(message);
      $('.modal-error-message').html(message);
      $('#modal-error').modal('show');
    },
    alertErrorSimple: function alertErrorSimple(message) {
      this.message = message;
      $('.modal-error-message').html(this.message);
      $('#modal-error').modal('show');
    },
    getPathImg: function getPathImg(img, show, carpeta) {
      if (img == '' || typeof img == 'undefined') {
        return '';
      }

      if (!show) {
        return this.setUrl('/storage/' + carpeta + '/' + img);
      }

      return img;
    },
    getCampaingPath: function getCampaingPath(img, show) {
      if (img == '' || typeof img == 'undefined') {
        return '';
      }

      if (!show) {
        return this.setUrl('/storage/campaings/' + img);
      }

      return img;
    },
    firstPage: function firstPage() {
      if (this.find.active == true) {
        this.openLoading();
        this.pagination.current_page = 1;
        this.getListSearch(1);
      } else {
        this.openLoading();
        this.pagination.current_page = 1;
        this.getList(1);
      }
    },
    changePage: function changePage(page) {
      if (this.find.active == true) {
        this.openLoading();
        this.pagination.current_page = page;
        this.getListSearch(page);
      } else {
        this.openLoading();
        this.pagination.current_page = page;
        this.getList(page);
      }
    },
    lastPage: function lastPage() {
      if (this.find.active == true) {
        this.openLoading();
        this.pagination.current_page = this.pagination.last_page;
        this.getListSearch(this.pagination.last_page);
      } else {
        this.openLoading();
        this.pagination.current_page = this.pagination.last_page;
        this.getList(this.pagination.last_page);
      }
    },
    _jsonToForm: function _jsonToForm(json) {
      var form_data = new FormData();

      for (var key in json) {
        if (_typeof(json[key]) == 'object') {
          form_data.append(key, JSON.stringify(json[key]));
        } else {
          form_data.append(key, json[key]);
        }
      }

      return form_data;
    },
    _errorProccessor: function _errorProccessor(error) {
      if (error.response.status === 401) {
        this.alertError('¡La sesión ha expirado!');
        this.deleteToken();
      } else if (error.response.status === 403) {
        this.alertError("Acceso no autorizado, por favor contacte al administrador");
        window.location.href = "/dashboard/home";
      }
    },
    //crud
    _getList: function _getList(service, page) {
      var _this2 = this;

      var url = service + '?page=' + page;
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this2.list = response.data.list.data;
          _this2.count_contacts = response.data.count_contacts;
          _this2.pagination = response.data.pagination;
        } else {//this._errorAccess();
        }
      })["catch"](function (error) {
        _this2._errorProccessor(error);
      });
    },
    _getParameters: function _getParameters(service) {
      var _this3 = this;

      var url = service;
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this3.parameters = response.data.parameters;

          _this3.openChangePass();
        } else {//this._errorAccess();
        }
      })["catch"](function (error) {
        _this3._errorProccessor(error);
      });
    },
    _getListSearch: function _getListSearch(service, page) {
      var _this4 = this;

      this.openLoading();
      var url = service + '?page=' + page;
      var search = this.find;
      axios.post(url, search).then(function (response) {
        if (response.data.status == 'OK') {
          _this4.find.active = true;
          _this4.list = response.data.list.data;
          _this4.count_contacts = response.data.count_contacts;
          _this4.pagination = response.data.pagination;

          _this4.closeLoading();
        } else {
          _this4.alertError(response.data.errors);

          _this4.getList(1);

          _this4.find.active = false;

          _this4.cleanFind();

          _this4.closeLoading();
        }
      })["catch"](function (error) {
        _this4._errorProccessor(error);
      });
    },
    _storeElement: function _storeElement(service, formData, currentModal) {
      this.openLoading();
      var url = service;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status == 'OK') {
          console.log('se guardo el registro'); // this.element = this.elementInitialState();
          //this.closeModal(currentModal);
          //this.closeLoading();
          //this.alertSuccess(response.data.message);
          //this.getListMethod();
        } else {//this.closeLoading();
            //this.alertError(response.data.errors);
          }
      })["catch"](function (error) {// this._errorProccessor(error);
      });
    },
    _storeElementJson: function _storeElementJson(service, formData, currentModal) {
      var _this5 = this;

      this.openLoading();
      var url = service;
      axios.post(url, formData).then(function (response) {
        if (response.data.status == 'OK') {
          _this5.element = _this5.elementInitialState();

          _this5.closeModal(currentModal);

          _this5.closeLoading();

          _this5.alertSuccess(response.data.message);

          _this5.getListMethod();
        } else {
          _this5.closeLoading();

          _this5.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this5._errorProccessor(error);
      });
    },
    _updateElement: function _updateElement(service, formData, currentModal) {
      var _this6 = this;

      this.openLoading();
      var url = service;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status == 'OK') {
          _this6.element = _this6.elementInitialState();

          _this6.closeModal(currentModal);

          if (_this6.element.hasOwnProperty('updated_self') && _this6.element.updated_self == false) {
            _this6.element.updated_self = true;

            _this6.closeModal('#edit-company');

            _this6.closeModal('#edit-garage');
          }

          _this6.closeLoading();

          _this6.alertSuccess(response.data.message);

          _this6.element = _this6.elementInitialState();

          _this6.getListMethod();
        } else {
          _this6.closeLoading();

          _this6.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this6._errorProccessor(error);
      });
    },
    _updateElementWithRedirect: function _updateElementWithRedirect(service, formData, currentModal) {
      var _this7 = this;

      var redirect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      this.openLoading();
      var url = service;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status == 'OK') {
          _this7.element = _this7.elementInitialState();

          _this7.closeModal(currentModal);

          _this7.closeLoading();

          _this7.alertSuccess(response.data.message);

          _this7.getListMethod();

          if (redirect != '') {
            window.location.href = "/account/home";
          }
        } else {
          _this7.closeLoading();

          _this7.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this7._errorProccessor(error);
      });
    },
    _destroyElement: function _destroyElement(service, message) {
      var _this8 = this;

      var modal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (confirm(message)) {
        this.openLoading();
        var url = service;
        axios["delete"](url).then(function (response) {
          if (response.data.status == 'OK') {
            _this8.alertSuccess(response.data.message);

            _this8.getListMethod();
          } else {
            _this8.alertError(response.data.errors);
          }

          _this8.closeLoading();

          if (modal != '') {
            _this8.closeModal(modal);
          }
        })["catch"](function (error) {
          _this8._errorProccessor(error);
        });
      }
    },
    _destroyElement_alt: function _destroyElement_alt(service, modal) {
      var _this9 = this;

      this.openLoading();
      var url = service;
      axios["delete"](url).then(function (response) {
        if (response.data.status == 'OK') {
          _this9.closeLoading();

          _this9.alertSuccess(response.data.message);

          _this9.getListMethod(); //this.getParameters();

        } else {
          _this9.closeLoading();

          _this9.alertError(response.data.errors);
        }

        if (modal != '') {
          _this9.closeModal(modal);
        }
      })["catch"](function (error) {
        _this9._errorProccessor(error);
      });
    },
    _changeStatusElement: function _changeStatusElement(service, id) {
      var _this10 = this;

      this.openLoading();
      axios.post(service, {
        id: id
      }).then(function (response) {
        if (response.data.status == 'OK') {
          _this10.getListMethod();
        }

        _this10.closeLoading();
      })["catch"](function (error) {
        _this10._errorProccessor(error);
      });
    },
    logout: function logout() {
      var _this11 = this;

      this.openLoading();
      url = this.setUrl('/api/v1/auth/logout');
      axios.get(url, {}).then(function (response) {
        if (response.data.status == 'OK') {
          _this11.alertSuccess(response.data.message);

          _this11.deleteToken();
        } else if (error.response.status == 401) {
          _this11.alertSuccess('¡Se ha cerrado la sesión!');

          _this11.deleteToken();
        }
      })["catch"](function (error) {
        _this11._errorProccessor(error);
      });
    },
    deleteToken: function deleteToken() {
      var _this12 = this;

      //Traer el token que se le asigna al usuario por medio del login
      service = '/deleteToken';
      var url = service;
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          //Redireccionar al home con sesión terminada y token borrado
          setTimeout(function () {
            window.location.href = "/";
          }, 2000);
        }

        _this12.closeLoading();
      })["catch"](function (error) {
        _this12._errorProccessor(error);
      });
    },
    openChangePass: function openChangePass() {
      if (this.parameters.user.hasOwnProperty('change_password')) {
        if (this.parameters.user.change_password == 1) {
          this.openModal("#password");
        }
      }
    },
    changePassword: function changePassword() {
      var _this13 = this;

      this.openLoading();
      service = this.setUrl('/api/v1/auth/changePassword');
      this.password.change_password = 0;
      formData = this.password;
      var url = service;
      axios.post(url, formData).then(function (response) {
        if (response.data.status == 'OK') {
          //enviar el token a la función para su concatenación en la url
          _this13.password = '';

          _this13.alertSuccess(response.data.message);

          _this13.logout();
        } else {
          _this13.alertError(response.data.errors);
        }

        _this13.closeLoading();
      });
    }
  }
});

/***/ }),

/***/ 1:
/*!**********************************************!*\
  !*** multi ./resources/js/global/generic.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/vagrant/desarrollo/casatoro/tiempo/resources/js/global/generic.js */"./resources/js/global/generic.js");


/***/ })

/******/ });