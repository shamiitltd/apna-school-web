import path from "path";
import fs from "fs";
import Media from "../models/Media.js";

// Format bytes helper
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

// Auto-seed initial media if collection is empty
const seedInitialMedia = async () => {
  try {
    const count = await Media.countDocuments();
    if (count === 0) {
      const initialMediaList = [
        {
          title: "study-habits-hero.png",
          filename: "study-habits-hero.png",
          url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/png",
          size: 1258291,
          sizeFormatted: "1.2 MB",
          dimensions: "1200 × 800",
          uploadedBy: "Admin",
          usedInCount: 3,
          altText: "Student with laptop studying diligently",
        },
        {
          title: "books-stack.png",
          filename: "books-stack.png",
          url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/png",
          size: 870400,
          sizeFormatted: "850 KB",
          dimensions: "1080 × 720",
          uploadedBy: "Admin",
          usedInCount: 2,
          altText: "Colorful stack of school books",
        },
        {
          title: "study-desk.jpg",
          filename: "study-desk.jpg",
          url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/jpeg",
          size: 1468006,
          sizeFormatted: "1.4 MB",
          dimensions: "1920 × 1080",
          uploadedBy: "Admin",
          usedInCount: 1,
          altText: "Modern student study desk with laptop and plant",
        },
        {
          title: "parent-support.png",
          filename: "parent-support.png",
          url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/png",
          size: 942080,
          sizeFormatted: "920 KB",
          dimensions: "1200 × 800",
          uploadedBy: "Admin",
          usedInCount: 2,
          altText: "Parents helping child with school learning",
        },
        {
          title: "teacher-tools.png",
          filename: "teacher-tools.png",
          url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/png",
          size: 798720,
          sizeFormatted: "780 KB",
          dimensions: "1200 × 800",
          uploadedBy: "Admin",
          usedInCount: 1,
          altText: "Teacher in modern classroom",
        },
        {
          title: "routine-clock.png",
          filename: "routine-clock.png",
          url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/png",
          size: 706560,
          sizeFormatted: "690 KB",
          dimensions: "800 × 800",
          uploadedBy: "Admin",
          usedInCount: 1,
          altText: "Time management clock for students",
        },
        {
          title: "idea-bulb.png",
          filename: "idea-bulb.png",
          url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/png",
          size: 524288,
          sizeFormatted: "512 KB",
          dimensions: "800 × 800",
          uploadedBy: "Admin",
          usedInCount: 3,
          altText: "Creative learning bulb idea illustration",
        },
        {
          title: "study-guide.pdf",
          filename: "study-guide.pdf",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          fileType: "pdf",
          mimeType: "application/pdf",
          size: 2202009,
          sizeFormatted: "2.1 MB",
          dimensions: "Document (PDF)",
          uploadedBy: "Admin",
          usedInCount: 1,
          altText: "Complete term study guide PDF",
        },
        {
          title: "tips-video.mp4",
          filename: "tips-video.mp4",
          url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
          fileType: "video",
          mimeType: "video/mp4",
          size: 14889779,
          sizeFormatted: "14.2 MB",
          dimensions: "1920 × 1080",
          duration: "02:15",
          uploadedBy: "Admin",
          usedInCount: 1,
          altText: "Short interactive video lesson for students",
        },
        {
          title: "classroom.png",
          filename: "classroom.png",
          url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/png",
          size: 1153433,
          sizeFormatted: "1.1 MB",
          dimensions: "1200 × 800",
          uploadedBy: "Admin",
          usedInCount: 2,
          altText: "Primary school empty classroom",
        },
        {
          title: "infographic.png",
          filename: "infographic.png",
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/png",
          size: 952320,
          sizeFormatted: "930 KB",
          dimensions: "1080 × 1920",
          uploadedBy: "Admin",
          usedInCount: 1,
          altText: "10 Habits for better learning infographic",
        },
        {
          title: "notes-cover.jpg",
          filename: "notes-cover.jpg",
          url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80",
          fileType: "image",
          mimeType: "image/jpeg",
          size: 1363148,
          sizeFormatted: "1.3 MB",
          dimensions: "1200 × 800",
          uploadedBy: "Admin",
          usedInCount: 1,
          altText: "Student taking handwritten notes in notebook",
        },
      ];

      await Media.insertMany(initialMediaList);
    }
  } catch (err) {
    console.error("seedInitialMedia error:", err);
  }
};

