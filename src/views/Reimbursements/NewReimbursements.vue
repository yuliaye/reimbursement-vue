<template>
  <div>
    <topicsiderbar></topicsiderbar>
    <el-container>
      <el-header>
      </el-header>
      <el-container>
        <el-main>
          <ReimbursementForm title="Add Reimbursements" @submit="addReb"></ReimbursementForm>
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
    addReb(reimbursement) {
      this.$store.commit('reimbursementDatas', reimbursement)
      this.$router.push({ path: '/reimbursements' })
    }
  }
}
</script>

<style>

</style>
