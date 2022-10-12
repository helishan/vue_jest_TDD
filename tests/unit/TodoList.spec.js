import { shallowMount } from '@vue/test-utils'
import TodoList from '../../src/containers/TodoList/TodoList.vue'
// import Header from '../../src/components/Header/Header.vue'
import UndoList from '../../src/containers/components/UndoList/UndoList.vue'
describe('TodoList', () => {
  it('初始化时，undoList 应该为空', () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.vm.undoList
    expect(undoList).toEqual([])
  })
  it('执行 addUndoItem 事件时，会增加一个内容', () => {
    // 集成测试
    // const wrapper = shallowMount(TodoList)
    // const header = wrapper.findComponent(Header)
    // header.vm.$emit('add', 'dell lee')
    // const undoList = wrapper.vm.$data.undoList
    // expect(undoList).toEqual(['dell lee'])
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{
        status: 'div', value: 1
      },
      {
        status: 'div', value: 2
      },
      {
        status: 'div', value: 3
      }]
    })
    wrapper.vm.addUndoItem(4)
    expect(wrapper.vm.undoList).toEqual([{
      status: 'div', value: 1
    },
    {
      status: 'div', value: 2
    },
    {
      status: 'div', value: 3
    },
    {
      status: 'div', value: 4
    }])
  })
  it('调用 undolist, 应该传递 list 参数', () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.findComponent(UndoList)
    const list = undoList.props('list')
    expect(list).toBeTruthy()
  })
  it('handleDeleteItem 方法被调用时，列表 UndoList 内容会减一', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{
        status: 'div', value: 1
      },
      {
        status: 'div', value: 2
      },
      {
        status: 'div', value: 3
      }]
    })
    wrapper.vm.handleDeleteItem(1)
    expect(wrapper.vm.$data.undoList).toEqual([{
      status: 'div', value: 1
    },
    {
      status: 'div', value: 3
    }])
  })
  it('changeStatus 方法被调用时，列表 UndoList 内容变化', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{
        status: 'div', value: 1
      },
      {
        status: 'div', value: 2
      },
      {
        status: 'div', value: 3
      }]
    })
    wrapper.vm.changeStatus(1)
    expect(wrapper.vm.$data.undoList).toEqual([{
      status: 'div', value: 1
    },
    {
      status: 'input', value: 2
    },
    {
      status: 'div', value: 3
    }])
  })
  it('resetStatus 方法被调用时，列表 UndoList 内容重置', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{
        status: 'div', value: 1
      },
      {
        status: 'input', value: 2
      },
      {
        status: 'div', value: 3
      }]
    })
    wrapper.vm.resetStatus()
    expect(wrapper.vm.$data.undoList).toEqual([{
      status: 'div', value: 1
    },
    {
      status: 'div', value: 2
    },
    {
      status: 'div', value: 3
    }])
  })
  it('changeValue 方法被调用时，列表 UndoList 内容变化', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [{
        status: 'div', value: 1
      },
      {
        status: 'input', value: 2
      },
      {
        status: 'div', value: 3
      }]
    })
    wrapper.vm.changeValue({ value: '444', index: 1 })
    expect(wrapper.vm.undoList).toEqual([{
      status: 'div', value: 1
    },
    {
      status: 'input', value: '444'
    },
    {
      status: 'div', value: 3
    }])
  })
})
