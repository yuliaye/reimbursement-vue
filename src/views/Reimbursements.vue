<template>
  <div>
    <topicsiderbar></topicsiderbar>
    <el-container>
      <el-header >
      </el-header>

      <el-container>
        <el-main>
          <div class="myreimbursements">
            My Reimbursements
          </div>

          <div class="topicButton">
            <el-button-group>
              <el-button type="primary" plain>1</el-button>
              <el-button type="primary" plain>2</el-button>
              <el-button type="primary" plain>Next></el-button>
              <el-button type="primary" plain>Last>></el-button>
            </el-button-group>
          </div>

          <div>
            <el-table
              :data="tableData"
              :stripe="true"
              class="table"
            >
              <el-table-column
                prop="sumbmitted_at"
                label="Submit Date"
                >
              </el-table-column>
              <el-table-column
                prop="amount"
                label="Amount"
                >
              </el-table-column>
              <el-table-column
                prop="subject_count"
                label="Count"
                >
              </el-table-column>
              <el-table-column
                prop="status"
                label="Status">
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">

                  <el-popover
                    placement="right"
                    width="350"
                    trigger="click">
                    <el-table :data="scope.row.items">
                      <el-table-column width="130" prop="date" label="Date"></el-table-column>
                      <el-table-column width="100" prop="amount" label="Amount"></el-table-column>
                      <el-table-column width="100" prop="usage" label="usage"></el-table-column>
                      <el-table-column width="100" prop="people_numbers" label="People"></el-table-column>
                      <el-table-column width="100" prop="description" label="Description"></el-table-column>
                    </el-table>
                    <button slot="reference">Review Detail</button>
                  </el-popover>

                  <template v-if="scope.row.status === 'pending'">
                    <button @click="toEdit(scope.row.id)">Edit</button>
                    <button @click="deleteButton(scope.row.id)">Delete</button>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>

        <el-aside width="180px">
          <Siderbar></Siderbar>
        </el-aside>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import topicsiderbar from '../topicsiderbar.vue'
import Siderbar from './Siderbar.vue'
export default {
  components: { topicsiderbar, Siderbar },

  computed: {
    tableData() {
      return this.$store.state.tableData
    }
  },

  methods: {
    toEdit(id) {
      this.$router.push({ path: '/reimbursements/edit', query: { id } })
    },
    deleteButton(id) {
      this.$store.commit('deleteItem', id)
    }
  }
}
// {
//   sumbmitted_at: DateTime,
//   status: "Pending" | "Paid",
//   amount: Number,
//   subject_count: Number,
//   items: [
//    {
//      date: Date,
//      amount: Number,
//      usage: "Lunch" | "Dinner" | "Taxi" | "Other",
//      people_numbers: Number(1-20),
//      description: String
//    }
//  ]
// }
</script>

<style lang="scss" scoped>
  .el-header{
    height: 40px!important;
  }
  .el-main{
    .myreimbursements{
      text-align: left;
      font-size: 20px;
    }
    .topicButton{
      height: 40px;
      text-align: right;
      background: #dde0e8;
      padding: 15px;
      margin: 20px 0;
    }
    .table{
      width: 100%;
    }
  }

.el-header, .el-footer {
    background-color: #dde0e8;
    color: #333;
    text-align: left;
    line-height: 30px;
  }

  .el-aside {
    background-color:#dde0e8;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 10px;
  }
</style>
