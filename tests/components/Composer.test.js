import React from 'react';
import { shallow, mount } from 'enzyme';
import Composer from '../../src/components/Composer';


const types = {
    NAV_BAR: 'NAV_BAR',
    NAV_ITEM: 'NAV_ITEM'
};

const NavBar = (props) => {return <ul>{props.children}</ul>};
const NavItem = (props) => {return <li><a href={props.path}>{props.name}</a></li>};

const schema = {
    types: {},
    root: {
        type: types.NAV_BAR,
        allowedChildNodes: [
            {type: types.NAV_ITEM}
        ]
    }
};
schema.types[types.NAV_BAR] = {component: NavBar};
schema.types[types.NAV_ITEM] = {component: NavItem};

const value = {
    id: 'nav_bar',
    type: types.NAV_BAR,
    children: [
        {
            type: types.NAV_ITEM,
            id: 'about',
            props: {name: 'About', path: '/about'}
        },
        {
            type: types.NAV_ITEM,
            id: 'test',
            props: {name: 'Test', path: '/test'}
        },
    ]
};

const TestNavBarMenu = () => {return <Composer schema={schema} value={value} />};


describe('<Composer />', () => {

    it('can render', () => {
        const wrapper = mount(<TestNavBarMenu />);
        expect(wrapper.html()).toBe('<ul><li><a href="/about">About</a></li><li><a href="/test">Test</a></li></ul>');
    });

});


