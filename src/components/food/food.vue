<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow-lift">返回</i>
          </div>
        </div>

        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div  class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "food.vue",
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width 100%;
    background #fff
    &.move-enter-active, &.move-leave-active
      transition all 0.2s linear
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
    .image-header
      position relative
      width: 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        bottom 0
        width: 100%
        height 100%
      .back
        position: absolute
        top: 10px
        left 0
        .icon-arrow-lift
          display block
          padding: 10px
          font-size 20px
          color: #fff

    .content
      padding 18px
      .title
        color #fff
</style>
