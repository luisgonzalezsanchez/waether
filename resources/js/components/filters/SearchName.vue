<template>
   <input class="form-control" type="text" v-model="find.search" v-on:input="updateSearchName()" placeholder="Ingrese su búsqueda">
</template>

<script>
    export default {
        created(){
        	this.find={search:''}
        },
        methods:{
        	updateSearchName(){
			      this.$emit('update_name',this.find.search);
			    }
        },
    };
</script>
