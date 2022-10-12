import { shallowMount } from '@vue/test-utils'
import UndoList from '../../src/containers/components/UndoList/UndoList.vue'
import { findTestWrapper } from '../../src/utils/testUtils'
describe('UndoList', () => {
  it('参数为[], count 值应该为 0, 且列表无内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [] }
    })
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'item')
    expect(countElem.at(0).text()).toEqual('0')
    expect(listItems.length).toEqual(0)
  })
  it('参数为[1,2,3], count 值应该为 3, 且列表有内容,且存在删除按钮', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [{
          status: 'div', value: 1
        },
        {
          status: 'div', value: 2
        },
        {
          status: 'div', value: 3
        }]
      }
    })
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'item')
    const deleteBtns = findTestWrapper(wrapper, 'delete')
    expect(countElem.at(0).text()).toEqual('3')
    expect(listItems.length).toEqual(3)
    expect(deleteBtns.length).toEqual(3)
  })
  it('删除按钮被点击时，向外触发事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [{
          status: 'div', value: 1
        },
        {
          status: 'div', value: 2
        },
        {
          status: 'div', value: 3
        }]
      }
    })
    const deleteBtn = findTestWrapper(wrapper, 'delete').at(1)
    deleteBtn.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
    expect(wrapper.emitted().delete[0][0]).toBe(1)
  })
  it('列表项被点击时，向外触发 changeStatus 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [{
          status: 'div', value: 1
        },
        {
          status: 'div', value: 2
        },
        {
          status: 'div', value: 3
        }]
      }
    })
    const deleteBtn = findTestWrapper(wrapper, 'item').at(1)
    deleteBtn.trigger('click')
    expect(wrapper.emitted().changeStatus).toBeTruthy()
    expect(wrapper.emitted().changeStatus[0][0]).toBe(1)
  })
  it('列表项被点击时，显示输入框，两个正常内容,值要等于当前内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [{
          status: 'div', value: 1
        },
        {
          status: 'input', value: 2
        },
        {
          status: 'div', value: 3
        }]
      }
    })
    const input = findTestWrapper(wrapper, 'input')
    expect(input.at(0).element.value).toBe('2')
    expect(input.length).toBe(1)
  })
  it('列表项失去焦点时，向外触发 resetStatus 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [{
          status: 'div', value: 1
        },
        {
          status: 'input', value: 2
        },
        {
          status: 'div', value: 3
        }]
      }
    })
    const inputEle = findTestWrapper(wrapper, 'input').at(0)
    inputEle.trigger('blur')
    expect(wrapper.emitted().resetStatus).toBeTruthy()
  })
  it('列表项变化时，向外触发 changeValue 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [{
          status: 'div', value: 1
        },
        {
          status: 'input', value: 123
        },
        {
          status: 'div', value: 3
        }]
      }
    })
    const inputEle = findTestWrapper(wrapper, 'input').at(0)
    inputEle.trigger('change')
    expect(wrapper.emitted().changeValue).toBeTruthy()
    expect(wrapper.emitted().changeValue[0][0]).toEqual({
      value: '123',
      index: 1
    })
  })
})
