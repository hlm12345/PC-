<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知vuex发请求 ， 获取数据，存储在state中   App组件只会执行一次 ，放这里发请求就之后就只会发一次
    this.$store.dispatch('getcategoryList')
  }
}
</script>

<style>
</style>
