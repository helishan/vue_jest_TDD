<template>
  <div>
    <Header @add="addUndoItem"></Header>
    <UndoList :list="undoList" @delete="handleDeleteItem" @changeStatus="changeStatus" @resetStatus="resetStatus" @changeValue="changeValue"></UndoList>
  </div>
</template>

<script>
import Header from '../components/Header/Header.vue'
import UndoList from '../components/UndoList/UndoList.vue'

export default {
  name: 'TodoList',
  components: { Header, UndoList },
  data () {
    return {
      undoList: [
      ]
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push({ status: 'div', value: inputValue })
    },
    handleDeleteItem (index) {
      this.undoList.splice(index, 1)
    },
    changeStatus (index) {
      const newList = []
      this.undoList.forEach((item, itemIndex) => {
        if (itemIndex === index) {
          newList.push({ status: 'input', value: item.value })
        } else {
          newList.push({ status: 'div', value: item.value })
        }
      })
      this.undoList = newList
    },
    resetStatus () {
      const newList = []
      this.undoList.forEach((item) => {
        newList.push({ status: 'div', value: item.value })
      })
      this.undoList = newList
    },
    changeValue ({ value, index }) {
      const newList = []
      this.undoList.forEach((item, itemIndex) => {
        if (itemIndex === index) {
          newList.push({ status: 'input', value: value })
        } else {
          newList.push({ status: 'div', value: item.value })
        }
      })
      this.undoList = newList
    }
  }
}
</script>
<style scoped lang="stylus">
</style>
