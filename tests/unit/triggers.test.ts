import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { DataAnimElement } from '../../src/types';

// Mock observer module before importing triggers
vi.mock('../../src/core/observer', () => ({
  playAnimation: vi.fn(),
  resetAnimation: vi.fn(),
  createObserver: vi.fn(),
}));

import { setupTrigger } from '../../src/core/triggers';
import { playAnimation, createObserver } from '../../src/core/observer';

vi.stubGlobal('IntersectionObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
});

vi.stubGlobal('innerWidth', 1200);

function createElement(trigger?: string): DataAnimElement {
  const el = document.createElement('div') as DataAnimElement;
  el.setAttribute('data-anim', 'fadeIn');
  if (trigger) el.setAttribute('data-anim-trigger', trigger);
  return el;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('setupTrigger', () => {
  it('calls playAnimation for load trigger', () => {
    const el = createElement('load');
    setupTrigger(el);
    expect(playAnimation).toHaveBeenCalledWith(el);
  });

  it('calls createObserver for scroll trigger (default)', () => {
    const el = createElement();
    setupTrigger(el);
    expect(createObserver).toHaveBeenCalledWith(el);
  });

  it('attaches click handler that calls playAnimation', () => {
    const el = createElement('click');
    setupTrigger(el);
    expect(playAnimation).not.toHaveBeenCalled();
    el.dispatchEvent(new Event('click'));
    expect(playAnimation).toHaveBeenCalledWith(el);
  });

  it('attaches mouseenter handler for hover trigger', () => {
    const el = createElement('hover');
    setupTrigger(el);
    expect(playAnimation).not.toHaveBeenCalled();
    el.dispatchEvent(new Event('mouseenter'));
    expect(playAnimation).toHaveBeenCalledWith(el, true);
  });
});
