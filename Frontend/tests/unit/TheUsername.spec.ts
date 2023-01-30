import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import TheUsername from '../../src/components/Authentication/TheUsername.vue';

describe('TheUsername component test', () => {

  it('should render a username input with a minimum length of 4 and a maximum length of 12 characters', () => {
    const wrapper = shallowMount(TheUsername)
    const input = wrapper.find('input[type="text"]')
    expect(input.attributes().minlength).to.equal('4')
    expect(input.attributes().maxlength).to.equal('12')
  });

  it('should display an error message if the username characters is invalid', () => {
    const wrapper = shallowMount(TheUsername)
    wrapper.setValue('John@@11')
    wrapper.vm.validate()
    expect(wrapper.vm.usernameError).to.contain('Don`t use special characters. Correct example: John122')
  });

});

