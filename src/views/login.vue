<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">统一认证平台</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="iconfont icon-icon_suo-"></i>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin('loginForm')"
          />
          <span class="show-pwd" @click="showPwd">
            <i
              :class="passwordType === 'password' ? 'iconfont icon-yanjing1' : 'iconfont icon-yanjing'"
            ></i>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="handleLogin('loginForm')"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
     const validateUsername = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('请输入至少三位账号'));
      }else {
        callback ();
      }
    }  
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('请输入至少三位密码'));
      } else {
        callback();
      }
    }
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= "a" && key <= "z") ||
          (!shiftKey && key >= "A" && key <= "Z")
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.loading = true
          let formData = new FormData();
          formData.append("client_id", this.$store.getters.app.client_id);
          formData.append("client_secret", this.$store.getters.app.client_secret);
          formData.append("grant_type", this.$store.getters.app.grant_type);
          formData.append("scope", this.$store.getters.app.scope);
          formData.append("username", this.loginForm.username);
          formData.append("password", this.$md5(this.loginForm.password));
          let returnUrl = this.$route.query.returnUrl || "http://106.58.171.222:9000/360PatientView";
          this.$http
          .post("/api/account/login", {
            username: this.loginForm.username,
            password: this.$md5(this.loginForm.password)
          })
          .then(res => {
            if (res.access_token) {
              this.$store.dispatch("user/setToken", res.access_token);
              window.location.href = returnUrl+"#/callback?access_token="+this.$store.getters.user.token;
            }else {
               this.$notify({
                title: "系统提示",
                message: res.Message || "请求失败",
                type: "warning"
              });
            }
            this.loading = false
         })
          .catch(res => {
            this.loading = false
            this.$notify({
              title: "系统提示",
              message: res.message || "请求失败",
              type: "warning"
            });
          });
        }else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
