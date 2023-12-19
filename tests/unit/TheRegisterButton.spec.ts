import { shallowMount } from '@vue/test-utils'
import TheRegisterButton from '../../src/components/authentication/TheRegisterButton.vue'


jest.mock('axios')

describe('TheAuthButton.vue', () => {
  let wrapper: any

  beforeEach(() => {
   
    wrapper = shallowMount(TheRegisterButton, {
      
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    })
  })

  it('should render login button', () => {
    expect(wrapper.find('button').text()).toBe('Register')
  })

 
});