<template>
  <div id="app">
    <v-header></v-header>

    <div class="tab border-1px">
      <div class="tab-item">
        <!--使用指令v-link进行导航-->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header';

  export default {
    components: {
      "v-header": header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./stylus/mixin.styl"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          text-decoration: none
          font-size: 14px
          color: green
        .router-link-active
          color: red
</style>
