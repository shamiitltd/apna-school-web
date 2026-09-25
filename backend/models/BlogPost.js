import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        content: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: [
                "All Posts",
                "For Parents",
                "For Students",
                "For Teachers",
                "Product Updates",
                "Tips & Guides",
                "Study Tips",
                "Productivity",
                "Exams",
                "Career",
            ],
            default: "Tips & Guides",
        },
        image: {
            type: String,
            default: ""
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isPopular: {
            type: Boolean,
            default: false,
        },
        author: {
            name: {
                type: String,
                default: "Admin",
            },
            publishedAt: {
                type: String,
                default: () => new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                })
            },
            readTime: {
                type: Number,
                default: 4,
            },
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
export default BlogPost;