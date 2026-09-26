import mongoose from "mongoose";

const blogViewSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    referrer: {
      type: String,
      default: "direct",
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for fast date-range aggregation
blogViewSchema.index({ viewedAt: 1 });

const BlogView = mongoose.model("BlogView", blogViewSchema);
export default BlogView;
