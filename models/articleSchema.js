import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String },
  slug: { type: String },
  description: { type: String },
  image: { type: String }, // Store image URL properly
  author: { type: String },
  subtitle: { type: String },
  content: { type: String },
  subtitles: [{ type: String }],  // Changed from `subtitle` to `subtitles` (Array)
  contents: [{ type: String }],  // Changed from `subtitle` to `subtitles` (Array)
  selectedCategory:{type:String},
  createdAt: { type: Date, default: Date.now },
});

// ✅ Export as default
const Article = mongoose.model("Article", ArticleSchema);
export default Article;
