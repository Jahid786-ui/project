import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState(null);

  const backendUrl = "https://your-backend-url.com/bfhl"; // Replace with your actual backend URL

  // Set page title as roll number
  useEffect(() => {
    document.title = "ABCD123"; // Replace with your actual roll number
  }, []);

  // Handle JSON input change
  const handleChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedData = JSON.parse(jsonInput); // Validate JSON
      const res = await axios.post(backendUrl, parsedData);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON input. Please check your format.");
    }
  };

  // Dropdown options
  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">BFHL Challenge</h1>

      <textarea
        className="border p-2 w-full max-w-lg h-32"
        placeholder='Enter JSON like { "data": ["A", "1", "B"] }'
        value={jsonInput}
        onChange={handleChange}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {response && (
        <div className="mt-4 w-full max-w-lg">
          <Select
            options={options}
            isMulti
            onChange={setSelectedFilters}
            placeholder="Filter Response"
          />

          <div className="bg-white p-4 mt-2 border rounded shadow">
            <h2 className="text-lg font-semibold">Response</h2>
            {selectedFilters.length === 0 && (
              <pre>{JSON.stringify(response, null, 2)}</pre>
            )}

            {selectedFilters.map((filter) => (
              <div key={filter.value}>
                <h3 className="font-bold mt-2">{filter.label}:</h3>
                <p>{JSON.stringify(response[filter.value] || "N/A")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
