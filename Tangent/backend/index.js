const express = require("express");

const app = express();

app.get("/api/random", (req, res) => {
  res.json({
    title: "The Moon",
    summary:
      "The Moon is Earth's only natural satellite and the fifth-largest satellite in the Solar System.",
    image: "https://picsum.photos/600/400",
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});