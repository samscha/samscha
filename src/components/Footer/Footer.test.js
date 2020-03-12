import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer.jsx';

describe(`Footer`, function() {
    const baseProps = {
        location: {
            pathname: '',
        },
    };
    const baseFooter = shallow(<Footer {...baseProps} />);
    it(`should render without errors`, function() {
        baseFooter;
    });
});
