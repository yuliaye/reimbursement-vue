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
            <div>
              <el-input v-model="input" placeholder="请输入搜索内容" style="width: 180px;margin-right: 15px;"></el-input>
            </div>
            <el-pagination
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="tableData.length"
              @current-change="handlePaginate"
              :current-page.sync='currentPage'
            >
            </el-pagination>
          </div>
          <div>
            <el-table
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :stripe="true"
              class="table"
              :default-sort = "defaultSort"
              @sort-change="sortChange"
              @filter-change="filterChange"
            >
              <el-table-column
                prop="sumbmitted_at"
                label="Submit Date"
                sortable="custom"
                >
              </el-table-column>
              <el-table-column
                prop="amount"
                label="Amount"
                sortable="custom"
                >
              </el-table-column>
              <el-table-column
                prop="subject_count"
                label="Count"
                sortable="custom"
                >
              </el-table-column>
              <el-table-column
                prop="status"
                label="Status"
                column-key="status"
                :filters="statusFilters"
                >
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
import { orderBy } from 'lodash'
import topicsiderbar from '../topicsiderbar.vue'
import Siderbar from './Siderbar.vue'
export default {
  data() {
    return {
      pageSize: 2,
      currentPage: 1,
      defaultSort: { prop: 'sumbmitted_at', order: 'descending' },
      currentSort: null,
      statusFilters: [{ text: 'pending', value: 'pending' }, { text: 'paid', value: 'paid' }],
      currentFilters: null,
      input: ''
    }
  },

  components: { topicsiderbar, Siderbar },

  computed: {
    tableData() {
      let data = this.$store.state.tableData

      if (this.currentFilters) {
        for (const column in this.currentFilters) {
          const filterValues = this.currentFilters[column]
          if (filterValues.length > 0) {
            data = data.filter(row => filterValues.includes(row[column]))
          }
        }
      }

      if (this.input !== '') {
        data = data.filter(row => row.items.some((value) => {
          return value.description.includes(this.input)
        }))
      }

      const { prop, order } = this.currentSort || this.defaultSort
      return orderBy(data, prop, order === 'ascending' ? 'asc' : 'desc')
    }
  },

  methods: {
    toEdit(id) {
      this.$router.push({ path: '/reimbursements/edit', query: { id } })
    },
    deleteButton(id) {
      this.$store.commit('deleteItem', id)
    },
    filterChange(filters) {
      this.currentPage = 1
      this.currentFilters = filters
    },
    handlePaginate(currentPage) {
      this.currentPage = currentPage
    },
    sortChange({ column, prop, order }) {
      this.currentPage = 1

      if (order) {
        this.currentSort = { prop, order }
      } else {
        this.currentSort = null
      }
    },
    backLogin() {
      this.$router.push({ path: '/login' })
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
      background: #dde0e8;
      padding: 15px;
      margin: 20px 0;
      display: flex;
      justify-content:space-between;
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
