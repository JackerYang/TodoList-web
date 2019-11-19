import { shallowMount } from '@vue/test-utils'

describe('Main.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Home, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
