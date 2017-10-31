<template>
    <div>
        Userdetail <br>
        ID:{{$route.params.id}}
        <br>
        <router-link :to='link' class="btn btn-primary" tag="button">UserEdit</router-link>

        <router-link to="/user" class="btn btn-primary" tag="button">To User</router-link>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                link:{
                    name:'UserEdit',
                    params:{
                        id:this.$route.params.id
                    },
                    query:{
                        local:'zh',
                        q:100
                    },
                    hash:'#data'
                }
            }
        }
    }
</script>