import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Extract Java class name
const extractClassName = (code) => {
  const match = code.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
  return match ? match[1] : "Main"; // ✅ Default to "Main"
};

const executeCode = (language, code, inputData = "") => {
  return new Promise((resolve, reject) => {
    let filePath = "";
    let command = "";

    if (language === "java") {
      const className = extractClassName(code);
      filePath = `/tmp/${className}.java`;

      // Step 1: Write Java code to a file
      fs.writeFile(filePath, code, (err) => {
        if (err) return reject(`File Write Error: ${err.message}`);

        console.log(`✅ Java File Created: ${filePath}`);

        // Step 2: Compile Java Code
        const compileCommand = `javac -d /tmp ${filePath}`;
        exec(
          compileCommand,
          { timeout: 5000 },
          (compileError, _, compileStderr) => {
            if (compileError) {
              console.error("❌ Compilation Failed:", compileStderr);
              return reject(`Compilation Error:\n${compileStderr}`);
            }

            console.log("✅ Compilation Successful! Running Java...");

            // Step 3: Ensure inputData is provided
            if (!inputData.trim()) {
              return reject(
                `Execution Error: No input provided, Scanner will fail.`
              );
            }

            // Step 4: Write input to a temporary file
            const inputFilePath = `/tmp/input.txt`;
            fs.writeFile(inputFilePath, inputData.trim(), (inputErr) => {
              if (inputErr)
                return reject(`Input File Write Error: ${inputErr.message}`);

              // Step 5: Execute Java with input redirection
              const runCommand = `java -cp /tmp ${className} < ${inputFilePath}`;
              exec(
                runCommand,
                { timeout: 5000 },
                (runError, runStdout, runStderr) => {
                  // Cleanup files after execution
                  fs.unlink(filePath, () => {});
                  fs.unlink(inputFilePath, () => {});

                  if (runError) {
                    console.error("❌ Execution Failed:", runStderr);
                    return reject(`Execution Error:\n${runStderr}`);
                  }

                  console.log("✅ Execution Output:", runStdout);
                  resolve(runStdout);
                }
              );
            });
          }
        );
      });
    } else {
      return reject("Error: Unsupported language.");
    }
  });
};

export default executeCode;
