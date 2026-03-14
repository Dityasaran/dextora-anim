import { describe, expect, it } from 'vitest';
import { applyStagger } from '../../src/core/stagger';

function createStaggerDOM(count: number, interval: string, from?: string): HTMLElement {
  const parent = document.createElement('div');
  parent.setAttribute('data-anim-stagger', interval);
  if (from) parent.setAttribute('data-anim-stagger-from', from);
  for (let i = 0; i < count; i++) {
    const child = document.createElement('div');
    child.setAttribute('data-anim', 'fadeInUp');
    parent.appendChild(child);
  }
  return parent;
}

function getDelays(parent: HTMLElement): string[] {
  return Array.from(parent.querySelectorAll<HTMLElement>('[data-anim]')).map(
    (el) => el.style.animationDelay,
  );
}

describe('applyStagger', () => {
  it('applies incremental delays from start', () => {
    const parent = createStaggerDOM(3, '100');
    applyStagger(parent);
    expect(getDelays(parent)).toEqual(['0ms', '100ms', '200ms']);
  });

  it('applies reverse delays from end', () => {
    const parent = createStaggerDOM(3, '100', 'end');
    applyStagger(parent);
    expect(getDelays(parent)).toEqual(['200ms', '100ms', '0ms']);
  });

  it('applies delays from center', () => {
    const parent = createStaggerDOM(5, '100', 'center');
    applyStagger(parent);
    expect(getDelays(parent)).toEqual(['200ms', '100ms', '0ms', '100ms', '200ms']);
  });

  it('applies delays from edges', () => {
    const parent = createStaggerDOM(5, '100', 'edges');
    applyStagger(parent);
    expect(getDelays(parent)).toEqual(['0ms', '100ms', '200ms', '100ms', '0ms']);
  });

  it('adds stagger delay to existing data-anim-delay', () => {
    const parent = createStaggerDOM(3, '100');
    const secondChild = parent.querySelectorAll('[data-anim]')[1];
    secondChild.setAttribute('data-anim-delay', '500');
    applyStagger(parent);
    const delays = getDelays(parent);
    expect(delays[1]).toBe('600ms'); // 500 + 1 * 100
  });
});
