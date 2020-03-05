<template>
  <section></section>
</template>

<script>
export default {
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading"
      });
      this.$http
        .get("/connect/userinfo", {})
        .then(res => {
          loading.close();
          this.$store.dispatch("user/setUser", {
            id: res.sub || "",
            name: res.name || ""
          });
          this.$router.push({
            path: this.$route.query.returnUrl,
            query: { access_token: this.$store.getters.user.token }
          });
        })
        .catch(res => {
          loading.close();
          this.$notify({
            title: "系统提示",
            message: res.message || "请求失败",
            type: "warning"
          });
          this.$router.go(-1);
        });
    }
  }
};
</script>