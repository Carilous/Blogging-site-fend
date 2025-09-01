import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import API from "../api/axios";


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return alert(" You must be logged in to create a post.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("content", content);
      formData.append("tags", tags);

      if (file) {
        formData.append("file", file); 
      }

      const res = await API.post("/posts/newpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Post created successfully!");
      console.log(res.data);

      // Reset form
      if (preview) URL.revokeObjectURL(preview);
      setTitle("");
      setSubtitle("");
      setContent("");
      setTags("");
      setFile(null);
      setPreview(null);

      //  Redirect to posts page
      navigate("/posts");

    } catch (err) {
      console.error(" Error submitting post:", err);
      alert("Something went wrong: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-2xl bg-blue-100 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Create New Blog Post</h1>
        <p className="text-gray-500 text-center mb-6">
          Share your ideas, stories, and insights with the world.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Subtitle (optional)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Add a short subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-2"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                setPreview(URL.createObjectURL(selectedFile));
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full max-h-60 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Content *</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 h-40"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="e.g. tech, programming, AI"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
