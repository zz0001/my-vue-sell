<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
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

<script type="text/ecmascript-6">
  import header from './components/header/header';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$ajax.get('api/seller').then((res) => {  //请求方式  //api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
        console.log("response body: \n", res.data.data);
        console.log("response avatar: \n", res.data.data.avatar);
        this.seller = res.data.data;
        console.log("avatar: " + this.seller.avatar)
      },(err)=>{
        console.log(err,'请求失败');
      });
    },
    components: {
      "v-header": header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"

    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          text-decoration: none
          font-size: 14px
          color: black
        .router-link-active
          color: red
</style>
