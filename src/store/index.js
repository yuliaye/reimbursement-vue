import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData: [
      {
        id: '1',
        sumbmitted_at: '2016-05-02',
        amount: '111',
        subject_count: '2',
        status: 'pending',
        items: [
          {
            date: '2016-05-02',
            amount: 111,
            usage: 'Lunch',
            people_numbers: 2,
            description: 'Test'
          },
          {
            date: '2016-05-20',
            amount: 112,
            usage: 'Lunch',
            people_numbers: 1,
            description: 'Test'
          }
        ]
      },
      {
        id: '2',
        sumbmitted_at: '2017-05-02',
        amount: '222',
        subject_count: '3',
        status: 'paid',
        items: [{
          date: '2017-05-02',
          amount: 435,
          usage: 'Dinner',
          people_numbers: 4,
          description: 'String'
        }]
      },
      {
        id: '3',
        sumbmitted_at: '2018-05-02',
        amount: '333',
        subject_count: '2',
        status: 'pending',
        items: [{
          date: '2018-05-02',
          amount: 45,
          usage: 'Taxi',
          people_numbers: 1,
          description: 'test'
        }]
      },
      {
        id: '4',
        sumbmitted_at: '2019-05-02',
        amount: '444',
        subject_count: '3',
        status: 'pending',
        items: [{
          date: '2019-05-02',
          amount: 99,
          usage: 'Other',
          people_numbers: 1,
          description: 'String'
        }]
      }
    ]
  },

  mutations: {
    reimbursementDatas(state, obj) {
      state.tableData.push(obj)
    },
    deleteItem(state, id) {
      state.tableData = state.tableData.filter(x => x.id !== id)
    },
    editReimbursementDatas(state, obj) {
      /* let oldReimbursement = state.tableData.find(x => x.id === obj.id)
      return oldReimbursement = obj */

      const index = state.tableData.findIndex(({ id }) => id === obj.id)

      if (index) {
        state.tableData[index] = obj
      }

      // state.tableData.forEach(function(item, idx) {
      //   if (item.id === obj.id) {
      //     state.tableData[idx] = obj
      //   }
      // })
    }
  },
  actions: {
  },
  modules: {
  }
})
