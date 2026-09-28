import { useState, useEffect, useRef, useCallback } from "react";
import {
  UploadCloud,
  Search,
  ChevronDown,
  LayoutGrid,
  List as ListIcon,
  FileText,
  Film,
  Image as ImageIcon,
  File,
  Copy,
  Download,
  Trash2,
  X,
  Check,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  ExternalLink,
  CheckSquare,
  Sparkles,
} from "lucide-react";

export const MediaLibrary = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Selected file for right-hand preview panel
  const [selectedFile, setSelectedFile] = useState(null);

  // Multiple selection for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [isDragOver, setIsDragOver] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const itemsPerPage = 12;

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Fetch Media from API
  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        sortBy: selectedSort,
      });

      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      if (selectedType !== "All Types") params.append("type", selectedType);

      const res = await fetch(`${API_URL}/media?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setFiles(data.data || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.total || 0);

        // Auto select first file if none selected and on desktop
        if (!selectedFile && data.data && data.data.length > 0) {
          setSelectedFile(data.data[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching media:", err);
      showToast("Error loading media library", "error");
    } finally {
      setLoading(false);
    }
  }, [API_URL, currentPage, itemsPerPage, selectedSort, searchQuery, selectedType]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // 2. Upload Files Handler
  const handleFileUpload = async (filesList) => {
    if (!filesList || filesList.length === 0) return;

    try {
      setUploading(true);
      const formData = new FormData();
      for (let i = 0; i < filesList.length; i++) {
        formData.append("files", filesList[i]);
      }

      const res = await fetch(`${API_URL}/media/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showToast(`${filesList.length} file(s) uploaded successfully!`);
        fetchMedia();
      } else {
        showToast(data.message || "Upload failed", "error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast("Server error during upload", "error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Drag & Drop Handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // 3. Delete Single File
  const handleDeleteFile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media file?")) return;

    try {
      const res = await fetch(`${API_URL}/media/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("File deleted successfully");
        if (selectedFile?._id === id) {
          setSelectedFile(null);
        }
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        fetchMedia();
      } else {
        showToast(data.message || "Failed to delete file", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Error deleting media", "error");
    }
  };

  // 4. Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected files?`)) return;

    try {
      const res = await fetch(`${API_URL}/media/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Deleted ${selectedIds.length} file(s)`);
        setSelectedIds([]);
        setSelectedFile(null);
        fetchMedia();
      }
    } catch (err) {
      console.error("Bulk delete error:", err);
      showToast("Error deleting selected files", "error");
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast("URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle selection
  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(files.map((f) => f._id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id, e) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Helper badge color
  const getBadge = (file) => {
    if (file.fileType === "video") {
      return (
        <span className="bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Film className="w-2.5 h-2.5" />
          <span>video</span>
        </span>
      );
    }
    if (file.fileType === "pdf" || file.fileType === "document") {
      return (
        <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
          PDF
        </span>
      );
    }
    return (
      <span className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
        image
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto pb-12">
      {/* Toast */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 ${
            toastMessage.type === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}
        >
          {toastMessage.type === "error" ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span className="text-xs font-bold">{toastMessage.message}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,application/pdf"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
      />

      {/* ================= 1. PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
            Media Library
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071d55] mt-1 tracking-tight">
            Media Library
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload, manage and organize all your images, videos and files for blog posts.
          </p>
        </div>

        {/* Upload Media Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-[0.99] self-start sm:self-auto cursor-pointer disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4" />
              <span>Upload Media</span>
            </>
          )}
        </button>
      </div>

      {/* ================= 2. DRAG & DROP UPLOAD ZONE BANNER ================= */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-8 transition-all cursor-pointer group bg-gradient-to-r from-blue-50/50 via-white to-blue-50/30 ${
          isDragOver
            ? "border-blue-500 bg-blue-50/80 scale-[0.995]"
            : "border-blue-200/80 hover:border-blue-400 hover:bg-blue-50/40"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#071d55]">
                Drag & drop files here
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                or <span className="text-blue-600 font-bold underline">click to browse</span> from your device
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                Supports: JPG, PNG, WEBP, GIF, MP4, PDF (Max 10MB each)
              </p>
            </div>
          </div>

          {/* Decorative Media Badges Graphic */}
          <div className="hidden md:flex items-center gap-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-16 rounded-2xl bg-white shadow-md border border-slate-100 -rotate-6 flex items-center justify-center text-blue-500">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="w-16 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg flex items-center justify-center z-10">
              <Film className="w-7 h-7" />
            </div>
            <div className="w-14 h-16 rounded-2xl bg-white shadow-md border border-slate-100 rotate-6 flex items-center justify-center text-rose-500">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. TOOLBAR & FILTER ROW ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
          />
        </div>

        {/* Filters Group */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Types Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none bg-white border border-slate-200/90 pl-3.5 pr-8 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer shadow-2xs truncate"
            >
              <option value="All Types">All Types</option>
              <option value="Images">Images</option>
              <option value="Videos">Videos</option>
              <option value="PDF & Documents">PDF & Docs</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200/90 pl-3.5 pr-8 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer shadow-2xs truncate"
            >
              <option value="Newest">Sort: Newest</option>
              <option value="Oldest">Sort: Oldest</option>
              <option value="Title A-Z">Sort: Title A-Z</option>
              <option value="Largest">Sort: Largest</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="col-span-2 sm:col-span-1 flex items-center justify-end sm:justify-start bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs ml-auto sm:ml-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-700"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === "list" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-700"
              }`}
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= 3.5 BULK SELECTION BAR ================= */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/90 border border-blue-200/80 rounded-2xl px-5 py-3 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <span>{selectedIds.length} item(s) selected</span>
          </div>

          <button
            onClick={handleBulkDelete}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      {/* ================= 4. MAIN CONTENT (GRID + DETAIL DRAWER) ================= */}
      <div className={`grid grid-cols-1 ${selectedFile ? "lg:grid-cols-[1fr_360px]" : "lg:grid-cols-1"} gap-6 items-start`}>
        {/* LEFT: Media Grid / Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-xs font-semibold text-slate-400">Loading media files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
              <ImageIcon className="w-12 h-12 text-slate-300" />
              <p className="text-base font-bold text-slate-700">No media files found</p>
              <p className="text-xs text-slate-400 max-w-sm">
                Upload your first image, video, or PDF by dragging it onto the upload banner above.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            /* GRID VIEW (4 Columns matching template mockup) */
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {files.map((file) => {
                const isSelected = selectedFile?._id === file._id;
                const isChecked = selectedIds.includes(file._id);

                return (
                  <div
                    key={file._id}
                    onClick={() => setSelectedFile(file)}
                    className={`group relative bg-white border rounded-2xl p-2.5 flex flex-col justify-between transition-all cursor-pointer shadow-2xs hover:shadow-md ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20"
                        : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    {/* Top Overlay Checkbox */}
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => toggleSelectOne(file._id, e)}
                        className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shadow-sm bg-white"
                      />
                    </div>

                    {/* Thumbnail Preview Area */}
                    <div className="w-full h-32 rounded-xl bg-slate-100 overflow-hidden relative flex items-center justify-center">
                      {file.fileType === "image" ? (
                        <img
                          src={file.url}
                          alt={file.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : file.fileType === "video" ? (
                        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-white relative">
                          <Film className="w-8 h-8 text-blue-400 opacity-90" />
                          {file.duration && (
                            <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">
                              {file.duration}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full bg-rose-50/80 flex flex-col items-center justify-center text-rose-500">
                          <FileText className="w-8 h-8" />
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute bottom-2 left-2">
                        {getBadge(file)}
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="pt-2.5 px-1 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#071d55] truncate group-hover:text-blue-600 transition-colors">
                          {file.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                          {file.sizeFormatted} • {new Date(file.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(file);
                        }}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded-lg shrink-0"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 pl-4 w-8">
                      <input
                        type="checkbox"
                        checked={files.length > 0 && selectedIds.length === files.length}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                    </th>
                    <th className="py-3 px-3">File</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Size</th>
                    <th className="py-3 px-3">Uploaded Date</th>
                    <th className="py-3 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {files.map((file) => (
                    <tr
                      key={file._id}
                      onClick={() => setSelectedFile(file)}
                      className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${
                        selectedFile?._id === file._id ? "bg-blue-50/40" : ""
                      }`}
                    >
                      <td className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(file._id)}
                          onChange={(e) => toggleSelectOne(file._id, e)}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={file.url}
                            alt={file.title}
                            className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0"
                          />
                          <span className="text-xs font-bold text-[#071d55] truncate max-w-[200px]">
                            {file.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-xs font-semibold text-slate-600 capitalize">
                        {file.fileType}
                      </td>
                      <td className="py-3 px-3 text-xs font-semibold text-slate-600">
                        {file.sizeFormatted}
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-500">
                        {new Date(file.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyUrl(file.url, file._id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ================= 5. PAGINATION ROW ================= */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500">
              Showing{" "}
              <span className="text-slate-800 font-bold">
                {totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
              </span>
              –
              <span className="text-slate-800 font-bold">
                {Math.min(currentPage * itemsPerPage, totalCount)}
              </span>{" "}
              of <span className="text-slate-800 font-bold">{totalCount}</span> files
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-xs"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: FILE DETAILS DRAWER (MATCHING TEMPLATE) ================= */}
        {selectedFile && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col gap-5 sticky top-6">
            {/* Header & Close */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Selected Media
              </span>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Image Card */}
            <div className="w-full h-44 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100 flex items-center justify-center">
              {selectedFile.fileType === "image" ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.title}
                  className="w-full h-full object-cover"
                />
              ) : selectedFile.fileType === "video" ? (
                <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-white">
                  <Film className="w-10 h-10 text-blue-400" />
                </div>
              ) : (
                <div className="w-full h-full bg-rose-50 flex flex-col items-center justify-center text-rose-500">
                  <FileText className="w-10 h-10" />
                </div>
              )}
            </div>

            {/* Title & Specs */}
            <div>
              <h3 className="text-sm font-extrabold text-[#071d55] break-all">
                {selectedFile.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {selectedFile.sizeFormatted} • {selectedFile.dimensions || "1200 × 800"}
              </p>
              <p className="text-[11px] text-slate-400">
                Uploaded on {new Date(selectedFile.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>

            {/* Primary Action Buttons: Copy URL & Download */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleCopyUrl(selectedFile.url, selectedFile._id)}
                className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                {copiedId === selectedFile._id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <a
                href={selectedFile.url}
                target="_blank"
                rel="noreferrer"
                download
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            {/* File Details Section */}
            <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
              <h4 className="text-xs font-extrabold text-[#071d55]">File Details</h4>

              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400 font-medium">Type</span>
                <span className="font-bold text-slate-700 uppercase">
                  {selectedFile.mimeType?.split("/")[1] || selectedFile.fileType}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400 font-medium">Size</span>
                <span className="font-bold text-slate-700">{selectedFile.sizeFormatted}</span>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400 font-medium">Dimensions</span>
                <span className="font-bold text-slate-700">{selectedFile.dimensions}</span>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400 font-medium">Uploaded by</span>
                <span className="font-bold text-slate-700">{selectedFile.uploadedBy}</span>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400 font-medium">Used in</span>
                <span className="font-bold text-slate-700">{selectedFile.usedInCount || 1} blog posts</span>
              </div>

              <div className="flex flex-col gap-1 text-xs py-1">
                <span className="text-slate-400 font-medium">Alt Text</span>
                <span className="font-semibold text-slate-700 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {selectedFile.altText || "No alt text set"}
                </span>
              </div>
            </div>

            {/* Delete File Button */}
            <button
              type="button"
              onClick={() => handleDeleteFile(selectedFile._id)}
              className="mt-2 w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete File</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
