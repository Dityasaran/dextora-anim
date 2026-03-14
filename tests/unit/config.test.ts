import { describe, expect, it } from 'vitest';
import { DEFAULTS, easings, breakpoints } from '../../src/core/config';

describe('DEFAULTS', () => {
  it('has expected values', () => {
    expect(DEFAULTS.offset).toBe(0.2);
    expect(DEFAULTS.duration).toBe(1600);
    expect(DEFAULTS.easing).toMatch(/^cubic-bezier/);
  });
});

describe('easings', () => {
  it('contains all preset names', () => {
    expect(easings).toHaveProperty('ease');
    expect(easings).toHaveProperty('ease-out-expo');
    expect(easings).toHaveProperty('ease-out-back');
    expect(easings).toHaveProperty('spring');
  });

  it('all values are cubic-bezier strings', () => {
    for (const value of Object.values(easings)) {
      expect(value).toMatch(/^cubic-bezier/);
    }
  });
});

describe('breakpoints', () => {
  it('has mobile and tablet values', () => {
    expect(breakpoints.mobile).toBe(768);
    expect(breakpoints.tablet).toBe(1024);
  });
});
