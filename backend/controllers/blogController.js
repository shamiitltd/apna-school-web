import BlogPost from "../models/BlogPost.js";

export const getBlogs = async (req, res) => {
    try{
        const {category, search, page = 1, limit = 6} = req.query;

        let query = {};

        if (category && category !== "All Posts") {
            const cleanCat = category.replace("For ", "").trim();
            query.category = { $regex: cleanCat, $options: "i"}
        }
        
        if (search) {
            query.$or = [
                {title: {$regex: search, $options: "i"}},
                {description: {$regex: search, $options: "i"}},
                
            ]
        }

        const blogs = await BlogPost.find(query).sort({createdAt: -1})
                            .skip((Number(page) - 1) * Number(limit))
                            .limit(Number(limit));

        const totalBlogs = await BlogPost.countDocuments(query);

        res.status(200).json({
            success: true,
            count: blogs.length,
            total: totalBlogs,
            totalPages: Math.ceil(totalBlogs/limit),
            currentPage: Number(page),
            data: blogs,
        });
    } catch(error) {
        res.status(500).json({success: false, message: error.message})
    };
};

export const getPopularBlogs = async (req, res) => {
    try{
        const popularBlogs = await BlogPost.find({isPopular: true}).sort({views: -1}).limit(3);

        if (popularBlogs.length === 0) {
            const fallbackBlogs = await BlogPost.find().sort({views: -1}).limit(3);

            return res.status(200).json({success: true, data: fallbackBlogs});
        }
        
        res.status(200).json({success: true, data: popularBlogs});

    }catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const getCategoryCounts = async (req, res) => {
    try {
        const totalCount = await BlogPost.countDocuments();
        const parentsCount = await BlogPost.countDocuments({ category: { $regex: "Parents", $options: "i" } });
        const studentsCount = await BlogPost.countDocuments({ category: { $regex: "Students", $options: "i" } });
        const teachersCount = await BlogPost.countDocuments({ category: { $regex: "Teachers", $options: "i" } });
        const productUpdatesCount = await BlogPost.countDocuments({ category: { $regex: "Product Updates", $options: "i" } });
        const tipsGuidesCount = await BlogPost.countDocuments({ category: { $regex: "Tips", $options: "i" } });

        res.status(200).json({
            success: true,
            data: {
                "All Posts": totalCount,
                "For Parents": parentsCount,
                "For Students": studentsCount,
                "For Teachers": teachersCount,
                "Product Updates": productUpdatesCount,
                "Tips & Guides": tipsGuidesCount,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFeaturedBlog = async (req, res) => {
    try{
        let featured = await BlogPost.findOne({isFeatured: true});
        if (!featured) {
            featured = await BlogPost.findOne().sort({createdAt: -1});
        }
        res.status(200).json({success: true, data: featured});
    } catch(error) {
        res.status(500).json({success: false, message: error.message});
    }
};

export const getBlogById = async (req, res) => {
    try{
        const blog = await BlogPost.findById(req.params.id);

        if(!blog) {
            return res.status(404).json({success: false, message: "Blog not found"});
        }
        blog.views +=1;
        await blog.save();

        res.status(200).json({success: true, data: blog});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

export const createBlog = async (req, res) => {
    try{
        const newBlog = await BlogPost.create(req.body);
        res.status(201).json({success: true, data:newBlog});
    } catch(error){
        res.status(400).json({success: false, message: error.message});
    }
};

export const deleteBlog = async (req, res) => {
    try{
        const blog = await BlogPost.findByIdAndDelete(req.params.id);
        if (!blog){
            return res.status(404).json({success: false, message: "Blog not found"});
        }
        res.status(200).json({success: true, message: "Blog deleted successfully"});
    }catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};