import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Eye,
  Send,
  Save,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo2,
  Redo2,
  RemoveFormatting,
  Minus,
  Table as TableIcon,
  Maximize2,
  Minimize2,
  Clock,
  User,
  Tag,
  FileText,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Layers,
  UploadCloud,
  FolderOpen,
} from "lucide-react";
import heroAvatar from "../../assets/hero-avatar-blog.png";

export const CreateBlog = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const coverFileInputRef = useRef(null);
  const editorImageFileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const categories = [
    "For Students",
    "For Parents",
    "For Teachers",
    "Product Updates",
    "Tips & Guides",
    "Study Tips",
    "Productivity",
    "Exams",
    "Career",
  ];

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "For Students",
    image: "",
    status: "Published",
    isFeatured: false,
    isPopular: false,
    authorName: "Admin",
    readTime: 4,
    publishedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Editor specific state
  const [editorMode, setEditorMode] = useState("visual"); // "visual" | "html"
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showMediaLibraryPicker, setShowMediaLibraryPicker] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState("cover"); // "cover" | "editor"
  const [mediaLibraryFiles, setMediaLibraryFiles] = useState([]);
  const [loadingMediaLibrary, setLoadingMediaLibrary] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Sidebar accordions
  const [openSections, setOpenSections] = useState({
    status: true,
    category: true,
    image: true,
    excerpt: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Fetch blog data if editing
  useEffect(() => {
    if (!id) return;

    const fetchSingleBlog = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${API_URL}/blogs/${id}`);
        const data = await res.json();

        if (data.success && data.data) {
          const b = data.data;
          setFormData({
            title: b.title || "",
            description: b.description || "",
            content: b.content || "",
            category: b.category || "For Students",
            image: b.image || "",
            status: b.status || "Published",
            isFeatured: Boolean(b.isFeatured),
            isPopular: Boolean(b.isPopular),
            authorName: b.author?.name || "Admin",
            readTime: b.author?.readTime || 4,
            publishedAt:
              b.author?.publishedAt ||
              new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
          });

          if (editorRef.current && b.content) {
            editorRef.current.innerHTML = b.content;
          }
        }
      } catch (err) {
        console.error("Error fetching blog for editing:", err);
        setError("Could not load blog details.");
      } finally {
        setFetching(false);
      }
    };

    fetchSingleBlog();
  }, [id, API_URL]);

  // Sync contentEditable when switched back to Visual mode
  useEffect(() => {
    if (editorMode === "visual" && editorRef.current) {
      if (editorRef.current.innerHTML !== formData.content) {
        editorRef.current.innerHTML = formData.content || "";
      }
    }
  }, [editorMode, formData.content]);

  // Fetch Media Library for picker modal
  const openMediaPicker = async (target = "cover") => {
    setMediaPickerTarget(target);
    setShowMediaLibraryPicker(true);
    try {
      setLoadingMediaLibrary(true);
      const res = await fetch(`${API_URL}/media?limit=24&type=Images`);
      const data = await res.json();
      if (data.success) {
        setMediaLibraryFiles(data.data || []);
      }
    } catch (err) {
      console.error("Error loading media picker:", err);
    } finally {
      setLoadingMediaLibrary(false);
    }
  };

  const handleSelectMediaItem = (item) => {
    if (mediaPickerTarget === "cover") {
      handleChange("image", item.url);
    } else {
      const imgHtml = `<figure class="my-6"><img src="${item.url}" alt="${item.altText || item.title}" class="rounded-2xl max-w-full h-auto mx-auto shadow-md" /><figcaption class="text-center text-xs text-slate-400 mt-2 italic">${item.altText || item.title}</figcaption></figure><p><br/></p>`;
      insertCustomHTML(imgHtml);
    }
    setShowMediaLibraryPicker(false);
  };

  // Direct file upload for cover or editor image
  const handleDirectUpload = async (file, target = "cover") => {
    if (!file) return;

    try {
      setUploadingImage(true);
      const uploadData = new FormData();
      uploadData.append("files", file);

      const res = await fetch(`${API_URL}/media/upload`, {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.success && data.data) {
        const uploadedUrl = Array.isArray(data.data) ? data.data[0].url : data.data.url;
        if (target === "cover") {
          handleChange("image", uploadedUrl);
        } else {
          const imgHtml = `<figure class="my-6"><img src="${uploadedUrl}" alt="${file.name}" class="rounded-2xl max-w-full h-auto mx-auto shadow-md" /><figcaption class="text-center text-xs text-slate-400 mt-2 italic">${file.name}</figcaption></figure><p><br/></p>`;
          insertCustomHTML(imgHtml);
        }
      } else {
        setError(data.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setError("Error uploading image to server");
    } finally {
      setUploadingImage(false);
      if (coverFileInputRef.current) coverFileInputRef.current.value = "";
      if (editorImageFileInputRef.current) editorImageFileInputRef.current.value = "";
    }
  };

  // Handle Form Change
  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "content") {
        const words = value.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
        updated.readTime = Math.max(1, Math.ceil(words / 180));
      }
      return updated;
    });
    if (error) setError("");
  };

  // ContentEditable Input handler
  const handleContentInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      handleChange("content", html);
    }
  };

  // Execute formatting command in Visual Mode
  const executeCommand = (command, value = null) => {
    if (editorMode !== "visual") return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleContentInput();
    }
  };

  // Format block
  const formatBlock = (tag) => {
    if (editorMode !== "visual") return;
    document.execCommand("formatBlock", false, `<${tag}>`);
    if (editorRef.current) {
      editorRef.current.focus();
      handleContentInput();
    }
  };

  // Insert Custom Element
  const insertCustomHTML = (htmlToInsert) => {
    if (editorMode === "visual") {
      executeCommand("insertHTML", htmlToInsert);
    } else {
      handleChange("content", formData.content + "\n" + htmlToInsert);
    }
  };

  const handleInsertLink = (e) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;
    executeCommand("createLink", linkUrl.trim());
    setLinkUrl("");
    setShowLinkModal(false);
  };

  const handleInsertImage = (e) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    const imgHtml = `<figure class="my-6"><img src="${imageUrlInput.trim()}" alt="Blog Image" class="rounded-2xl max-w-full h-auto mx-auto shadow-md" /><figcaption class="text-center text-xs text-slate-400 mt-2 italic">Image caption</figcaption></figure><p><br/></p>`;
    insertCustomHTML(imgHtml);
    setImageUrlInput("");
    setShowImageModal(false);
  };

  const handleInsertTable = () => {
    const tableHtml = `
      <table class="w-full my-6 border-collapse border border-slate-200 text-sm">
        <thead>
          <tr class="bg-slate-100">
            <th class="border border-slate-200 p-2 font-bold text-left">Header 1</th>
            <th class="border border-slate-200 p-2 font-bold text-left">Header 2</th>
            <th class="border border-slate-200 p-2 font-bold text-left">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-200 p-2">Row 1 Data</td>
            <td class="border border-slate-200 p-2">Sample info</td>
            <td class="border border-slate-200 p-2">Details</td>
          </tr>
          <tr>
            <td class="border border-slate-200 p-2">Row 2 Data</td>
            <td class="border border-slate-200 p-2">Sample info</td>
            <td class="border border-slate-200 p-2">Details</td>
          </tr>
        </tbody>
      </table>
      <p><br/></p>
    `;
    insertCustomHTML(tableHtml);
  };

  // Text statistics
  const plainText = formData.content ? formData.content.replace(/<[^>]*>/g, " ").trim() : "";
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const charCount = plainText.length;

  // Submit Handler
  const handleSubmit = async (submitStatus) => {
    if (!formData.title.trim()) {
      setError("Please enter an article title.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!formData.description.trim()) {
      setError("Please provide a short excerpt or summary.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content,
        category: formData.category,
        image: formData.image.trim() || heroAvatar,
        status: submitStatus || formData.status,
        isFeatured: formData.isFeatured,
        isPopular: formData.isPopular,
        author: {
          name: formData.authorName.trim() || "Admin",
          readTime: Number(formData.readTime) || 4,
          publishedAt: formData.publishedAt,
        },
      };

      const endpoint = isEditing ? `${API_URL}/blogs/${id}` : `${API_URL}/blogs`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(
          isEditing
            ? "Article updated successfully!"
            : "Article published successfully!"
        );
        setTimeout(() => {
          navigate("/admin/blogs");
        }, 1200);
      } else {
        setError(data.message || "Failed to save blog post.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold text-slate-500">
          Loading article in WordPress editor...
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-6 max-w-[1400px] mx-auto pb-16 ${isFullscreen ? "fixed inset-0 z-50 bg-[#f8fafc] p-6 overflow-y-auto max-w-none" : ""}`}>
      {/* Hidden File Inputs */}
      <input
        ref={coverFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleDirectUpload(e.target.files[0], "cover")}
      />
      <input
        ref={editorImageFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleDirectUpload(e.target.files[0], "editor")}
      />

      {/* ================= 1. WORDPRESS STYLE TOP BAR ================= */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 sm:gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/admin/blogs"
            className="p-1.5 sm:p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
            title="Back to Posts"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-2.5 sm:pl-3">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {isEditing ? "Edit Post" : "Add New Post"}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
              {formData.status === "Published" ? "Published" : "Draft"}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2.5">
          {/* Preview Button */}
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* Save Draft */}
          <button
            type="button"
            onClick={() => handleSubmit("Draft")}
            disabled={loading}
            className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          {/* Publish / Update Button */}
          <button
            type="button"
            onClick={() => handleSubmit("Published")}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>{isEditing ? "Update" : "Publish"}</span>
              </>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-sm text-red-700 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-sm text-emerald-700 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ================= 2. MAIN 2-COLUMN WORDPRESS LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* ================= LEFT CANVAS ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden">
          {/* Post Title Field */}
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <input
              type="text"
              placeholder="Add Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071d55] placeholder-slate-300 focus:outline-none border-none bg-transparent tracking-tight"
            />
          </div>

          {/* ================= WORDPRESS FORMATTING TOOLBAR ================= */}
          <div className="bg-slate-50/80 border-b border-slate-200/70 p-2 sm:px-4 flex flex-wrap items-center justify-between gap-2 select-none sticky top-16 z-20 backdrop-blur-md">
            {/* Left toolbar groups */}
            <div className="flex flex-wrap items-center gap-1">
              {/* Heading / Block Type dropdown */}
              <div className="relative inline-block mr-1">
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "p") formatBlock("p");
                    else if (val === "h1") formatBlock("h1");
                    else if (val === "h2") formatBlock("h2");
                    else if (val === "h3") formatBlock("h3");
                    else if (val === "blockquote") formatBlock("blockquote");
                    else if (val === "pre") formatBlock("pre");
                  }}
                  className="appearance-none bg-white border border-slate-200/80 text-xs font-bold text-slate-700 rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none cursor-pointer shadow-2xs"
                >
                  <option value="p">Paragraph</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="blockquote">Quote</option>
                  <option value="pre">Code block</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Inline Formatting Buttons */}
              <div className="flex items-center bg-white border border-slate-200/80 rounded-lg p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => executeCommand("bold")}
                  title="Bold (Ctrl+B)"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("italic")}
                  title="Italic (Ctrl+I)"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("underline")}
                  title="Underline (Ctrl+U)"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("strikeThrough")}
                  title="Strikethrough"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Alignment Buttons */}
              <div className="flex items-center bg-white border border-slate-200/80 rounded-lg p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => executeCommand("justifyLeft")}
                  title="Align Left"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyCenter")}
                  title="Align Center"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyRight")}
                  title="Align Right"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <AlignRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyFull")}
                  title="Justify"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <AlignJustify className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Lists Buttons */}
              <div className="flex items-center bg-white border border-slate-200/80 rounded-lg p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => executeCommand("insertUnorderedList")}
                  title="Bullet List"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("insertOrderedList")}
                  title="Numbered List"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Insert Elements Group */}
              <div className="flex items-center bg-white border border-slate-200/80 rounded-lg p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(true)}
                  title="Insert Link"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>

                {/* Add Image directly from Media Library or Device */}
                <button
                  type="button"
                  onClick={() => openMediaPicker("editor")}
                  title="Insert Image from Media Library"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleInsertTable}
                  title="Insert Table"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("insertHorizontalRule")}
                  title="Horizontal Line"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* History & Clear */}
              <div className="flex items-center bg-white border border-slate-200/80 rounded-lg p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => executeCommand("undo")}
                  title="Undo (Ctrl+Z)"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("redo")}
                  title="Redo (Ctrl+Y)"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <Redo2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("removeFormat")}
                  title="Clear Formatting"
                  className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <RemoveFormatting className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Mode Switcher (Visual vs Text / HTML) */}
            <div className="flex items-center bg-slate-200/60 p-0.5 rounded-lg text-xs font-bold">
              <button
                type="button"
                onClick={() => setEditorMode("visual")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  editorMode === "visual"
                    ? "bg-white text-blue-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Visual
              </button>
              <button
                type="button"
                onClick={() => setEditorMode("html")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  editorMode === "html"
                    ? "bg-white text-blue-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Text (HTML)
              </button>
            </div>
          </div>

          {/* ================= EDITING CANVAS ================= */}
          <div className="relative min-h-[460px] p-6 sm:p-8">
            {editorMode === "visual" ? (
              <div
                ref={editorRef}
                contentEditable
                onInput={handleContentInput}
                onBlur={handleContentInput}
                data-placeholder="Start writing your blog article here, or use the toolbar above to insert images, tables, lists and headings..."
                className="w-full min-h-[440px] focus:outline-none text-slate-800 text-base leading-relaxed font-normal empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 empty:before:cursor-text [&>h1]:text-3xl [&>h1]:font-extrabold [&>h1]:text-[#071d55] [&>h1]:my-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#071d55] [&>h2]:my-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#071d55] [&>h3]:my-2 [&>p]:my-2.5 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:my-3 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:my-3 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-600 [&>blockquote]:pl-4 [&>blockquote]:py-1 [&>blockquote]:my-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:bg-blue-50/30 [&>blockquote]:rounded-r-xl [&>pre]:bg-slate-900 [&>pre]:text-emerald-400 [&>pre]:p-4 [&>pre]:rounded-2xl [&>pre]:my-4 [&>pre]:font-mono [&>pre]:text-sm [&>table]:w-full [&>table]:border-collapse [&>table]:my-4 [&>table_th]:border [&>table_th]:border-slate-200 [&>table_th]:bg-slate-50 [&>table_th]:p-2 [&>table_td]:border [&>table_td]:border-slate-200 [&>table_td]:p-2"
              />
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                rows={18}
                placeholder="Write raw HTML or text content here..."
                className="w-full font-mono text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white resize-y"
              />
            )}
          </div>

          {/* ================= WORDPRESS STATUS BAR ================= */}
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-4">
              <span>
                <strong>{wordCount}</strong> words
              </span>
              <span>
                <strong>{charCount}</strong> characters
              </span>
              <span>
                ~<strong>{formData.readTime}</strong> min read
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>WordPress Canvas Ready</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="flex flex-col gap-5">
          {/* Section 1: Publish Settings */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("status")}
              className="w-full p-5 flex items-center justify-between font-extrabold text-sm text-[#071d55] hover:bg-slate-50/60 transition-colors cursor-pointer border-b border-slate-100"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <span>Publish Settings</span>
              </div>
              {openSections.status ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.status && (
              <div className="p-5 flex flex-col gap-4">
                {/* Status selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>

                {/* Author Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Author</label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => handleChange("authorName", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Published Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Publish Date</label>
                  <input
                    type="text"
                    value={formData.publishedAt}
                    onChange={(e) => handleChange("publishedAt", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Toggles */}
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Stick to Front Page (Featured)</span>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => handleChange("isFeatured", e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Trending / Popular Tag</span>
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => handleChange("isPopular", e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Categories */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("category")}
              className="w-full p-5 flex items-center justify-between font-extrabold text-sm text-[#071d55] hover:bg-slate-50/60 transition-colors cursor-pointer border-b border-slate-100"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Categories</span>
              </div>
              {openSections.category ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.category && (
              <div className="p-5 flex flex-col gap-2 max-h-56 overflow-y-auto">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="categorySelect"
                      value={cat}
                      checked={formData.category === cat}
                      onChange={() => handleChange("category", cat)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-700">{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Featured Image with Live Device Upload & Media Library Integration */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("image")}
              className="w-full p-5 flex items-center justify-between font-extrabold text-sm text-[#071d55] hover:bg-slate-50/60 transition-colors cursor-pointer border-b border-slate-100"
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Featured Image</span>
              </div>
              {openSections.image ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.image && (
              <div className="p-5 flex flex-col gap-3">
                {/* Preview Box */}
                <div className="w-full h-36 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden relative group">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Featured Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-slate-400">
                      <ImageIcon className="w-7 h-7" />
                      <span className="text-[11px] font-medium">No featured image</span>
                    </div>
                  )}

                  {uploadingImage && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      <span className="text-xs font-bold text-slate-700">Uploading...</span>
                    </div>
                  )}
                </div>

                {/* Upload from Device & Media Library Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => coverFileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openMediaPicker("cover")}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Media Library</span>
                  </button>
                </div>

                {/* Or paste URL */}
                <input
                  type="text"
                  placeholder="Or paste image URL..."
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />

                {formData.image && (
                  <button
                    type="button"
                    onClick={() => handleChange("image", "")}
                    className="text-xs font-bold text-red-600 hover:underline self-start cursor-pointer"
                  >
                    Remove featured image
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Section 4: Excerpt */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("excerpt")}
              className="w-full p-5 flex items-center justify-between font-extrabold text-sm text-[#071d55] hover:bg-slate-50/60 transition-colors cursor-pointer border-b border-slate-100"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Excerpt / Snippet</span>
              </div>
              {openSections.excerpt ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openSections.excerpt && (
              <div className="p-5 flex flex-col gap-2">
                <textarea
                  rows={3}
                  placeholder="Write an excerpt (optional)..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
                <p className="text-[11px] text-slate-400">
                  Excerpts are optional hand-crafted summaries of your content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MEDIA LIBRARY PICKER MODAL ================= */}
      {showMediaLibraryPicker && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#071d55] text-base">Select from Media Library</h3>
                <p className="text-xs text-slate-400">Click any image to select it for your blog</p>
              </div>
              <button
                type="button"
                onClick={() => setShowMediaLibraryPicker(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {loadingMediaLibrary ? (
                <div className="py-16 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <p className="text-xs text-slate-400">Loading media files...</p>
                </div>
              ) : mediaLibraryFiles.length === 0 ? (
                <div className="py-16 text-center text-xs text-slate-400">
                  No images found in Media Library. Upload from device below.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {mediaLibraryFiles.map((file) => (
                    <div
                      key={file._id}
                      onClick={() => handleSelectMediaItem(file)}
                      className="group border border-slate-200 hover:border-blue-500 rounded-2xl p-2 cursor-pointer transition-all hover:shadow-md bg-white flex flex-col justify-between"
                    >
                      <div className="w-full h-24 rounded-xl bg-slate-100 overflow-hidden">
                        <img
                          src={file.url}
                          alt={file.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-slate-700 truncate mt-1.5">
                        {file.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowMediaLibraryPicker(false);
                  if (mediaPickerTarget === "cover") coverFileInputRef.current?.click();
                  else editorImageFileInputRef.current?.click();
                }}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                + Upload New From Device
              </button>

              <button
                type="button"
                onClick={() => setShowMediaLibraryPicker(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-300 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LINK INSERTION MODAL ================= */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleInsertLink}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#071d55] text-base flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                <span>Insert Hyperlink</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="url"
              placeholder="https://example.com"
              autoFocus
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer shadow-md shadow-blue-600/20"
              >
                Insert Link
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= PREVIEW MODAL ================= */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                Live Public Preview
              </span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 flex flex-col gap-6">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs self-start border border-blue-100">
                {formData.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071d55] tracking-tight">
                {formData.title || "Untitled Article"}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-4">
                <span>By {formData.authorName || "Admin"}</span>
                <span>•</span>
                <span>{formData.publishedAt}</span>
                <span>•</span>
                <span>{formData.readTime} min read</span>
              </div>

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Cover"
                  className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-sm"
                />
              )}

              <p className="text-base text-slate-600 italic font-medium leading-relaxed">
                {formData.description}
              </p>

              <div
                className="text-slate-800 text-base leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: formData.content || "<p class='text-slate-400'>No body content written yet.</p>",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
