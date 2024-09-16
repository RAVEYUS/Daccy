import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';

// Simulate code execution and test cases checking
const checkCode = async (code: string, testCases: { input: string; expectedOutput: string }[]): Promise<boolean> => {
  try {
    // Save the code to a file for execution
    const filePath = './tmp_code_file.py'; // Adjust path and extension as needed
    await fs.writeFile(filePath, code);

    // Function to execute code and get output
    const executeCode = (input: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const process = spawn('python3', [filePath]);

        let output = '';
        let errorOutput = '';

        process.stdout.on('data', (data) => {
          output += data.toString();
        });

        process.stderr.on('data', (data) => {
          errorOutput += data.toString();
        });

        process.on('close', (code) => {
          if (code === 0) {
            resolve(output.trim());
          } else {
            reject(new Error(`Process exited with code ${code}: ${errorOutput}`));
          }
        });

        process.stdin.write(input);
        process.stdin.end();
      });
    };

    // Check output for all test cases
    const results = await Promise.all(testCases.map(async (testCase) => {
      try {
        const output = await executeCode(testCase.input);
        return output === testCase.expectedOutput;
      } catch {
        return false;
      }
    }));

    // Clean up the file
    await fs.unlink(filePath);

    // Return if all test cases pass
    return results.every(result => result);
  } catch (error) {
    console.error('Error during code checking:', error);
    return false;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { level, language, buggyCode, fixedCode, testCases } = await req.json();

    // Validate input
    if (!level || !language || !buggyCode || !fixedCode || !testCases || !Array.isArray(testCases)) {
      return NextResponse.json({ message: 'All fields are required and testCases should be an array' }, { status: 400 });
    }

    // Check the fixed code against the test cases
    const isCodeGood = await checkCode(fixedCode, testCases);

    return NextResponse.json({ isCodeGood });
  } catch (error) {
    console.error('Error checking code:', error);
    return NextResponse.json({ message: 'Error checking code' }, { status: 500 });
  }
}
