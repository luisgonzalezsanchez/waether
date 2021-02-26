<template>
   <input class="form-control" type="text" v-model="find.search" v-on:input="updateSearchCity()" placeholder="Ingrese su búsqueda">
</template>

<script>
    export default {
        created(){
        	this.find={search:''}
        },
        methods:{
        	updateSearchCity(){
			      this.$emit('update_city',this.find.search);
			    }
        },
    };
</script>
