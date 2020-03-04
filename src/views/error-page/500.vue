<template>
  <div class="errPage-container">
    <div class="pic-500">
      <img src="@/assets/500.png" alt="500" />
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
  mounted() {
    this.getErrorMsg();
  },
  methods: {
    getErrorMsg() {
      let errorId = this.$route.query.errorId;
      if (!errorId) {
        return;
      }
      this.$http
        .get("/api/home/error", {
          params: {
            errorId: errorId
          }
        })
        .then(res => {
          this.$notify({
            title: res.Error || "系统提示",
            message: res.ErrorDescription || "请求失败",
            type: "warning"
          });
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
</style>