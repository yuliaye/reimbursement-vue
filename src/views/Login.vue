<template>
  <div class="box">
    <div class="topic">
      Reimbursement
    </div>

    <div class="body">
      <div class="login">Sign in</div>
      <el-alert
        type="error"
        :closable="false"
        :title="message"
        v-if="message"
      ></el-alert>
      <div class="form-container">
        <div class="form-group">
          Email
          <el-input placeholder="请输入任意内容" v-model="emailInput"></el-input>
        </div>
        <div class="form-group">
          Password
          <el-input placeholder="请输入任意内容" v-model="passwordInput" show-password></el-input>
        </div>
        <div class="form-group">
          <el-checkbox v-model="checked">Remember me</el-checkbox>
        </div>
        <el-button type="primary" @click="loginButton">Sign in</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      emailInput: '',
      passwordInput: '',
      message: '',
      checked: false
    }
  },

  methods: {
    loginButton() {
      if (!this.emailInput && !this.passwordInput) {
        this.message = '请输入账号和密码'
      } else {
        this.$store.state.isLogin = true
        this.$router.push({ path: '/reimbursements' })
        this.$store.state.accountName = this.emailInput

        if (this.checked) {
          this.$store.state.accountName = this.emailInput
          localStorage.setItem('accountName', this.emailInput)
        } else {
          this.$store.state.accountName = this.emailInput
          sessionStorage.setItem('accountName', this.emailInput)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    display: flex;
    flex-direction: column;
    align-items: center; // 非现在定义属性的位置方向
    /* justify-content: center;//现在属性的位置方向 */
    background-color:#EEEEEE;
    height: 735px;

   .topic{
      display: flex;
      flex-direction: column;
      align-items: center; // 非现在定义属性的位置方向
      font-size: 50px;
      height: 90px;
      width: 100%;
      margin:25px;
      border-bottom: 1px solid #888;
    }

    .body{
      .login{
        font-size: 25px;
        text-align: center;
        margin: 0 0 10px 0;
      }

      .form-container {
        display: flex;
        flex-direction: column;
      }

      .form-group{
        margin: 7px;
      }
    }
  }
</style>
