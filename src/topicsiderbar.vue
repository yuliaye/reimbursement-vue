<template>
  <div class="topicNavigation">
    <div class="topicAccount">
      <span class="span1">Social Ekohe</span>
      <span class="span2"><router-link to="/reimbursements">Reimbursements</router-link></span>
      <span class="span3">Holiday</span>
    </div>

    <div class="account">
      <el-dropdown>
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Profile</el-dropdown-item>
          <el-dropdown-item>Account Settings</el-dropdown-item>
          <el-dropdown-item>Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {

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
        font-size:25px;
        color: yellow;
        margin-bottom: 10px;
      }
      .span2{
        font-size:15px;
        margin: 0 11px 0 22px;
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
