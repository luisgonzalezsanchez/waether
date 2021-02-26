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

/***/ "./resources/js/dashboard/generic.js":
/*!*******************************************!*\
  !*** ./resources/js/dashboard/generic.js ***!
  \*******************************************/
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
      token: '',
      user: '',
      urlp: '',
      list: [],
      allies: {},
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
      parameters: {
        brands: [],
        lines: [],
        cities: [],
        user: []
      },
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

      if (from + 19 > this.pagination.total) {
        to = this.pagination.total;
      } else {
        to = from + 19;
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
            },
            filteredBrands() {
                if (this.searchQuery) {
                    return this.element.brands.filter((brand) => {
                        return brand.name.startsWith(this.searchQuery);
                    })
                } else {
                    return this.element.brands;
                }
            },
            filteredTermsCondicion() {
                if (this.searchQuery) {
                    return this.element.terms_conditions.filter((termCondition) => {
                        return termCondition.title.startsWith(this.searchQuery);
                    })
                } else {
                    return this.element.terms_conditions;
                }
            },
            filteredQuestionsFaq() {
                if (this.searchQuery) {
                    return this.element.question_faq.filter((questionsFaq) => {
                        return questionsFaq.question.startsWith(this.searchQuery);
                    })
                } else {
                    return this.element.question_faq;
                }
            },
            filteredEmail() {
                if (this.searchQuery) {
                    return this.element.email.filter((email) => {
                        return email.nombre_email.startsWith(this.searchQuery);
                    })
                } else {
                    return this.element.email;
                }
            },
            filteredQuestionsHobbies() {
                if (this.searchQuery) {
                    return this.element.categories.filter((questionsFaq) => {
                        return questionsFaq.title.startsWith(this.searchQuery);
                    })
                } else {
                    return this.element.categories;
                }
            },
             filteredSubcategories() {
                if (this.searchQuery) {
                    return this.element.subcategories.filter((subcategory) => {
                        return subcategory.name.startsWith(this.searchQuery);
                    })
                } else {
                    return this.element.subcategories;
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
    listAllies: function listAllies() {
      var _this2 = this;

      //Traer el token que se le asigna al usuario por medio del login
      var url = this.setUrl('/admin/ally/listallies');
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this2.allies = response.data.listAllies;
          console.log(_this2.allies);
        }
      })["catch"](function (error) {//this._errorProccessor(error);
      });
    },
    setUrl: function setUrl(url) {
      return window.location.origin + url;
    },
    //Valores por default del panel de búsqueda
    cleanFind: function cleanFind() {
      this.find.search = '';
      this.find.brand_id = 0;
      this.find.line_id = 0;
      this.find.date_start = '';
      this.find.date_end = '';
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
    updateTitle: function updateTitle(search_title) {
      this.find.search = search_title;
    },
    updateImei: function updateImei(search_imei) {
      this.find.search = search_imei;
    },
    updateDocument: function updateDocument(search_document) {
      this.find.search = search_document;
    },
    updateCity: function updateCity(search_city) {
      this.find.search = search_city;
    },
    updateStatus: function updateStatus(search_status) {
      this.find.search = search_status;
    },
    updateBrand: function updateBrand(search) {
      this.find.brand_id = search.brand_id;
      this.find.line_id = search.line_id;
    },
    updateCompanies: function updateCompanies(search) {
      this.find.company_id = search.company_id;
      this.find.company_brand_id = search.company_brand_id;
    },
    updateLocation: function updateLocation(search) {
      this.find.department_id = search.department_id;
      this.find.city_id = search.city_id;
    },
    updateDate: function updateDate(search) {
      this.find.date_start = search.date_start;
      this.find.date_end = search.date_end;
    },
    updateCompany: function updateCompany(search_company) {
      this.find.search = search_company;
    },
    updateType: function updateType(search_type) {
      this.find.search = search_type;
    },
    updateLicense: function updateLicense(search_license) {
      this.find.search = search_license;
    },
    updateOwner: function updateOwner(search_owner) {
      this.find.search = search_owner;
    },
    updateMobile: function updateMobile(search_mobile) {
      this.find.search = search_mobile;
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
    getParametersHomologations: function getParametersHomologations() {
      var _this3 = this;

      var url = this.setUrl('/api/v1/dashboard/brands/counthomologations');
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this3.homologations = response.data;

          if (_this3.homologations.count_homologations == 0) {
            $('.mgco_homologation_1').hide();
            $('.mgco_homologation_2').hide();
          }

          if (_this3.homologations.count_homologations > 0) {
            $('.mgco_homologation_1').show();
            $('.mgco_homologation_2').show();
            $('.mgco_homologation_1').html(_this3.homologations.count_homologations);
            $('.mgco_homologation_2').html(_this3.homologations.count_homologations);
          }
        }
      })["catch"](function (error) {
        _this3._errorProccessor(error);
      });
    },
    getContacts: function getContacts() {
      var _this4 = this;

      var url = this.setUrl('/api/v1/dashboard/contacts/users/count');
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this4.count_contacts = response.data.count_contacts;

          if (_this4.count_contacts == 0) {
            $('.mgco_count_contacts').hide();
          }

          if (_this4.count_contacts > 0) {
            $('.mgco_count_contacts').show();
            $('.mgco_count_contacts').html(_this4.count_contacts);
          }
        }
      })["catch"](function (error) {
        _this4._errorProccessor(error);
      });
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
      console.log(JSON.stringify(error));

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
      var _this5 = this;

      console.log('service', service);
      var url = service + '?page=' + page;
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this5.list = response.data.list.data;
          _this5.count_contacts = response.data.count_contacts;
          _this5.pagination = response.data.pagination;
        } else {//this._errorAccess();
        }
      })["catch"](function (error) {
        _this5._errorProccessor(error);
      });
    },
    _getParameters: function _getParameters(service) {
      var _this6 = this;

      var url = service;
      axios.get(url).then(function (response) {
        if (response.data.status == 'OK') {
          _this6.parameters = response.data.parameters;

          _this6.openChangePass();
        } else {//this._errorAccess();
        }
      })["catch"](function (error) {
        _this6._errorProccessor(error);
      });
    },
    _getListSearch: function _getListSearch(service, page) {
      var _this7 = this;

      this.openLoading();
      var url = service + '?page=' + page;
      var search = this.find;
      axios.post(url, search).then(function (response) {
        if (response.data.status == 'OK') {
          _this7.find.active = true;
          _this7.list = response.data.list.data;
          _this7.count_contacts = response.data.count_contacts;
          _this7.pagination = response.data.pagination;

          _this7.closeLoading();
        } else {
          _this7.alertError(response.data.errors);

          _this7.getList(1);

          _this7.find.active = false;

          _this7.cleanFind();

          _this7.closeLoading();
        }
      })["catch"](function (error) {
        _this7._errorProccessor(error);
      });
    },
    _storeElement: function _storeElement(service, formData, currentModal) {
      var _this8 = this;

      this.openLoading();
      var url = service;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status == 'OK') {
          _this8.element = _this8.elementInitialState();

          _this8.closeModal(currentModal);

          _this8.closeLoading();

          _this8.alertSuccess(response.data.message);

          _this8.getListMethod();
        } else {
          _this8.closeLoading();

          _this8.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this8._errorProccessor(error);
      });
    },
    _storeElement_reminder: function _storeElement_reminder(service, formData, currentModal) {
      var _this9 = this;

      this.openLoading();
      var url = service;
      axios.post(url, formData).then(function (response) {
        if (response.data.status == 'OK') {
          _this9.element = _this9.elementInitialState();

          _this9.closeModal(currentModal);

          _this9.closeLoading();

          _this9.alertSuccess(response.data.message);

          _this9.type_reminder = 0;

          _this9.getListMethod();
        } else {
          _this9.closeLoading();

          _this9.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this9._errorProccessor(error);
      });
    },
    _storeElementJson: function _storeElementJson(service, formData, currentModal) {
      var _this10 = this;

      this.openLoading();
      var url = service;
      axios.post(url, formData).then(function (response) {
        if (response.data.status == 'OK') {
          _this10.element = _this10.elementInitialState();

          _this10.closeModal(currentModal);

          _this10.closeLoading();

          _this10.alertSuccess(response.data.message);

          _this10.getListMethod();
        } else {
          _this10.closeLoading();

          _this10.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this10._errorProccessor(error);
      });
    },
    _updateElement: function _updateElement(service, formData, currentModal) {
      var _this11 = this;

      this.openLoading();
      var url = service;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status == 'OK') {
          _this11.element = _this11.elementInitialState();

          _this11.closeModal(currentModal);

          if (_this11.element.hasOwnProperty('updated_self') && _this11.element.updated_self == false) {
            _this11.element.updated_self = true;

            _this11.closeModal('#edit-company');

            _this11.closeModal('#edit-garage');
          }

          _this11.closeLoading();

          _this11.alertSuccess(response.data.message);

          _this11.element = _this11.elementInitialState();

          _this11.getListMethod();
        } else {
          _this11.closeLoading();

          _this11.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this11._errorProccessor(error);
      });
    },
    _updateElementWithRedirect: function _updateElementWithRedirect(service, formData, currentModal) {
      var _this12 = this;

      var redirect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      this.openLoading();
      var url = service;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status == 'OK') {
          _this12.element = _this12.elementInitialState();

          _this12.closeModal(currentModal);

          _this12.closeLoading();

          _this12.alertSuccess(response.data.message);

          _this12.getListMethod();

          if (redirect != '') {
            window.location.href = "/account/home";
          }
        } else {
          _this12.closeLoading();

          _this12.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this12._errorProccessor(error);
      });
    },
    _destroyElement: function _destroyElement(service, message) {
      var _this13 = this;

      var modal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (confirm(message)) {
        this.openLoading();
        var url = service;
        axios["delete"](url).then(function (response) {
          if (response.data.status == 'OK') {
            _this13.alertSuccess(response.data.message);

            _this13.getListMethod();
          } else {
            _this13.alertError(response.data.errors);
          }

          _this13.closeLoading();

          if (modal != '') {
            _this13.closeModal(modal);
          }
        })["catch"](function (error) {
          _this13._errorProccessor(error);
        });
      }
    },
    _destroyElement_alt: function _destroyElement_alt(service, modal) {
      var _this14 = this;

      this.openLoading();
      var url = service;
      axios["delete"](url).then(function (response) {
        if (response.data.status == 'OK') {
          _this14.closeLoading();

          _this14.alertSuccess(response.data.message);

          _this14.getListMethod();

          _this14.getParameters();
        } else {
          _this14.closeLoading();

          _this14.alertError(response.data.errors);
        }

        if (modal != '') {
          _this14.closeModal(modal);
        }
      })["catch"](function (error) {
        _this14._errorProccessor(error);
      });
    },
    _destroyNotification: function _destroyNotification(service) {
      var _this15 = this;

      var url = service;
      axios["delete"](url).then(function (response) {
        if (response.data.status == 'OK') {
          response.data.message = "La notificación ha sido eliminada";
        } else {
          _this15.alertError(response.data.errors);
        }
      })["catch"](function (error) {
        _this15._errorProccessor(error);
      });
    },
    _changeStatusElement: function _changeStatusElement(service, id) {
      var _this16 = this;

      this.openLoading();
      axios.post(service, {
        id: id
      }).then(function (response) {
        if (response.data.status == 'OK') {
          _this16.getListMethod();
        }

        _this16.closeLoading();
      })["catch"](function (error) {
        _this16._errorProccessor(error);
      });
    },
    logout: function logout() {
      var _this17 = this;

      this.openLoading();
      url = this.setUrl('/api/v1/auth/logout');
      axios.get(url, {}).then(function (response) {
        if (response.data.status == 'OK') {
          _this17.alertSuccess(response.data.message);

          _this17.deleteToken();
        } else if (error.response.status == 401) {
          _this17.alertSuccess('¡Se ha cerrado la sesión!');

          _this17.deleteToken();
        }
      })["catch"](function (error) {
        _this17._errorProccessor(error);
      });
    },
    deleteToken: function deleteToken() {
      var _this18 = this;

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

        _this18.closeLoading();
      })["catch"](function (error) {
        _this18._errorProccessor(error);
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
      var _this19 = this;

      this.openLoading();
      service = this.setUrl('/api/v1/auth/changePassword');
      this.password.change_password = 0;
      formData = this.password;
      var url = service;
      axios.post(url, formData).then(function (response) {
        if (response.data.status == 'OK') {
          //enviar el token a la función para su concatenación en la url
          _this19.password = '';

          _this19.alertSuccess(response.data.message);

          _this19.logout();
        } else {
          _this19.alertError(response.data.errors);
        }

        _this19.closeLoading();
      });
    }
  }
});

/***/ }),

/***/ 1:
/*!*************************************************!*\
  !*** multi ./resources/js/dashboard/generic.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laragon\www\connect-api\resources\js\dashboard\generic.js */"./resources/js/dashboard/generic.js");


/***/ })

/******/ });