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
});