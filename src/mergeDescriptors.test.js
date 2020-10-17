import mergeDescriptors from './mergeDescriptors';

describe('mergeDescriptors', () => {
  const first = {
    component: 'div',
    props: {
      a: 'b',
      l: 'm'
    },
    children: ['c', 'd', 'e']
  };

  const second = {
    component: 'span',
    props: {
      f: 'g'
    },
    styles: ['some array'],
    key: 10,
    children: ['h', 'i', 'j']
  };

  const third = {
    styles: {},
    props: {
      a: 'e'
    }
  };

  it('should work', () => {
    expect(mergeDescriptors()).toEqual({});
  });

  it('should return the same reference', () => {
    expect(mergeDescriptors(first)).toBe(first);
  });

  it('should shallow merge at props key', () => {
    expect(mergeDescriptors(first, second, third)).toStrictEqual(
      expect.objectContaining({
        props: {
          a: 'e',
          f: 'g',
          l: 'm'
        }
      })
    );
  });

  it('should shallow merge everything else', () => {
    expect(mergeDescriptors(first, second, third)).toStrictEqual(
      expect.objectContaining({
        component: 'span',
        styles: {},
        key: 10,
        children: ['h', 'i', 'j']
      })
    );
  });
});
