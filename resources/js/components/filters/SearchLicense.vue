<template>
   <input class="form-control" type="text" style="text-transform: uppercase;" v-model="find.search" v-on:input="updateSearchLicense()" placeholder="Ingrese su búsqueda">
</template>

<script>
    export default {
        created(){
        	this.find={search:''}
        },
        methods:{
        	updateSearchLicense(){
			      this.$emit('update_license',this.find.search);
			    }
        },
    };
</script>
