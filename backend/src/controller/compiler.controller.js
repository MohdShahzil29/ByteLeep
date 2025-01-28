import {
  generateArrayTestCase,
  generateLinkedListTestCase,
  generateStackTestCase,
  generateQueueTestCase,
  generateBinaryTreeTestCase,
  generateHeapTestCase,
  generateHashTableTestCase,
  generateQuickSortTestCase,
  generateBinarySearchTestCase,
  generateNPCompletenessTestCase,
} from "../utils/testCaseGenerators.js";

// Function to run user code (simplified simulation)
const runCode = (code, language) => {
  return new Promise((resolve, reject) => {
    // Here you should integrate code execution using tools like Docker or a code execution API
    resolve("Sample output for test case"); // Placeholder
  });
};

// Main function to compile code and generate tests
export const compileCode = async (req, res) => {
  const { code, language, problemType } = req.body;

  if (!code || !language || !problemType) {
    return res
      .status(400)
      .json({ error: "Code, language, and problem type are required." });
  }

  let testCases = [];
  switch (problemType) {
    case "array":
      testCases = generateArrayTestCase();
      break;
    case "linkedList":
      testCases = generateLinkedListTestCase();
      break;
    case "stack":
      testCases = generateStackTestCase();
      break;
    case "queue":
      testCases = generateQueueTestCase();
      break;
    case "binaryTree":
      testCases = generateBinaryTreeTestCase();
      break;
    case "heap":
      testCases = generateHeapTestCase();
      break;
    case "hashTable":
      testCases = generateHashTableTestCase();
      break;
    case "quickSort":
      testCases = generateQuickSortTestCase();
      break;
    case "binarySearch":
      testCases = generateBinarySearchTestCase();
      break;
    case "npCompleteness":
      testCases = generateNPCompletenessTestCase();
      break;
    default:
      return res.status(400).json({ error: "Invalid problem type." });
  }

  // Simulate running the code for each test case
  try {
    const outputs = await Promise.all(
      testCases.map((testCase) => runCode(code, language))
    );
    res.status(200).json({
      message: "Code executed successfully",
      testCases: testCases.map((tc, idx) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        userOutput: outputs[idx],
        isTestPassed: outputs[idx] === tc.expectedOutput,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
