import React from 'react';
import { shallow } from 'enzyme';
import ErrorPanel from './ErrorPanel';

it('renders correctly when there is no error', () => {
  const wrapper = shallow(<ErrorPanel errorMessage={''} />);
  expect(wrapper.children().length).toEqual(0);
});

it('renders correctly when there is an error', () => {
  const errorMessage = 'My error message';
  const wrapper = shallow(<ErrorPanel errorMessage={errorMessage} />);
  expect(wrapper.find('span').length).toEqual(1);
  expect(wrapper.find('span').find('img').length).toEqual(1);
  expect(wrapper.find('img').prop('title')).toEqual(errorMessage);
});
