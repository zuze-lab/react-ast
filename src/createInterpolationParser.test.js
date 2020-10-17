import createInterpolationParser from './createInterpolationParser';

describe('interpolation parser', () => {
  const pattern = /\{\{(.+?)\}\}/g;
  const context = {
    a: 'b',
    c: {
      d: 'test'
    },
    e: [1, 2, 3]
  };

  it('should interpolate an object', () => {
    const spy = jest.fn(() => context);
    const parse = createInterpolationParser(pattern, spy)();
    const parsed = parse({ key: '{{a}}', untouched: 'value' });
    expect(parsed).toEqual({
      key: 'b',
      untouched: 'value'
    });
  });
});
