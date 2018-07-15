<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="goods-ul">
        <li v-for="(item, index) in goods" class="menu-item"
            :class="(currentIndex===index)? 'current' : 'not-current'"
            @click="selectMenu(index, $event)">
          <span class="text border-1px"><span v-show="item.type>0" class="icon"
                                              :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper" ref="foodsWrapper">
      <ul style="margin: 0; padding: 0">
        <li v-for="item in goods" class="food-list" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul style="margin: 0; padding: 0">
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../../components/shopcart/shopcart';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    name: "goods",
    computed: {
      //使用vue计算属性，将左右列表做一个映射。
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          //获取一个区间的上下范围
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$ajax.get('api/goods').then((res) => {  //请求方式  //api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
        console.log("response body: \n", res.data.data);
        this.goods = res.data.data;
        this.$nextTick(() => { //异步调用 初始化高度
          this._initScroll();
          //实时对比y坐标在哪一个区间
          //先计算右侧每个区间的高度
          this._calculateHeight();

        });
      }, (err) => {
        console.log(err, '请求失败');
      });
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3 //检测实时滚动的位置
        });

        this.foodsScroll.on('scroll', (pos) => {
          //滚动的时候，实时获取scrollY
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        });
      },
      _calculateHeight() {
        //获取每个food的<li>（标题和内容区域）
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          console.log("区间" + i + "的高度: " + item.clientHeight);
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        // for (let i = 0; i < foodList.length; i++) {
        //   console.log(foodList[i]);
        // }
      },
      selectMenu(index, event) { //click事件传递的event
        if (!event._constructed) {
          return;
        }
        console.log("click index: " + index);
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      }
    },
    components: {
      shopcart
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

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
      .goods-ul
        margin 0
        padding 0
      .menu-item
        display table
        height 54px
        width: 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align top
          width 12px
          height: 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width: 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7, 17, 27, 0.2))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.2))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex: 1
          .name
            margin 2px 0 8px 0
            height: 14px
            line-height 14px
            font-size 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 18px
              font-size 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color color rgb(147, 153, 159)
</style>
