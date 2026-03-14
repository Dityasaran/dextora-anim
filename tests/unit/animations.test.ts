import { describe, expect, it } from 'vitest';
import { allAnimations, animationMap, getKeyframesCSS } from '../../src/animations/index';

const expectedNames = [
  'fadeIn',
  'fadeOut',
  'fadeInUp',
  'fadeInDown',
  'fadeInLeft',
  'fadeInRight',
  'slideInUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'zoomIn',
  'zoomOut',
  'zoomInUp',
  'zoomInDown',
  'bounce',
  'bounceIn',
  'bounceInUp',
  'bounceInDown',
  'shake',
  'pulse',
  'wobble',
  'flip',
  'swing',
  'rubberBand',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'blur',
  'clipReveal',
  'typewriter',
];

describe('animationMap', () => {
  it('contains all 30 animations', () => {
    expect(animationMap.size).toBe(30);
  });

  it('has every expected animation name', () => {
    for (const name of expectedNames) {
      expect(animationMap.has(name), `missing: ${name}`).toBe(true);
    }
  });

  it('has no duplicates', () => {
    expect(animationMap.size).toBe(allAnimations.length);
  });
});

describe('animation definitions', () => {
  it('fadeIn has initialStyle opacity:0', () => {
    expect(animationMap.get('fadeIn')?.initialStyle).toBe('opacity:0');
  });

  it('attention animations have no initialStyle', () => {
    for (const name of ['shake', 'pulse', 'wobble', 'flip', 'swing', 'rubberBand']) {
      expect(animationMap.get(name)?.initialStyle).toBeUndefined();
    }
  });

  it('bounce has no initialStyle (in-place animation)', () => {
    expect(animationMap.get('bounce')?.initialStyle).toBeUndefined();
  });
});

describe('getKeyframesCSS', () => {
  it('returns a string containing all @keyframes', () => {
    const css = getKeyframesCSS();
    for (const name of expectedNames) {
      expect(css, `missing keyframes for ${name}`).toContain(`@keyframes da-${name}`);
    }
  });
});
