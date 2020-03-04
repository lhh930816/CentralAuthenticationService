<script>
export default {
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
        let returnUrl = this.$
        this.$http
        .get("/connect/userinfo", {})
        .then(res => {
          this.$router.push(this.$route.query.returnUrl);
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message || "请求失败",
            type: "warning"
          });
        });
    }
  }
};
</script>