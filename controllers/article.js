import Article from "../models/articleSchema.js"; // Ensure correct path

// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single article by ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new article
export const createArticle = async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging log
    const newArticle = new Article(req.body);
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Update an article
const API_URL = "";

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const articleData = req.body; // Ensure only body data is passed

    const updatedArticle = await Article.findByIdAndUpdate(id, articleData, { new: true });

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an article
export const deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const addNameAndIntro = async (req, res) => {
  try {
    const { slug } = req.params;
    const { subtitle, content } = req.body;

    if (!subtitle || !content) {
      return res.status(400).json({ message: "Name and Intro are required." });
    }

    const article = await Article.findOne({ slug });

    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    // Initialize arrays if they don't exist
    if (!article.subtitles) article.subtitles = [];
    if (!article.contents) article.contents = [];

    // Append new values
    article.subtitles.push(subtitle);
    article.contents.push(content);

    await article.save();

    res.status(200).json({ message: "Name and Intro added successfully!", article });
  } catch (error) {
    console.error("Error in addNameAndIntro:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Fetch articles by selected category
export const getArticlesByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase(); // Convert to lowercase
    const articles = await Article.find({ selectedCategory: { $regex: new RegExp("^" + category + "$", "i") } });

    if (!articles.length) {
      return res.status(404).json({ message: "No articles found for this category." });
    }

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


