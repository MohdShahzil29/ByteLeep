// ----------------- Data Structures -----------------

// Arrays Test Case Generator
export const generateArrayTestCase = (size = 10) => {
  // Test case 1: Random array
  const array1 = Array.from({ length: size }, () =>
    Math.floor(Math.random() * 100)
  );
  // Test case 2: Sorted array
  const array2 = Array.from({ length: size }, (_, i) => i + 1);
  // Test case 3: Reverse sorted array
  const array3 = Array.from({ length: size }, (_, i) => size - i);

  return [
    { input: array1, expectedOutput: array1.sort((a, b) => a - b) },
    { input: array2, expectedOutput: array2 },
    { input: array3, expectedOutput: array3.reverse() },
  ];
};

// Linked Lists Test Case Generator
export const generateLinkedListTestCase = (size = 5) => {
  // Test case 1: Normal linked list
  const list1 = Array.from({ length: size }, (_, i) => i + 1);
  // Test case 2: Empty linked list
  const list2 = [];
  // Test case 3: Linked list with duplicates
  const list3 = Array.from({ length: size }, (_, i) => i % 2);

  return [
    { input: list1, expectedOutput: list1 },
    { input: list2, expectedOutput: list2 },
    { input: list3, expectedOutput: list3 },
  ];
};

// Stacks Test Case Generator
export const generateStackTestCase = () => {
  // Test case 1: Normal stack
  const stack1 = Array.from({ length: 10 }, (_, i) => i);
  // Test case 2: Empty stack
  const stack2 = [];
  // Test case 3: Stack with duplicates
  const stack3 = [1, 1, 2, 3, 5];

  return [
    { input: stack1, expectedOutput: stack1.reverse() },
    { input: stack2, expectedOutput: stack2 },
    { input: stack3, expectedOutput: stack3.reverse() },
  ];
};

// Queues Test Case Generator
export const generateQueueTestCase = () => {
  // Test case 1: Normal queue
  const queue1 = Array.from({ length: 10 }, (_, i) => i);
  // Test case 2: Empty queue
  const queue2 = [];
  // Test case 3: Queue with negative numbers
  const queue3 = [-1, -2, -3, -4, -5];

  return [
    { input: queue1, expectedOutput: queue1.slice(1) }, // Simulate dequeue
    { input: queue2, expectedOutput: queue2 },
    { input: queue3, expectedOutput: queue3.slice(1) }, // Simulate dequeue
  ];
};

// Trees Test Case Generator
export const generateBinaryTreeTestCase = () => {
  // Test case 1: Balanced binary tree
  const tree1 = {
    root: 1,
    left: { root: 2, left: null, right: null },
    right: { root: 3, left: null, right: null },
  };
  // Test case 2: Unbalanced binary tree
  const tree2 = {
    root: 1,
    left: { root: 2, left: { root: 4, left: null, right: null }, right: null },
    right: null,
  };
  // Test case 3: Tree with only one node
  const tree3 = { root: 1, left: null, right: null };

  return [
    { input: tree1, expectedOutput: [1, 2, 3] },
    { input: tree2, expectedOutput: [1, 2, 4] },
    { input: tree3, expectedOutput: [1] },
  ];
};

// Heaps Test Case Generator
export const generateHeapTestCase = () => {
  // Test case 1: Min heap
  const heap1 = [1, 3, 5, 7, 9, 2, 4, 6, 8, 0];
  // Test case 2: Max heap
  const heap2 = [9, 7, 5, 3, 1, 8, 4, 2, 6, 0];
  // Test case 3: Empty heap
  const heap3 = [];

  return [
    { input: heap1, expectedOutput: heap1.sort((a, b) => a - b) },
    { input: heap2, expectedOutput: heap2.sort((a, b) => b - a) },
    { input: heap3, expectedOutput: heap3 },
  ];
};

