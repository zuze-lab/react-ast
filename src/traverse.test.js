import traverse from './traverse';

describe('traverse', () => {
  let spy;
  const testVal = [
    'a',
    {
      key: [
        'b',
        {
          someVal: {
            someKey: ['c', 'd', 'e']
          }
        }
      ]
    },
    'f',
    {
      g: 'h',
      i: ['j', 'k', 'l']
    }
  ];
  beforeEach(() => {
    spy = jest.fn();
  });

  it('should traverse null', () => {
    expect(traverse(null, spy)).toBe(null);
    expect(spy).toHaveBeenCalledWith(null, []);
  });

  it('should traverse undefined', () => {
    expect(traverse(undefined, spy)).toBe(undefined);
    expect(spy).toHaveBeenCalledWith(undefined, []);
  });

  it('should traverse a string', () => {
    const val = 'someString';
    expect(traverse(val, spy)).toBe(val);
    expect(spy).toHaveBeenCalledWith(val, []);
  });

  it('should traverse a number', () => {
    const val = 104;
    expect(traverse(val, spy)).toBe(val);
    expect(spy).toHaveBeenCalledWith(val, []);
  });

  it('should traverse a boolean', () => {
    const val = true;
    expect(traverse(val, spy)).toBe(val);
    expect(spy).toHaveBeenCalledWith(val, []);
  });

  it('should traverse an array (without mutating)', () => {
    const val = ['a', 'b', 'c'];
    expect(traverse(val, spy)).toBe(val);
  });

  it('should traverse an object (without mutating)', () => {
    const val = {
      a: 'b',
      c: 'd',
      e: 'f'
    };

    expect(traverse(val, spy)).toBe(val);
  });

  it('should deep traverse', () => {
    expect(traverse(testVal, spy)).toBe(testVal);

    // spy should have been called with all keys and all values
    expect(spy).toHaveBeenCalledWith(testVal, []);
    expect(spy).toHaveBeenCalledWith('a', [0]);
    expect(spy).toHaveBeenCalledWith(testVal[1], [1]);
    expect(spy).toHaveBeenCalledWith('key', [1]);
    expect(spy).toHaveBeenCalledWith(testVal[1].key, [1, 'key']);
    expect(spy).toHaveBeenCalledWith(testVal[1].key[0], [1, 'key', 0]);
    expect(spy).toHaveBeenCalledWith(testVal[1].key[1], [1, 'key', 1]);
    expect(spy).toHaveBeenCalledWith('someVal', [1, 'key', 1]);
    expect(spy).toHaveBeenCalledWith(testVal[1].key[1].someVal, [
      1,
      'key',
      1,
      'someVal'
    ]);

    expect(spy).toHaveBeenCalledWith('someKey', [1, 'key', 1, 'someVal']);
    expect(spy).toHaveBeenCalledWith(testVal[1].key[1].someVal.someKey, [
      1,
      'key',
      1,
      'someVal',
      'someKey'
    ]);

    expect(spy).toHaveBeenCalledWith('c', [
      1,
      'key',
      1,
      'someVal',
      'someKey',
      0
    ]);

    expect(spy).toHaveBeenCalledWith('d', [
      1,
      'key',
      1,
      'someVal',
      'someKey',
      1
    ]);

    expect(spy).toHaveBeenCalledWith('e', [
      1,
      'key',
      1,
      'someVal',
      'someKey',
      2
    ]);

    expect(spy).toHaveBeenCalledWith('f', [2]);
    expect(spy).toHaveBeenCalledWith(testVal[3], [3]);
    expect(spy).toHaveBeenCalledWith('g', [3]);
    expect(spy).toHaveBeenCalledWith('h', [3, 'g']);
    expect(spy).toHaveBeenCalledWith('i', [3]);
    expect(spy).toHaveBeenCalledWith('j', [3, 'i', 0]);
    expect(spy).toHaveBeenCalledWith('k', [3, 'i', 1]);
    expect(spy).toHaveBeenCalledWith('l', [3, 'i', 2]);
    expect(spy).toHaveBeenCalledTimes(23);
  });
});
