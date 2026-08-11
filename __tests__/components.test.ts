import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PageHeader from '../src/components/PageHeader.vue';
import { i18n } from '../src/plugins/i18n.ts';

describe('PageHeader', () => {
  test('renders props correctly', () => {
    const wrapper = mount(PageHeader, {
      props: {
        num: '01',
        en: 'About',
        ja: '概要',
        sub: 'セクション'
      },
      global: { plugins: [i18n] }
    });

    expect(wrapper.text()).toContain('01');
    expect(wrapper.text()).toContain('About');
    expect(wrapper.text()).toContain('概要');
  });
});
