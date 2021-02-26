new Vue({
    el: '#main',
    created: function() {

        //this.getWelcome();
        this.currentUser();
        this.element = this.elementInitialState();




    },
    data: {
        user: {},
        find: { search: '' },
        element: {},
        viewmap: false,
        lat: '',
        lng: ''

    },
    updated: function() {
        this.closeLoading();
    },
    mounted: function() {
        this.searchLocation();
    },
    methods: {

        getList: function(page) {

        },
        elementInitialState: function() {
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

        getWelcome: function() {

            axios.get('dashboard/home').then(response => {
                if (response.data.status == 'OK') {
                    this.message = response.data.message;
                } else {

                }
            }).catch(error => {
                this._errorProccessor(error);
            });

        },
        searchLocation: function() {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -33.8688, lng: 151.2195 },
                zoom: 11,
                mapTypeId: "roadmap",
            });
            // Create the search box and link it to the UI element.
            const input = document.getElementById("pac-input");
            const searchBox = new google.maps.places.SearchBox(input);


            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            // Bias the SearchBox results towards current map's viewport.
            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });
            let markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                } else {
                    this.viewmap = true;
                }

                // Clear out the old markers.
                markers.forEach((marker) => {
                    marker.setMap(null);
                });
                markers = [];
                // For each place, get the icon, name and location.
                const bounds = new google.maps.LatLngBounds();
                places.forEach((place) => {
                    if (!place.geometry || !place.geometry.location) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    const icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25),
                    };
                    //obtengo coordenadas
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();

                    //
                    this.getTiempo();

                    // Create a marker for each place.
                    markers.push(
                        new google.maps.Marker({
                            map,
                            icon,
                            title: place.name,
                            position: place.geometry.location,
                        })
                    );

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
        getTiempo: function() {


            idapi = 'X5E44XzzX44epMj';
            var url = 'https://api.tutiempo.net/json/?lan=es&apid=' + idapi + '&ll=' + this.lat + ',' + this.lng;
            console.log('url', url);
            //interactuar con la data y servicio por medio de axios
            axios.get(url).then(response => {
                if (response.data.error) {
                    this.alertError(response.data.error);
                } else {
                    console.log(response.data);
                    this.element.temperature_max = response.data.day1.temperature_max;
                    this.element.temperature_min = response.data.day1.temperature_min;

                    this.element.humidity = response.data.hour_hour.hour1.humidity;
                    this.element.temperature = response.data.hour_hour.hour1.temperature;
                    this.element.text = response.data.hour_hour.hour1.text;
                    this.element.wind = response.data.hour_hour.hour1.wind;
                    this.element.wind_direction = response.data.hour_hour.hour1.wind_direction;

                    this.element.information.humidity = response.data.information.humidity;
                    this.element.information.temperature = response.data.information.temperature;
                    this.element.information.wind = response.data.information.wind;


                    this.element.country = response.data.locality.country;
                    this.element.city = response.data.locality.name;
                    this.element.lat = this.lat;
                    this.element.lng = this.lng;

                    //se salva el registro
                    this._storeElement(this.setUrl('/dashboard/weather/store'), this._jsonToForm(this.element), '');

                }
            }).catch(error => {
                this._errorProccessor(error);
            });
        }
    }

});