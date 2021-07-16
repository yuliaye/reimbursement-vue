<template>
  <div>
    <div class="add-reimbursements">
      <b v-text="title"></b>
    </div>

     <el-form label-width="80px" v-for="(item,index) in list" :key="index" :rules="rules" :model="item" ref="forms">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item label="Date" prop="date">
              <el-col>
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="item.date" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-form-item label="Usage" prop="usage">
              <el-select v-model="item.usage">
                <el-option  v-for="option in usageOptions" :key="option" :label="option" :value="option"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-form-item label="Amount" class="amount-item" prop="amount">
              <el-input v-model.number="item.amount" placeholder="0.0"></el-input>
              <span>RMB</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-form-item label="People" prop="people_numbers">
              <el-select v-model.number="item.people_numbers">
                <el-option v-for="num in peopleNumber" :key="num" :label="num" :value="num"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button type="text" @click="removeButton(index)">Remove</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="activeName">
        <el-col :span="16">
          <el-form-item label="Description">
            <el-input v-model="item.description" placeholder="Please add description here..."></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="all-button">
      <button class="add-button" @click="addItem">Add Another Day</button>

      <div class="submit-cancle">
        <el-button type="success"  @click="submitForm">Submit</el-button>
        <el-button @click="cancleButton">Cancle</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// reimbursement structures
const reimbursement = {
  usage: '',
  date: '',
  amount: '',
  people_numbers: '',
  description: ''
}

export default {
  data() {
    return {
      usageOptions: ['Lunch', 'Dinner', 'Taxi', 'Other'],
      peopleNumber: 20,
      list: this.defaultList,
      rules: {
        date: [{ required: true, message: '请选择日期', trigger: ['change', 'blur'] }],
        usage: [{ required: true, message: '请选择内容', trigger: 'change' }],
        amount: [
          { required: true, message: '请输入金额', trigger: ['change', 'blur'] },
          { type: 'number', min: 0, message: '金额要大于0', trigger: ['change', 'blur'] }
        ],
        people: [{ type: 'number', required: true, message: '请选择人数', trigger: 'change' }]
      }
    }
  },

  props: {
    title: String,
    reimbursementId: String,
    defaultList: {
      type: Array,
      default: () => [{ ...reimbursement }]
    }
  },

  methods: {
    addItem() {
      this.list.push({ ...reimbursement })
    },
    removeButton(index) {
      this.list.splice(index, 1)
    },
    cancleButton() {
      this.$router.go(-1)
    },
    submitForm() {
      const collectValid = this.$refs.forms.map((form) => {
        let isValid = false
        form.validate(valid => { isValid = valid })
        return isValid
      })

      if (!collectValid.every(valid => valid)) {
        return false
      }

      var mydate = new Date()
      var fullTime = mydate.getFullYear() + '-' + mydate.getMonth() + 1 + '-' + mydate.getDate()
      var sum = 0
      this.list.forEach(function(item) {
        if (item.amount) {
          sum = sum + parseInt(item.amount)
        }
      })

      const reimbursement = {
        id: this.reimbursementId || Math.random().toString(36).substr(3, 5),
        sumbmitted_at: fullTime,
        amount: sum,
        subject_count: this.list.length,
        status: 'pending',
        items: [...this.list]
      }

      this.$emit('submit', reimbursement)
    }
  },

  created() {
    if (this.reimbursementId) {
      const reimbursement = this.$store.state.tableData.find(x => x.id === this.reimbursementId)

      if (reimbursement) {
        this.list = reimbursement.items
      }
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
  padding: 4px;
  border-radius: 5px;
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
