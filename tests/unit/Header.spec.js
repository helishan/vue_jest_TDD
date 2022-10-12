import { shallowMount } from '@vue/test-utils'
import Header from '../../src/containers/components/Header/Header.vue'
import { findTestWrapper } from '../../src/utils/testUtils'

describe('Header', () => {
  it('要有 input 框', () => {
    const wrapper = shallowMount(Header)
    // 为了和逻辑解耦
    const input = findTestWrapper(wrapper, 'input')
    expect(input.exists()).toBe(true)
  })
  it('input 框初始内容为空', () => {
    const wrapper = shallowMount(Header)
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })
  it('input 框值发生变化，数据应该跟着变', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('dell lee')
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('dell lee')
  })
  it('input 框输入回车无内容时无反应', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })
  it('input 框输入回车有内容时向外触发事件', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('dell lee')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
  })
  it('input 框输入回车有内容时向外触发事件，同时清空input的值', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input').at(0)
    input.setValue('dell lee')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
    expect(wrapper.vm.inputValue).toBe('')
  })
  it('样式发生改变做提示', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper).toMatchSnapshot()
  })
})
/*
测试用例写的比真实代码多：复杂系统如果之前代码写得比较渣，会担心新的功能会影响老的功能；所以在加入新功能后替班
会对老功能进行大量的回归测试，会浪费很多书见；如果加入自动化测试，除了刚开始写的测试用例比较麻烦，但是后续加入新功能时
只需要运行测试代码，就能验证老功能的是否能正常运行，就节约了很多回归测试的时间
*/
