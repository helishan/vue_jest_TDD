<template>
  <div class="undoList">
    <div  class="title">
      正在进行
      <span data-test="count" class="count">{{list.length}}</span></div>
    <ul class="list">
      <li class="item" v-for="(item,index) in list" :key="index" data-test="item"
      @click="() => {changeStatus(index)}">
      <input class="user-input" v-if="item.status === 'input'" data-test="input" :value="item.value" @blur="resetStatus" @change="(e) => {changeValue(e.target.value, index) }">
      <span v-else>{{item.value}}</span>
      <span data-test="delete" @click="() => {handleDelete(index)}" class="delete"> - </span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UndoList',
  props: {
    list: Array
  },
  data () {
    return {
    }
  },
  methods: {
    handleDelete (index) {
      this.$emit('delete', index)
    },
    changeStatus (index) {
      this.$emit('changeStatus', index)
    },
    resetStatus () {
      this.$emit('resetStatus')
    },
    changeValue (value, index) {
      this.$emit('changeValue', { value, index })
    }
  }
}
</script>
<style scoped lang="stylus">
.undoList {
  width: 600px;
  margin: 0 auto;
}
.title {
  line-height: 30px;
  font-size: 24px;
  font-weight:bold;
  margin: 10px 0;
}
.count{
  float: right;
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: #E6E6E6;
  border-radius: 10px;
  color: #000;
  margin-top: 5px;
  font-size: 12px;
}
.item {
  line-height: 32px;
  font-size: 14px;
  background: #fff;
  border-left: 5px solid #629A9A;
  border-radius: 3px;
  margin-bottom: 10px;
  text-indent: 10px
}
.list {
  list-style-type: none;
}
.delete {
  float: right;
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: #E6E6E6;
  border-radius: 10px;
  color: #000;
  margin-top: 5px;
  font-size: 12px;
  text-indent: 0;
  margin-right: 10px;
  cursor: pointer;
}
.user-input{
  height: 22px;
  text-indent: 10px;
  width: 460px
}
</style>
