<template>
   <input class="form-control" type="text" v-model="find.search" v-on:input="updateSearchVin()" placeholder="Ingrese su búsqueda">
</template>

<script>
    export default {
        created(){
        	this.find={search:''}
        },
        methods:{
        	updateSearchVin(){
			      this.$emit('update_vin',this.find.search);
			    }
        },
    };
</script>
