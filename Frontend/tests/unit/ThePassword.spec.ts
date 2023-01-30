import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ThePassword from '../../src/components/Authentication/ThePassword.vue';

describe('ThePassword component test', () => {
  
  it('sets the minimum length of the password to 8 characters', () => {
    const wrapper = shallowMount(ThePassword)
    const input = wrapper.find('input[type="password"]')
    expect(input.attributes().minlength).to.equal('8')
    expect(input.attributes().maxlength).to.equal('25')
  });

  it('displays an error message if the password is invalid', () => {
    const wrapper = shallowMount(ThePassword)
    wrapper.setValue('testp')
    wrapper.vm.validatePass()
    expect(wrapper.vm.passwordError).to.contain('Password may have between 8 and 25 characters')
  });
});