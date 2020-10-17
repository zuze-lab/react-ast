import createResolver from './createResolver';

describe('createResolver', () => {
  it('should resolve', () => {
    const descriptor = { component: Symbol('a') };
    const spy = jest.fn(({ component }) => component);
    expect(createResolver(spy)(descriptor)).toBe(descriptor.component);
  });

  it('should cache', () => {
    const descriptor = { component: Symbol('a') };
    const spy = jest.fn(({ component }) => component);
    const resolver = createResolver(spy);
    const a = resolver(descriptor);
    const b = resolver(descriptor);
    const c = resolver({ ...descriptor });
    expect(a).toBe(b);
    expect(b).toBe(c);
    expect(spy).toHaveBeenCalledTimes(1);
    const d = resolver({ component: Symbol('a') });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(d).not.toBe(a);
  });

  it('should accept a custom cache function', () => {
    const spy = jest.fn(({ component }) => component);
    const resolver = createResolver(
      spy,
      ({ module, component }) => `${module}${component}`
    );

    const a = resolver({ component: 'div', module: 'a' });
    const b = resolver({ module: 'a', component: 'div' });
    const c = resolver({ module: 'b', component: 'div' });

    expect(a).toBe(b);
    expect(a).toBe(c); // still resolved to div
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
