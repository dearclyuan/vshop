<template lang="html">
    <div class="">
      <nav-bread>
        <span>商品详情页</span>
      </nav-bread>
      <div class="goodsdetail">
        <div class="detailimage"><img :src="'static/' + goods.productImage" alt=""></div>
        <div class="detailinfo">
          <span><div class="info-top">商品编号：</div><div class="info-detail">{{ $route.params.productId }}</div></span>
          <span><div class="info-top">商品名：</div><div class="info-detail">{{ goods.productName }}</div></span>
          <span><div class="info-top">商品价格：</div><div class="info-detail goodprice">¥：{{ goods.salePrice }}</div></span>
          <span><button type="button" class="addcart" name="button" @click="addCart">加入购物车</button></span>
        </div>
      </div>
      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>
    </div>
</template>

<script>
import '@/assets/css/detail.css'
import Public from '../Public'
import Modal from '@/components/Modal'
export default {
  mixins: [Public],
  components: {
    Modal
  },
  data () {
    return {
      productId: '',
      mdShowCart: false,
      goods: {

      }
    }
  },
  mounted () {
    this.productId = this.$route.params.productId
    this.getGoods()
  },
  methods: {
    closeModal () {
      this.mdShowCart = false
    },
    getGoods () {
      this.$http.get(`/goods/detail?productId=${this.productId}`)
      .then(res => {
        console.log(res)
        res = res.data
        if (res.status === '0') {
          this.goods = res.result
        }
      })
    },
    addCart () {
      this.$http.post('/goods/addCart', {productId: this.productId})
      .then(res => {
        res = res.data
        if (res.status === '0') {
          this.mdShowCart = true
          this.$store.commit('updateCartCount', 1)
        } else {
          this.mdShow = true
        }
      })
    }
  }
}
</script>