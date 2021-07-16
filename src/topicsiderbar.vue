<template>
  <div class="topicNavigation">
    <div class="topicAccount">
      <span class="span1">ReimbVue</span>
      <span class="span2"><router-link to="/reimbursements">Reimbursements</router-link></span>
      <span class="span3">Holiday</span>
    </div>

    <div class="account">
      <router-link to="/login" v-if="!$store.state.isLogin"><el-button type="text">login</el-button></router-link>
      <el-dropdown v-if="$store.state.isLogin">
        <span class="el-dropdown-link">
          {{$store.state.accountName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Profile</el-dropdown-item>
          <el-dropdown-item>Account Settings</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .topicNavigation{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    background: black;
    .topicAccount{
      .span1{
        margin-left: 15px;
        font-size:25px;
        color: yellow;
        margin-bottom: 10px;
      }
      .span2{
        font-size:15px;
        margin: 0 15px 0 22px;
        a:-webkit-any-link {
          color: white;
        }
      }
      .span3{
        font-size:15px;
        color: #909399;
      }
    }
    .account{
      margin-right: 20px;
      .el-dropdown-link {
        cursor: pointer;
        color: white;
      }
      .el-icon-arrow-down {
        font-size: 20px;
      }
    }
  }

</style>
