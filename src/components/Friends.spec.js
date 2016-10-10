import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Friends from './Friends';

describe('Friends', () => {
  it('should accept input', () => {
     const wrapper = mount(<Friends/>);
     const input = wrapper.find('input')[0];
     input.simulate('change', { target: { value: 'Joe' } })
     expect(wrapper.state('filteredUsers')).to.have.length()
  })
})
