<template>
  <div>
    <el-row class="tac">
      <el-col :span="20">
        <el-menu :default-active="$route.path" :router="true">
          <el-menu-item>
            <span slot="title">LIST HEADER</span>
          </el-menu-item>
          <el-menu-item index="/reimbursements">
            <span slot="title">My Reimbursements</span>
          </el-menu-item>
          <el-menu-item index="/reimbursements/new">
            <span slot="title">Add Reimbursements</span>
          </el-menu-item>
          <el-divider class="divider"></el-divider>
          <el-menu-item class="spanhelp">
            <span slot="title">Help</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .tac{
    display: flex;
    justify-content: center;
    margin: 0 5px;
    .el-menu-item{
      font-size: 12px;
      height: 40px;
      line-height: 40px;
    }
    .divider{
      margin: 5px;
    }
  }
</style>
