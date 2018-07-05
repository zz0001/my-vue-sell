<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods">
          <span v-show="item.type>0" class="icon"><span class="text">{{item.name}}</span></span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      };
    },
    name: "goods",
    created() {
      this.$ajax.get('api/goods').then((res) => {  //请求方式  //api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
        console.log("response body: \n", res.data.data);
        this.goods = res.data.data;
      },(err)=>{
        console.log(err,'请求失败');
      });
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods
    display: flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
    .foods-wrapper
      flex 1

</style>
