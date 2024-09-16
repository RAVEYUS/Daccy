// app/pages/code/page.tsx
'use client';

import { useState } from 'react';

const GenerateAndCheckBuggyCodePage = () => {
  const [level, setLevel] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [buggyCode, setBuggyCode] = useState<string>('');
  const [fixedCode, setFixedCode] = useState<string>('');
  const [testCases, setTestCases] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!level || !language) {
      setError('Please select both level and language.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-buggy-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate buggy code');
      }

      const data = await response.json();
      setBuggyCode(data.buggyCode);
      setTestCases(['test1', 'test2']); // Example test cases; in a real app, these should come from your backend
    } catch (err) {
      console.error('Detailed error:', err);
      setError('An error occurred while generating the buggy code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckCode = async () => {
    if (!fixedCode || !testCases.length) {
      setError('Please provide fixed code and test cases.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/check-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, language, buggyCode, fixedCode, testCases }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check code');
      }

      const data = await response.json();
      setResult(data.isCodeGood ? 'Good' : 'Code did not pass the test cases');
    } catch (err) {
      console.error('Detailed error:', err);
      setError('An error occurred while checking the code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Generate and Check Buggy Code</h1>
      
      <div className="mb-4">
        <label htmlFor="level" className="block mb-2 text-sm font-medium">Select Difficulty Level:</label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select Level --</option>
          <option value="intermediate">Intermediate</option>
          <option value="beginner">Beginner</option>
          <option value="master">Master</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="language" className="block mb-2 text-sm font-medium">Select Programming Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select Language --</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>
      
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Buggy Code
      </button>

      {loading && <p className="mt-4 text-blue-500">Generating...</p>}

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {buggyCode && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Generated Buggy Code:</h2>
          <pre className="bg-gray-100 p-4 border rounded">{buggyCode}</pre>
        </div>
      )}

      {buggyCode && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Fix the Buggy Code:</h2>
          <textarea
            value={fixedCode}
            onChange={(e) => setFixedCode(e.target.value)}
            rows={10}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCheckCode}
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Check Fixed Code
          </button>
        </div>
      )}

      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Result:</h2>
          <p className={result === 'Good' ? 'text-green-500' : 'text-red-500'}>{result}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateAndCheckBuggyCodePage;
