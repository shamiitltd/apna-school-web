import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["image", "video", "pdf", "document", "audio", "other"],
      default: "image",
    },
    mimeType: {
      type: String,
      default: "image/png",
    },
    size: {
      type: Number,
      default: 0, // bytes
    },
    sizeFormatted: {
      type: String,
      default: "0 KB",
    },
    dimensions: {
      type: String,
      default: "1200 × 800",
    },
    duration: {
      type: String,
      default: "", // for videos e.g. "02:15"
    },
    uploadedBy: {
      type: String,
      default: "Admin",
    },
    usedInCount: {
      type: Number,
      default: 0,
    },
    altText: {
      type: String,
      default: "",
    },
    attachedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;
