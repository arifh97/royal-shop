<template>
  <router-view/>
</template>

<script>

export  default {
    name: 'App',
    mounted(){
      console.log(process.env.VUE_APP_TITLE)
    }
}
</script>

<style lang="scss">

</style>
