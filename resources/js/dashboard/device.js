new Vue({
    el: '#main',
    created: function() {
        this.currentUser();
        this.getListMethod(); //generic.js
        //this.getParameters();
        // this.getParametersHomologations();
        //this.getContacts();
        this.element = this.elementInitialState();
    },
    updated: function() {
        this.closeLoading();
    },
    mounted: function() {},
    data: {

        status: false,
        list: [],
        element: {},
        parameters: {},
        allies: {}
    },

    methods: {
        elementInitialState: function() {
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

        getList: function(page) {
            this._getList(this.setUrl('/dashboard/device'), page);
        },
        getListSearch: function(page) {
            this._getListSearch(this.setUrl('/dashboard/device/search'), page);
        },
        getParameters: function(page) {
            //this._getParameters(this.setUrl('/api/v1/dashboard/banners/parameters'));
        },
        //Enviar al servicio los datos para crear
        createElement: function() {
            this._storeElement(this.setUrl('/dashboard/device/store'), this._jsonToForm(this.element), '#crear-element');
        },
        changeStatus: function() {
            if (this.status == true) {
                this.element.status = 'Activo';
            } else {
                this.element.status = 'Inactivo';
            }
        },
        viewElement: function(reg) {
            this.element = this.elementInitialState();
            this.element = reg;
            this.openModal('#ver-detalle');
        },
        editElement: function(reg) {
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
        saveElement: function() {
            this.openLoading();

            var service = this.setUrl('/dashboard/device/update/' + this.element.id);
            //la función _updateElement permite la acutalización de datos
            //            this._updateElement(service, this._jsonToForm(this.element), '#editar-categoria-terms');
            var currentModal = '#editar-element';


            var url = service;
            //interactuar con la data y servicio por medio de axios
            axios.post(url, this.element).then(response => {
                //al obtener el estatus del servicio confirma exito o errores
                if (response.data.status == 'OK') {
                    this.element = this.elementInitialState();
                    this.closeLoading();
                    this.closeModal('#editar-element');
                    this.alertSuccess(response.data.message);
                    this.getListMethod();
                } else {

                    this.alertError(response.data.errors);
                    this.closeLoading();
                    this.getListMethod();
                    //configElement(reg, index)

                }

            }).catch(error => {
                this._errorProccessor(error);
            });

        },
        confirmarChangeStatus: function() {
            this.openModal('#confirm_status');
        },
        openCreateModal: function(id) {
            this.element = this.elementInitialState();
            this.getAllies();
            this.openModal(id);
        },
        //Abrir modal confirmación de eliminación de recordatorio
        deleteElement: function(reg) {
            this.openModal('#delete-elemnt');
            //obtener el id del recordatorio a eliminar
            this.elementDelete = reg.id;
        },
        confirmDeleteElement: function(elementDelete) {
            //obtener url de servicio
            var service = this.setUrl('/dashboard/device/destroy/') + elementDelete;
            //borrar el recordatorio
            this._destroyElement_alt(service, '#delete-elemnt');
            //actualizar list
            this.getListMethod();
        },
        getAllies: function() {

            var url = this.setUrl('/admin/onlyCompanies');
            axios.get(url).then(response => {
                if (response.data.status == 'OK') {
                    this.allies = response.data;

                } else {
                    //this._errorAccess();
                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        },
    }

});