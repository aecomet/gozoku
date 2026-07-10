import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PageHeader from '../src/components/PageHeader.vue';

describe('PageHeader', () => {
  test('renders props correctly', () => {
    const wrapper = mount(PageHeader, {
      props: {
        num: '01',
        en: 'About',
        ja: '概要',
        sub: 'セクション'
      }
    });

    expect(wrapper.text()).toContain('01');
    expect(wrapper.text()).toContain('About');
    expect(wrapper.text()).toContain('概要');
  });
});
