import React from 'react';
import { mount } from 'enzyme';
let ViewportObserver;

describe('<ViewportObserver />', () => {
    describe('removeObserver', () => {
        beforeAll(() => {
            jest.resetModules();
            ViewportObserver = require('../ViewportObserver').default;
        });

        it('should call when observer exists', () => {
            const unobserve = jest.fn();
            const wrapper = mount(<ViewportObserver>{() => {}}</ViewportObserver>);

            expect(wrapper.instance().observer).toBe(null);

            wrapper.instance().observer = {
                unobserve
            };
            wrapper.instance().removeObserver();

            expect(unobserve.mock.calls.length).toBe(1);
            expect(wrapper.instance().observer).toBe(null);
        });
    });

    describe('IntersectionObserver NOT Supported', () => {
        beforeAll(() => {
            jest.resetModules();
            ViewportObserver = require('../ViewportObserver').default;
        });

        it('child function should return TRUE straight away', () => {
            const render = jest.fn();
            mount(<ViewportObserver>{render}</ViewportObserver>);

            expect(render).toHaveBeenCalledWith(true);
        });

        it('removeObserver is called on componentWillUnmount() when no observer', () => {
            const mockRemoveObserver = jest.fn();
            const wrapper = mount(<ViewportObserver>{() => {}}</ViewportObserver>);

            wrapper.instance().removeObserver = mockRemoveObserver;
            wrapper.unmount();
            expect(mockRemoveObserver.mock.calls.length).toBe(1);
        });

        it('should match snaphost', () => {
            const component = mount(<ViewportObserver>{() => {}}</ViewportObserver>);
            expect(component).toMatchSnapshot();
        });
    });

    describe('IntersectionObserver Supported', () => {
        beforeAll(() => {
            global.IntersectionObserver = jest.fn(() => ({ observe: jest.fn(), unobserve: jest.fn() }));
            global.IntersectionObserverEntry = { prototype: { intersectionRatio: {} } };

            jest.resetModules();
            ViewportObserver = require('../ViewportObserver').default;
        });

        it('should have observer', () => {
            const wrapper = mount(<ViewportObserver>{() => {}}</ViewportObserver>);
            expect(wrapper.instance().observer).toBeDefined();
        });

        it('child function should return FALSE straight away', () => {
            const render = jest.fn();
            mount(<ViewportObserver>{render}</ViewportObserver>);

            expect(render).toHaveBeenCalledWith(false);
        });

        it('child function should return TRUE after intersection and remove observer', () => {
            const render = jest.fn();
            const mockRemoveObserver = jest.fn();
            const wrapper = mount(<ViewportObserver>{render}</ViewportObserver>);
            wrapper.instance().removeObserver = mockRemoveObserver;

            expect(render).toHaveBeenCalledWith(false);

            wrapper.instance().isIntersecting([{ isIntersecting: true }], null);
            wrapper.update();
            expect(render).toHaveBeenCalledWith(true);

            expect(mockRemoveObserver.mock.calls.length).toBe(1);
        });

        it('should return call unobserve() when removeobserver() called', () => {
            const wrapper = mount(<ViewportObserver>{() => {}}</ViewportObserver>);

            const mockUnobserve = jest.fn();
            wrapper.instance().observer = {
                unobserve: mockUnobserve
            };

            wrapper.instance().isIntersecting([{ isIntersecting: true }], null);

            expect(mockUnobserve.mock.calls.length).toBe(1);
            expect(wrapper.instance().observer).toBe(null);
        });

        it('should NOT remove observer if intersection callback called and not intersecting', () => {
            const render = jest.fn();
            const mockRemoveObserver = jest.fn();
            const wrapper = mount(<ViewportObserver>{render}</ViewportObserver>);

            wrapper.instance().removeObserver = mockRemoveObserver;

            expect(render).toHaveBeenCalledWith(false);

            wrapper.instance().isIntersecting([{ isIntersecting: false }], null);
            expect(render).toHaveBeenCalledWith(false);

            expect(mockRemoveObserver.mock.calls.length).toBe(0);
        });

        it('should addObserver after this.reset() called', () => {
            const mockAddObserver = jest.fn();
            const wrapper = mount(<ViewportObserver restartObserver={false}>{() => {}}</ViewportObserver>);

            wrapper.instance().addObserver = mockAddObserver;

            wrapper.instance().reset();
            expect(mockAddObserver.mock.calls.length).toBe(1);
        });

        it('removeObserver is called on componentWillUnmount()', () => {
            const mockRemoveObserver = jest.fn();
            const wrapper = mount(<ViewportObserver>{() => {}}</ViewportObserver>);

            wrapper.instance().removeObserver = mockRemoveObserver;
            wrapper.unmount();
            expect(mockRemoveObserver.mock.calls.length).toBe(1);
        });

        it('should match snaphost', () => {
            const component = mount(<ViewportObserver>{() => {}}</ViewportObserver>);
            expect(component).toMatchSnapshot();
        });
    });
});
