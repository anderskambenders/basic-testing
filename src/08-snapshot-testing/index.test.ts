import { generateLinkedList } from './index';

const values1 = ['node1', 'node2'];
const values2 = ['node1', 'node2', 'node3'];

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(values1);
    const expectedLinkedList = {
      value: 'node1',
      next: {
        value: 'node2',
        next: {
          value: null,
          next: null,
        },
      },
    };
    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(values2);
    expect(linkedList).toMatchSnapshot();
  });
});
