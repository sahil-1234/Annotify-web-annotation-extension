const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable cross-origin requests from the extension

// MongoDB connection
mongoose.connect("PUT MONGODB URI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Annotation Schema
const AnnotationSchema = new mongoose.Schema({
  url: String,
  annotations: Array,
  createdAt: { type: Date, default: Date.now }
});

const Annotation = mongoose.model("Annotation", AnnotationSchema);

// Route to save annotations
app.post("/annotations", async (req, res) => {
  const { url, annotations } = req.body;

  let annotation = await Annotation.findOne({ url });
  if (annotation) {
    annotation.annotations = annotations;
  } else {
    annotation = new Annotation({ url, annotations });
  }

  await annotation.save();
  res.send({ message: "Annotations saved successfully!" });
});

// Route to get annotations for a page
app.get("/annotations", async (req, res) => {
  const { url } = req.query;
  const annotation = await Annotation.findOne({ url });

  if (annotation) {
    res.json(annotation.annotations);
  } else {
    res.json([]);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
