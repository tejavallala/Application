const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 4000;

const upload = multer({
  limits: { fileSize: 1024 * 1024 * 2 },
});

app.use(cors());
app.use(express.json());

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", upload.single("file"), (req, res) => {
  const { data } = JSON.parse(req.body.data);

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

  let fileDetails = {
    is_file_valid: false,
  };

  if (req.file) {
    const { mimetype, size } = req.file;
    fileDetails = {
      is_file_valid: true,
      mime_type: mimetype,
      size_kb: (size / 1024).toFixed(2),
    };
  }

  res.status(200).json({
    is_success: true,
    user_id: "",
    email: "",
    roll_number: "",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file: fileDetails,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
