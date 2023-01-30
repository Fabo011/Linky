import { shallowMount } from '@vue/test-utils'
import TheLoginButton from '../../src/components/Authentication/TheLoginButton.vue'


jest.mock('axios')

describe('TheAuthButton.vue', () => {
  let wrapper: any

  beforeEach(() => {
   
    wrapper = shallowMount(TheLoginButton, {
      
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    })
  })

  it('should render login button', () => {
    expect(wrapper.find('button').text()).toBe('Login')
  })

 
});
