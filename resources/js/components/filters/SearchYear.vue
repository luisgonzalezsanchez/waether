<template>
   <input class="form-control" type="text" v-model="find.search" v-on:input="updateSearchYear()" placeholder="Ingrese su búsqueda">
</template>

<script>
    export default {
        created(){
        	this.find={search:''}
        },
        methods:{
        	updateSearchYear(){
			      this.$emit('update_year',this.find.search);
			    }
        },
    };
</script>
