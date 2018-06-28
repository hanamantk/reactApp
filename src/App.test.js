import React from 'react';
import App from './App';
import {shallow, mount} from 'enzyme';

describe('test app compo length',()=>{
  it('renders 1 app',()=>{
    const component=shallow(<App />);
    expect(1).toEqual(1);
  })
})

describe('click test',()=>{
  it('show loadding status when button clicked',()=>{
    const component=mount(<App />);
    const button=component.find("DefaultButton");
          button.simulate('click');
       expect(component.state().imageLoad).toEqual("Loading...")   
  })
})