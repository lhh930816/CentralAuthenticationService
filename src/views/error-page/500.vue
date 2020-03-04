<template>
    <div class="errPage-container">
         <div class="pic-500">
             <img src="@/assets/500.png" alt="500">
         </div>
         <div class="error-handle">
          <router-link to="/">
            <el-button type="primary" size="large">返回首页</el-button>
          </router-link>
          <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>
      </div>
    </div>
</template>
<script>
export default {
    methods: {
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss">

</style>