// ================= 1. GET ALL MEDIA WITH FILTERS & PAGINATION =================
export const getMedia = async (req, res) => {
  try {
    await seedInitialMedia();

    const {
      search,
      type = "All Types",
      post = "All Posts",
      date = "All Dates",
      sortBy = "Newest",
      page = 1,
      limit = 12,
    } = req.query;

    let query = {};

    // Search query
    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { filename: { $regex: search.trim(), $options: "i" } },
        { altText: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Type filter
    if (type && type !== "All Types") {
      const typeLower = type.toLowerCase();
      if (typeLower.includes("image")) query.fileType = "image";
      else if (typeLower.includes("video")) query.fileType = "video";
      else if (typeLower.includes("pdf") || typeLower.includes("document")) {
        query.fileType = { $in: ["pdf", "document"] };
      }
    }

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sortBy === "Oldest") sortOptions = { createdAt: 1 };
    else if (sortBy === "Title A-Z") sortOptions = { title: 1 };
    else if (sortBy === "Title Z-A") sortOptions = { title: -1 };
    else if (sortBy === "Largest") sortOptions = { size: -1 };
    else if (sortBy === "Smallest") sortOptions = { size: 1 };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));

    const [files, totalFiles] = await Promise.all([
      Media.find(query)
        .sort(sortOptions)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Media.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: files.length,
      total: totalFiles,
      totalPages: Math.ceil(totalFiles / limitNum) || 1,
      currentPage: pageNum,
      data: files,
    });
  } catch (error) {
    console.error("getMedia error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= 2. UPLOAD SINGLE / MULTIPLE MEDIA =================
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filesToProcess = req.files || [req.file];
    const createdMedia = [];

    for (const file of filesToProcess) {
      // Determine file type
      let fileType = "other";
      if (file.mimetype.startsWith("image/")) fileType = "image";
      else if (file.mimetype.startsWith("video/")) fileType = "video";
      else if (file.mimetype.includes("pdf")) fileType = "pdf";
      else if (file.mimetype.includes("document") || file.mimetype.includes("msword")) fileType = "document";

      const publicUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

      const newMedia = await Media.create({
        title: file.originalname,
        filename: file.filename,
        url: publicUrl,
        fileType,
        mimeType: file.mimetype,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
        dimensions: fileType === "image" ? "1200 × 800" : fileType === "video" ? "1920 × 1080" : "Document",
        uploadedBy: "Admin",
        altText: file.originalname.split(".")[0],
      });

      createdMedia.push(newMedia);
    }

    res.status(201).json({
      success: true,
      message: `${createdMedia.length} file(s) uploaded successfully`,
      data: createdMedia.length === 1 ? createdMedia[0] : createdMedia,
    });
  } catch (error) {
    console.error("uploadMedia error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= 3. GET SINGLE MEDIA =================
export const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }
    res.status(200).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= 4. UPDATE MEDIA DETAILS =================
export const updateMedia = async (req, res) => {
  try {
    const updatedMedia = await Media.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMedia) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }
    res.status(200).json({
      success: true,
      data: updatedMedia,
      message: "Media details updated",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ================= 5. DELETE SINGLE MEDIA =================
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    // Attempt to delete local file from uploads directory
    if (media.filename) {
      const filePath = path.join(process.cwd(), "uploads", media.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= 6. BULK DELETE MEDIA =================
export const bulkDeleteMedia = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No media IDs provided" });
    }

    const files = await Media.find({ _id: { $in: ids } });
    for (const f of files) {
      if (f.filename) {
        const filePath = path.join(process.cwd(), "uploads", f.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    const result = await Media.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} media file(s)`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
