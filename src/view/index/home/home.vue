<template>
  <div class="user-info">
    <div class="user-info-item"><b>{{user.userName}}</b> 欢迎登陆TG机器人管理系统！</div>
  </div>
</template>
<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
    
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  mounted () {
    
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
.count-style{
  font-size: 50px;
}
.user-info{
  .user-info-item{
    font-size: 16px;
  }
}
</style>
