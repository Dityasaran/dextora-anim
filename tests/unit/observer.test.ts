import { describe, expect, it, vi, beforeEach } from 'vitest';
import { playAnimation, resetAnimation } from '../../src/core/observer';
import { animationMap } from '../../src/animations/index';
import type { DataAnimElement } from '../../src/types';

// Mock IntersectionObserver
vi.stubGlobal('IntersectionObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
});

function createElement(attrs: Record<string, string> = {}): DataAnimElement {
  const el = document.createElement('div') as DataAnimElement;
  el.setAttribute('data-anim', 'fadeIn');
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
  // Ensure innerWidth is set for responsive checks
  vi.stubGlobal('innerWidth', 1200);
  return el;
}

describe('playAnimation', () => {
  it('sets animation style with correct format', () => {
    const el = createElement();
    playAnimation(el);
    expect(el.style.animation).toContain('da-fadeIn');
    expect(el.style.animation).toContain('1600ms');
    expect(el.style.animation).toContain('both');
  });

  it('applies custom duration, easing, and delay', () => {
    const el = createElement({
      'data-anim-duration': '800',
      'data-anim-easing': 'spring',
      'data-anim-delay': '200',
    });
    playAnimation(el);
    expect(el.style.animation).toContain('800ms');
    expect(el.style.animation).toContain('cubic-bezier(0.175,0.885,0.32,1.275)');
    expect(el.style.animation).toContain('200ms');
  });

  it('uses fill:none and negative delay for hover', () => {
    const el = createElement();
    playAnimation(el, true);
    expect(el.style.animation).toContain('none');
    expect(el.style.animation).toContain('-100ms');
  });

  it('sets --da-distance when data-anim-distance is set', () => {
    const el = createElement({ 'data-anim-distance': '80' });
    playAnimation(el);
    expect(el.style.getPropertyValue('--da-distance')).toBe('80');
  });

  it('does nothing for unknown animation name', () => {
    const el = createElement({ 'data-anim': 'nonexistent' });
    playAnimation(el);
    expect(el.style.animation).toBe('');
  });
});

describe('resetAnimation', () => {
  it('clears animation and re-applies initialStyle', () => {
    const el = createElement();
    playAnimation(el);
    resetAnimation(el);
    expect(el.style.animation).toBe('none');
    expect(el.style.opacity).toBe('0');
  });

  it('only clears animation for hover reset', () => {
    const el = createElement();
    playAnimation(el, true);
    resetAnimation(el, true);
    expect(el.style.animation).toBe('none');
  });
});