// Hash Tables Test Case Generator
export const generateHashTableTestCase = () => {
  // Test case 1: Normal hash table
  const hashTable1 = new Map();
  for (let i = 0; i < 10; i++) {
    hashTable1.set(i, `value${i}`);
  }
  // Test case 2: Empty hash table
  const hashTable2 = new Map();
  // Test case 3: Hash table with duplicate values
  const hashTable3 = new Map();
  for (let i = 0; i < 5; i++) {
    hashTable3.set(i, `value${i % 2}`);
  }

  return [
    { input: hashTable1, expectedOutput: Array.from(hashTable1.entries()) },
    { input: hashTable2, expectedOutput: [] },
    { input: hashTable3, expectedOutput: Array.from(hashTable3.entries()) },
  ];
};

// ----------------- Algorithms -----------------

// Sorting Algorithms Test Case Generator (QuickSort)
export const generateQuickSortTestCase = (size = 10) => {
  // Test case 1: Normal array
  const array1 = Array.from({ length: size }, () =>
    Math.floor(Math.random() * 100)
  );
  // Test case 2: Sorted array
  const array2 = Array.from({ length: size }, (_, i) => i);
  // Test case 3: Reverse sorted array
  const array3 = Array.from({ length: size }, (_, i) => size - i);

  return [
    { input: array1, expectedOutput: array1.sort((a, b) => a - b) },
    { input: array2, expectedOutput: array2 },
    { input: array3, expectedOutput: array3.reverse() },
  ];
};

// Binary Search Test Case Generator
export const generateBinarySearchTestCase = (size = 10, target) => {
  // Test case 1: Array with target present
  const array1 = Array.from({ length: size }, (_, i) => i);
  const index1 = array1.indexOf(target);
  // Test case 2: Array without target
  const array2 = Array.from({ length: size }, (_, i) => i);
  const index2 = -1; // target not present
  // Test case 3: Empty array
  const array3 = [];
  const index3 = -1;

  return [
    { input: array1, target: target, expectedOutput: index1 },
    { input: array2, target: target, expectedOutput: index2 },
    { input: array3, target: target, expectedOutput: index3 },
  ];
};

// ----------------- Advanced Topics -----------------

// NP-Completeness Test Case Generator (Knapsack Problem)
export const generateNPCompletenessTestCase = () => {
  // Test case 1: Standard knapsack
  const weights1 = [10, 20, 30];
  const values1 = [60, 100, 120];
  const maxWeight1 = 50;
  // Test case 2: Max weight too low
  const weights2 = [10, 20, 30];
  const values2 = [60, 100, 120];
  const maxWeight2 = 20;
  // Test case 3: No items
  const weights3 = [];
  const values3 = [];
  const maxWeight3 = 50;

  return [
    {
      input: { weights: weights1, values: values1, maxWeight: maxWeight1 },
      expectedOutput: 220,
    },
    {
      input: { weights: weights2, values: values2, maxWeight: maxWeight2 },
      expectedOutput: 160,
    },
    {
      input: { weights: weights3, values: values3, maxWeight: maxWeight3 },
      expectedOutput: 0,
    },
  ];
};

// Caesar Cipher Test Case Generator
export const generateCaesarCipherTestCase = () => {
  // Test case 1: Regular shift
  const text1 = "HELLO";
  const shift1 = 3;
  const expectedOutput1 = "KHOOR";
  // Test case 2: Negative shift
  const text2 = "HELLO";
  const shift2 = -3;
  const expectedOutput2 = "EBIIL";
  // Test case 3: Large shift
  const text3 = "HELLO";
  const shift3 = 30; // Equivalent to a shift of 4
  const expectedOutput3 = "LIPPS";

  return [
    { input: { text: text1, shift: shift1 }, expectedOutput: expectedOutput1 },
    { input: { text: text2, shift: shift2 }, expectedOutput: expectedOutput2 },
    { input: { text: text3, shift: shift3 }, expectedOutput: expectedOutput3 },
  ];
};
