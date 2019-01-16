import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import JinderProfileImage from "../Components/JinderProfileImage";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('JinderProfileImage', () => {
  describe('when imageUrl is not null', () => {
    it('should render the profile image', () => {
      const wrapper = mount(
        <JinderProfileImage imageUrl="http://dummyString" />
      );
      expect(wrapper.contains(<img src="http://dummyString" />)).toEqual(true);
      wrapper.unmount();
    });
  });

  describe('when imageUrl is null', () => {
    it('should render an explainer paragraph tag', () => {
      const wrapper = mount(
        <JinderProfileImage imageUrl={null}/>
      );
      expect(wrapper.contains(<p>No profile image</p>)).toEqual(true);
      wrapper.unmount();
    });
  });
});