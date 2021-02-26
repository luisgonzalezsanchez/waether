<template>
   <input class="form-control" type="text" v-model="find.search" v-on:input="updateSearchImei()" placeholder="Ingrese su búsqueda">
</template>

<script>
    export default {
        created(){
        	this.find={search:''}
        },
        methods:{
        	updateSearchImei(){
			      this.$emit('update_imei',this.find.search);
			    }
        },
    };
</script>
