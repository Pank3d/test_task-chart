import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePeriodFilter } from './usePeriodFilter';

describe('usePeriodFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with "all" preset', () => {
    const { state } = usePeriodFilter();

    expect(state.preset).toBe('all');
    expect(state.dateRange.start).toBeNull();
    expect(state.dateRange.end).toBeNull();
  });

  it('should set today preset', () => {
    const { setPreset, state } = usePeriodFilter();

    setPreset('today');

    expect(state.preset).toBe('today');
    expect(state.dateRange.start).toBeInstanceOf(Date);
    expect(state.dateRange.end).toBeInstanceOf(Date);
  });

  it('should set week preset', () => {
    const { setPreset, state } = usePeriodFilter();

    setPreset('week');

    expect(state.preset).toBe('week');
    expect(state.dateRange.start).toBeInstanceOf(Date);
    expect(state.dateRange.end).toBeInstanceOf(Date);
  });

  it('should set month preset', () => {
    const { setPreset, state } = usePeriodFilter();

    setPreset('month');

    expect(state.preset).toBe('month');
    expect(state.dateRange.start).toBeInstanceOf(Date);
    expect(state.dateRange.end).toBeInstanceOf(Date);
  });

  it('should call onCustomClick when custom preset is selected', () => {
    const onCustomClick = vi.fn();
    const { setPreset } = usePeriodFilter(onCustomClick);

    setPreset('custom');

    expect(onCustomClick).toHaveBeenCalled();
  });

  it('should set custom range', () => {
    const { setCustomRange, state } = usePeriodFilter();
    const start = new Date('2024-01-01');
    const end = new Date('2024-01-31');

    setCustomRange({ start, end });

    expect(state.preset).toBe('pickedCustom');
    expect(state.dateRange.start).toBeInstanceOf(Date);
    expect(state.dateRange.end).toBeInstanceOf(Date);
  });

  it('should format date range', () => {
    const { setPreset, formattedRange } = usePeriodFilter();

    setPreset('today');

    expect(formattedRange.value).toBeTruthy();
    expect(typeof formattedRange.value).toBe('string');
  });

  it('should return "Все данные" for all preset', () => {
    const { formattedRange } = usePeriodFilter();

    expect(formattedRange.value).toBe('Все данные');
  });

  it('should update presets when custom range is picked', () => {
    const { setCustomRange, presets } = usePeriodFilter();
    const start = new Date('2024-01-01');
    const end = new Date('2024-01-31');

    setCustomRange({ start, end });

    const hasPickedCustomItem = presets.value.some((p) => p.value === 'pickedCustom');
    expect(hasPickedCustomItem).toBe(true);
  });

  it('should reset hasPickedCustom when selecting non-custom preset', () => {
    const { setCustomRange, setPreset, presets } = usePeriodFilter();
    const start = new Date('2024-01-01');
    const end = new Date('2024-01-31');

    setCustomRange({ start, end });
    setPreset('today');

    const hasPickedCustomItem = presets.value.some((p) => p.value === 'pickedCustom');
    expect(hasPickedCustomItem).toBe(false);
  });
});
