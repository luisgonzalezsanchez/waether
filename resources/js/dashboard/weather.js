new Vue({
    el: '#main',
    created: function() {
        this.currentUser();
        this.getListMethod(); //generic.js
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
    },

    methods: {
        elementInitialState: function() {
            return {
                humidity: '',
                temperature: '',
                wind: '',
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

        getList: function(page) {
            this._getList(this.setUrl('/dashboard/weather'), page);
        },
        getListSearch: function(page) {
            this._getListSearch(this.setUrl('/dashboard/weather/search'), page);
        },
        //Enviar al servicio los datos para crear
        createElement: function() {
            this._storeElement(this.setUrl('/dashboard/weather/store'), this._jsonToForm(this.element), '#crear-element');
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
            this.initMap();
            this.openModal('#ver-detalle');
        },

        //Abrir modal confirmación de eliminación de recordatorio
        deleteElement: function(reg) {
            this.openModal('#delete-elemnt');
            //obtener el id del recordatorio a eliminar
            this.elementDelete = reg.id;
        },
        confirmDeleteElement: function(elementDelete) {
            //obtener url de servicio
            var service = this.setUrl('/dashboard/weather/destroy/') + elementDelete;
            //borrar el recordatorio
            this._destroyElement_alt(service, '#delete-elemnt');
            //actualizar list
            this.getListMethod();
        },
        initMap: function() {
            let myCenter = new google.maps.LatLng(this.element.lat, this.element.lng);
            //propiedades del mapa
            var mapProp = {
                center: myCenter,
                zoom: 11,
                mapTypeId: "roadmap",

            };
            //crea el mapa
            var map = new google.maps.Map(document.getElementById("map_detalle"), mapProp);


            var marker = new google.maps.Marker({
                position: myCenter
            });

            marker.setMap(map);

        }

    }

});