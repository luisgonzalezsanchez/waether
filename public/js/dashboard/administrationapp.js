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

/***/ "./resources/js/dashboard/administrationapp.js":
/*!*****************************************************!*\
  !*** ./resources/js/dashboard/administrationapp.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _methods;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

new Vue({
  el: '#main',
  created: function created() {
    this.getListMethod(); //generic.js

    this.getParameters();
    this.getParametersHomologations();
    this.getContacts();
    this.element = this.elementInitialState();
    this.currentUser();
  },
  updated: function updated() {
    this.closeLoading();
  },
  mounted: function mounted() {},
  data: {
    status: false,
    list: [],
    element: {},
    parameters: {
      brands: [],
      lines: [],
      cities: []
    }
  },
  methods: (_methods = {
    elementInitialState: function elementInitialState() {
      return {
        title: '',
        content: '',
        status: 'Inactivo'
      };
    },
    getList: function getList(page) {
      this._getList(this.setUrl('/api/v1/dashboard/administrationapp'), page);
    },
    getListSearch: function getListSearch(page) {
      this._getListSearch(this.setUrl('/api/v1/dashboard/administrationapp/search'), page);
    },
    getParameters: function getParameters(page) {//this._getParameters(this.setUrl('/api/v1/dashboard/banners/parameters'));
    },
    //Enviar al servicio los datos para crear una nueva categoría
    createElement: function createElement() {
      this._storeElement(this.setUrl('/api/v1/dashboard/administrationapp/store'), this._jsonToForm(this.element), '#crear-admin');
    },
    changeStatus: function changeStatus() {
      if (this.status == true) {
        this.element.status = 'Inactivo';
        this.status = false;
      } else {
        this.element.status = 'Activo';
        this.status = true;
      }

      this.closeModal('#confirm_status');
    },
    viewElement: function viewElement(reg) {
      this.element = this.elementInitialState();
      this.element = reg;
      this.openModal('#ver-admin');
      this.loadEditor('editor-modi-term-view', false);
      $('.ql-editor').html(this.element.content);
      $('.ql-editor').css({
        'background': 'rgba(0, 0, 0, 0.06)'
      });
      $('.ql-toolbar').remove();
    },
    editElement: function editElement(reg) {
      this.element = this.elementInitialState();
      this.element = reg;

      if (reg.status == 'Activo') {
        this.status = false;
      } else {
        this.status = true;
      }

      this.changeStatus();
      this.openModal('#editar-admin');
      setTimeout(function () {
        //                if (reg.status == 'Activo') {
        //                    this.element.status = 'Inactivo';
        //                    this.status = false;
        //                } else {
        //                    this.element.status = 'Activo';
        //                    this.status = true;
        //                }
        $('.ql-toolbar').remove();
        this.loadEditor('editor-modi-term');
        $('.ql-editor').html(this.element.content);
      }.bind(this), 100);
    },
    saveElement: function saveElement() {
      var _this = this;

      this.openLoading();
      this.element.content = $('.ql-editor').html();
      var service = this.setUrl('/api/v1/dashboard/administrationapp/update/' + this.element.id); //la función _updateElement permite la acutalización de datos
      //            this._updateElement(service, this._jsonToForm(this.element), '#editar-categoria-terms');

      var currentModal = '#editar-admin';
      var url = service; //interactuar con la data y servicio por medio de axios

      axios.post(url, this.element).then(function (response) {
        //al obtener el estatus del servicio confirma exito o errores
        if (response.data.status == 'OK') {
          _this.element = _this.elementInitialState();

          _this.closeLoading();

          _this.closeModal('#editar-admin');

          _this.alertSuccess(response.data.message);

          _this.getListMethod();
        } else {
          _this.alertError(response.data.errors);

          _this.closeLoading();

          _this.getListMethod();

          _this.element.title = _this.tituloantiguo; //configElement(reg, index)
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
      this.openModal(id);
    },
    //Abrir modal confirmación de eliminación de recordatorio
    deleteAdmin: function deleteAdmin(reg) {
      this.openModal('#borrar-banner'); //obtener el id del recordatorio a eliminar

      this.banner = reg.id;
    },
    confirmDeleteAdmin: function confirmDeleteAdmin(banner) {
      //obtener url de servicio
      var service = this.setUrl('/api/v1/dashboard/administrationapp/destroy/') + banner; //borrar el recordatorio 

      this._destroyElement_alt(service, '#borrar-banner'); //actualizar list 


      this.getListMethod();
    }
  }, _defineProperty(_methods, "openCreateModal", function openCreateModal(id) {
    this.element = this.elementInitialState();
    this.openModal('#crear-admin');
  }), _defineProperty(_methods, "loadEditor", function loadEditor(ideditorconteiner) {
    var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'true';
    var toolbarOptions = [['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'], [{
      'header': 1
    }, {
      'header': 2
    }], // custom button values
    [{
      'list': 'ordered'
    }, {
      'list': 'bullet'
    }], [{
      'script': 'sub'
    }, {
      'script': 'super'
    }], // superscript/subscript
    [{
      'indent': '-1'
    }, {
      'indent': '+1'
    }], // outdent/indent
    [{
      'direction': 'rtl'
    }], // text direction
    [{
      'size': ['small', false, 'large', 'huge']
    }], // custom dropdown
    [{
      'header': [1, 2, 3, 4, 5, 6, false]
    }], [{
      'color': []
    }, {
      'background': []
    }], // dropdown with defaults from theme
    [{
      'font': []
    }], [{
      'align': []
    }], ['clean'] // remove formatting button
    ];
    var quill = new Quill('#' + ideditorconteiner, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });
    quill.enable(enable);
  }), _methods)
});

/***/ }),

/***/ 4:
/*!***********************************************************!*\
  !*** multi ./resources/js/dashboard/administrationapp.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laragon\www\connect-api\resources\js\dashboard\administrationapp.js */"./resources/js/dashboard/administrationapp.js");


/***/ })

/******/ });