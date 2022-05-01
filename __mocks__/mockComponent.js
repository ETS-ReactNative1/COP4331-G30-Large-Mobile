/*
  @flow
  @providesModule mockComponent
*/
import React from 'react';

export default function mockComponent(name) {
  return (props) => React.createElement(name, props, props.children);
}