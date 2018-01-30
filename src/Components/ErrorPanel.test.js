import React from 'react';
import { shallow } from 'enzyme';
import ErrorPanel from './ErrorPanel';

it('renders correctly when there is no error', () => {
  const wrapper = shallow(<ErrorPanel errorMessage={''} />);
  expect(wrapper.children()).toHaveLength(0);
});

it('renders correctly when there is an error', () => {
  const errorMessage = 'My error message';
  const wrapper = shallow(<ErrorPanel errorMessage={errorMessage} />);
  expect(wrapper.find('span')).toHaveLength(1);
  expect(wrapper.find('span').find('img')).toHaveLength(1);
  expect(wrapper.find('img').prop('title')).toBe(errorMessage);
});
