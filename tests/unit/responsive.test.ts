import { describe, expect, it, vi, afterEach } from 'vitest';
import { getDevice, isDisabled, getMobileAnim } from '../../src/core/responsive';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getDevice', () => {
  it('returns mobile when width < 768', () => {
    vi.stubGlobal('innerWidth', 500);
    expect(getDevice()).toBe('mobile');
  });

  it('returns tablet when width >= 768 and < 1024', () => {
    vi.stubGlobal('innerWidth', 800);
    expect(getDevice()).toBe('tablet');
  });

  it('returns desktop when width >= 1024', () => {
    vi.stubGlobal('innerWidth', 1200);
    expect(getDevice()).toBe('desktop');
  });
});

describe('isDisabled', () => {
  it('returns true when data-anim-disable matches device', () => {
    vi.stubGlobal('innerWidth', 500);
    const el = document.createElement('div');
    el.setAttribute('data-anim-disable', 'mobile');
    expect(isDisabled(el)).toBe(true);
  });

  it('returns false when data-anim-disable does not match device', () => {
    vi.stubGlobal('innerWidth', 1200);
    const el = document.createElement('div');
    el.setAttribute('data-anim-disable', 'mobile');
    expect(isDisabled(el)).toBe(false);
  });

  it('returns true when width is below pixel threshold', () => {
    vi.stubGlobal('innerWidth', 500);
    const el = document.createElement('div');
    el.setAttribute('data-anim-disable', '600');
    expect(isDisabled(el)).toBe(true);
  });

  it('returns false when no data-anim-disable', () => {
    const el = document.createElement('div');
    expect(isDisabled(el)).toBe(false);
  });
});

describe('getMobileAnim', () => {
  it('returns data-anim-mobile value on mobile', () => {
    vi.stubGlobal('innerWidth', 500);
    const el = document.createElement('div');
    el.setAttribute('data-anim-mobile', 'fadeIn');
    expect(getMobileAnim(el)).toBe('fadeIn');
  });

  it('returns null on desktop', () => {
    vi.stubGlobal('innerWidth', 1200);
    const el = document.createElement('div');
    el.setAttribute('data-anim-mobile', 'fadeIn');
    expect(getMobileAnim(el)).toBeNull();
  });
});
