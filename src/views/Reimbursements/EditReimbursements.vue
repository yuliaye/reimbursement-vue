<template>
  <div>
    <topicsiderbar></topicsiderbar>
    <el-container>
      <el-header>
      </el-header>
      <el-container>
        <el-main>
          <ReimbursementForm
            title="Edit Reimbursements"
            :reimbursementId="$route.query.id"
            @submit="editReb"
          >
          </ReimbursementForm>
        </el-main>
        <el-aside width="180px">
          <Siderbar></Siderbar>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import topicsiderbar from '../../topicsiderbar.vue'
import Siderbar from '../Siderbar.vue'
import ReimbursementForm from './ReimbursementForm.vue'

export default {
  components: { topicsiderbar, Siderbar, ReimbursementForm },
  methods: {
    editReb(reimbursement) {
      this.$store.commit('editReimbursementDatas', reimbursement)
      this.$router.push({ path: '/reimbursements' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header, .el-aside, .el-footer {
  background-color: #E9EEF3;
}

.add-reimbursements {
  font-size: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E9EEF3;
}

.el-form {
  margin-top: 20px;
  border-bottom: 1px solid #E9EEF3;
}

.add-button {
  margin-top: 15px;
  margin-bottom: 30px;
}

.submit-cancle {
  background: #E9EEF3;
  width: 100%;
  height: 60px;
  button{
    padding: 6px;
    margin-top: 16px;
    margin-left: 50px;
  }
}
</style>

<style lang="scss">
  .amount-item {
    .el-form-item__content {
      display: flex;
      span {
        margin-left: 5px;
      }
    }
  }
</style>
