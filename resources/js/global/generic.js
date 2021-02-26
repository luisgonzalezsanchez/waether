Vue.mixin({

    updated: function() {
        this.closeLoading();
    },

    data: function() {
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
            find: { search: '', type_search: 0, brand_id: 0, line_id: 0, company_id: 0, company_brand_id: 0, department_id: 0, city_id: 0, date_start: '', date_end: '', active: false },
            temp: {},
            password: { password: '', password_confirmation: '' },
            element: {},
            parameters: {

            },
            pagination: {
                'total': 0,
                'current_page': 0,
                'per_page': 0,
                'last_page': 0,
                'from': 0,
                'to': 0
            },
            offset: 5,

        }
    },
    mounted() {},
    computed: {
        isActived: function() {
            return this.pagination.current_page;
        },
        pagesNumber: function() {
            if (!this.pagination.to) {
                return [];
            }

            var from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }

            var to = from + this.offset
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

        lastShowElement: function() {
            var from = this.pagination.from;

            var to = 0;
            if (from + 9 > this.pagination.total) {
                //if (from + 19 > this.pagination.total) {
                to = this.pagination.total;
            } else {
                to = from + 9;
                //  to = from + 19;
            }
            return to;
        },
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
        date_format: function(date, format) {
            //let dateforma = window.moment.utc(date).tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
            let dateforma = window.moment.utc(date).tz("America/Bogota").format(format);
            return dateforma;
        },
        redirectPage: function(url) {
            var redictpage = this.setUrl(url);
            window.location.href = redictpage;
        },
        currentUser: function() {
            //Traer el token que se le asigna al usuario por medio del login
            var url = this.setUrl('/auth/user');
            axios.get(url).then(response => {
                if (response.data.status == 'OK') {
                    this.user = (response.data.user);
                }

            }).catch(error => {
                this._errorProccessor(error);
            });


        },


        setUrl: function(url) {
            return window.location.origin + url;
        },
        //Valores por default del panel de búsqueda

        cleanFind: function() {
            this.find.search = '';
            this.viewmap = false;
            this.element = this.elementInitialState();
        },

        cleanSearch: function() {
            this.find.active = false;
            this.find.type_search = 0;
            this.searchQuery = '';
            this.cleanFind();
            this.getListMethod();
        },

        // traer del componente hijo los valores seleccionados en cada input
        updateName: function(search_name) {
            this.find.search = search_name;
        },
        updateCity: function(search_name) {
            this.find.search = search_name;
        },

        updateTitle: function(search_title) {
            this.find.search = search_title;
        },



        getListMethod() {
            if (this.find.active == true) {
                this.getListSearch(this.pagination.current_page);
            } else {
                this.getList(this.pagination.current_page);
            }
        },

        closeLoading: function() {
            $('.loading').hide();
        },

        openLoading: function() {
            $('.loading').show();
        },

        openModal: function(id) {
            $(id).modal('show');
        },

        openDrop: function(id) {
            $(id).dropdown('show');
        },

        _closeModal: function(id) {
            $(id).modal('hide');
        },

        closeModal: function(id) {
            if (typeof(id) == 'array') {
                for (var i = 0; i < id.length; i++) {
                    this._closeModal(id[i]);
                }
            } else {
                this._closeModal(id);
            }
        },

        proccessMessage: function(message) {
            var response = '';
            if (typeof(message) == 'object') {
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

        alertSuccess: function(message) {
            $('.modal-exito-message').html(message);
            $('#modal-exito').modal('show');
        },

        alertError: function(message) {
            message = this.proccessMessage(message);
            $('.modal-error-message').html(message);
            $('#modal-error').modal('show');
        },

        alertErrorSimple: function(message) {
            this.message = message;
            $('.modal-error-message').html(this.message);
            $('#modal-error').modal('show');
        },

        getPathImg: function(img, show, carpeta) {
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

        firstPage: function() {
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

        changePage: function(page) {
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

        lastPage: function() {
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





        _jsonToForm: function(json) {
            var form_data = new FormData();
            for (var key in json) {
                if (typeof(json[key]) == 'object') {
                    form_data.append(key, JSON.stringify(json[key]));
                } else {
                    form_data.append(key, json[key]);
                }
            }
            return form_data;
        },

        _errorProccessor: function(error) {
            if (error.response.status === 401) {
                this.alertError('¡La sesión ha expirado!');
                this.deleteToken();
            } else if (error.response.status === 403) {
                this.alertError("Acceso no autorizado, por favor contacte al administrador");
                window.location.href = "/dashboard/home";
            }
        },
        //crud
        _getList: function(service, page) {
            var url = service + '?page=' + page;
            axios.get(url).then(response => {
                if (response.data.status == 'OK') {
                    this.list = response.data.list.data;
                    this.count_contacts = response.data.count_contacts;
                    this.pagination = response.data.pagination;
                } else {
                    //this._errorAccess();
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        _getParameters: function(service) {
            var url = service;
            axios.get(url).then(response => {
                if (response.data.status == 'OK') {
                    this.parameters = response.data.parameters;
                    this.openChangePass();
                } else {
                    //this._errorAccess();
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        _getListSearch: function(service, page) {
            this.openLoading()
            var url = service + '?page=' + page;
            var search = this.find;
            axios.post(url, search).then(response => {
                if (response.data.status == 'OK') {
                    this.find.active = true;
                    this.list = response.data.list.data;
                    this.count_contacts = response.data.count_contacts;
                    this.pagination = response.data.pagination;
                    this.closeLoading();
                } else {
                    this.alertError(response.data.errors);
                    this.getList(1);
                    this.find.active = false;
                    this.cleanFind();
                    this.closeLoading();
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        _storeElement: function(service, formData, currentModal) {
            this.openLoading();
            var url = service;
            axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }

            ).then(response => {
                if (response.data.status == 'OK') {
                    console.log('se guardo el registro');
                    // this.element = this.elementInitialState();
                    //this.closeModal(currentModal);
                    //this.closeLoading();
                    //this.alertSuccess(response.data.message);
                    //this.getListMethod();
                } else {
                    //this.closeLoading();
                    //this.alertError(response.data.errors);
                }

            }).catch(error => {
                // this._errorProccessor(error);
            });
        },


        _storeElementJson: function(service, formData, currentModal) {
            this.openLoading();
            var url = service;
            axios.post(url, formData).then(response => {
                if (response.data.status == 'OK') {
                    this.element = this.elementInitialState();
                    this.closeModal(currentModal);
                    this.closeLoading();
                    this.alertSuccess(response.data.message);
                    this.getListMethod();
                } else {
                    this.closeLoading();
                    this.alertError(response.data.errors);
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        _updateElement: function(service, formData, currentModal) {
            this.openLoading();
            var url = service;
            axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
                if (response.data.status == 'OK') {
                    this.element = this.elementInitialState();
                    this.closeModal(currentModal);
                    if (this.element.hasOwnProperty('updated_self') && this.element.updated_self == false) {
                        this.element.updated_self = true;
                        this.closeModal('#edit-company');
                        this.closeModal('#edit-garage');
                    }
                    this.closeLoading();
                    this.alertSuccess(response.data.message);
                    this.element = this.elementInitialState();
                    this.getListMethod();
                } else {
                    this.closeLoading();
                    this.alertError(response.data.errors);
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        _updateElementWithRedirect: function(service, formData, currentModal, redirect = '') {
            this.openLoading();
            var url = service;
            axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
                if (response.data.status == 'OK') {
                    this.element = this.elementInitialState();
                    this.closeModal(currentModal);
                    this.closeLoading();
                    this.alertSuccess(response.data.message);
                    this.getListMethod();
                    if (redirect != '') {
                        window.location.href = "/account/home";
                    }
                } else {
                    this.closeLoading();
                    this.alertError(response.data.errors);
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        _destroyElement: function(service, message, modal = '') {
            if (confirm(message)) {
                this.openLoading();
                var url = service;
                axios.delete(url).then(response => {
                    if (response.data.status == 'OK') {
                        this.alertSuccess(response.data.message);
                        this.getListMethod();
                    } else {
                        this.alertError(response.data.errors);
                    }
                    this.closeLoading();
                    if (modal != '') {
                        this.closeModal(modal);
                    }
                }).catch(error => {
                    this._errorProccessor(error);
                });
            }
        },

        _destroyElement_alt: function(service, modal) {
            this.openLoading();
            var url = service;
            axios.delete(url).then(response => {
                if (response.data.status == 'OK') {
                    this.closeLoading();
                    this.alertSuccess(response.data.message);
                    this.getListMethod();
                    //this.getParameters();
                } else {
                    this.closeLoading();
                    this.alertError(response.data.errors);
                }
                if (modal != '') {
                    this.closeModal(modal);
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },



        _changeStatusElement: function(service, id) {
            this.openLoading();
            axios.post(service, {
                id: id
            }).then(response => {
                if (response.data.status == 'OK') {
                    this.getListMethod();
                }
                this.closeLoading();
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        logout: function() {
            this.openLoading();
            url = this.setUrl('/api/v1/auth/logout');
            axios.get(url, {}).then(response => {
                if (response.data.status == 'OK') {
                    this.alertSuccess(response.data.message);
                    this.deleteToken();
                } else if (error.response.status == 401) {
                    this.alertSuccess('¡Se ha cerrado la sesión!');
                    this.deleteToken();
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        deleteToken: function() {
            //Traer el token que se le asigna al usuario por medio del login
            service = '/deleteToken';
            var url = service;
            axios.get(url).then(response => {
                if (response.data.status == 'OK') {
                    //Redireccionar al home con sesión terminada y token borrado
                    setTimeout(function() {
                        window.location.href = "/";
                    }, 2000);
                }
                this.closeLoading();
            }).catch(error => {
                this._errorProccessor(error);
            });
        },

        openChangePass: function() {
            if (this.parameters.user.hasOwnProperty('change_password')) {
                if (this.parameters.user.change_password == 1) {
                    this.openModal("#password");
                }
            }
        },

        changePassword: function() {
            this.openLoading();
            service = this.setUrl('/api/v1/auth/changePassword');
            this.password.change_password = 0;
            formData = this.password;
            var url = service;
            axios.post(url, formData).then(response => {
                if (response.data.status == 'OK') {
                    //enviar el token a la función para su concatenación en la url
                    this.password = '';
                    this.alertSuccess(response.data.message);
                    this.logout();
                } else {
                    this.alertError(response.data.errors);
                }
                this.closeLoading();
            });
        },





    }
});