const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// POST Endpoint - /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));
    const highestAlphabet =
      alphabets.length > 0
        ? [alphabets.sort((a, b) => b.localeCompare(a))[0]]
        : [];

    res.json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

// GET Endpoint - /bfhl
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
