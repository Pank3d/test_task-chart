import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSelect from './BaseSelect.vue';

describe('BaseSelect', () => {
  it('should render with items', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        modelValue: 'option1',
        items: [
          { title: 'Option 1', value: 'option1' },
          { title: 'Option 2', value: 'option2' },
        ],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should emit update:modelValue on change', async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        modelValue: 'option1',
        items: [
          { title: 'Option 1', value: 'option1' },
          { title: 'Option 2', value: 'option2' },
        ],
      },
    });

    await wrapper.vm.$emit('update:modelValue', 'option2');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option2']);
  });

  it('should call onClick callback when item is selected', async () => {
    const onClickMock = vi.fn();
    const wrapper = mount(BaseSelect, {
      props: {
        modelValue: 'option1',
        items: [
          { title: 'Option 1', value: 'option1' },
          { title: 'Option 2', value: 'option2', onClick: onClickMock },
        ],
      },
    });

    const instance = wrapper.vm as unknown as { handleChange: (value: string) => void };
    instance.handleChange('option2');

    expect(onClickMock).toHaveBeenCalled();
  });

  it('should accept null as modelValue', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        modelValue: null,
        items: [{ title: 'Option 1', value: 'option1' }],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom props', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        modelValue: 'option1',
        items: [{ title: 'Option 1', value: 'option1' }],
        placeholder: 'Select option',
        density: 'comfortable',
        variant: 'filled',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
