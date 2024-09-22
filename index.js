const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid input format",
    });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter(
    (item) => isNaN(item) && typeof item === "string"
  );

  const lowercaseAlphabets = alphabets.filter((char) => /^[a-z]$/.test(char));
  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
  res.status(200).json({
    is_success: true,
    user_id: "Akshika Singh_11062003",
    email: "ak5797@srmist.edu.in",
    roll_number: "RA2111043010036",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
