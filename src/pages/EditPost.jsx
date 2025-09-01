import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import axios from "axios";

const mdParser = new MarkdownIt();

const EditPost = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //  Load existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        const post = res.data.post;
        setTitle(post.title || "");
        setSubtitle(post.subtitle || "");
        setContent(post.content || "");
        setImagePreview(post.file || null); 
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  //  Handle markdown editor
  const handleEditorChange = ({ text }) => setContent(text);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  //  Submit edited post
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("content", content);
      if (image) formData.append("file", image);

      await axios.put(`/posts/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Post updated successfully!");
      navigate(`/posts/${id}`); 
    } catch (err) {
      console.error("Error updating post:", err);
      alert("❌ Failed to update post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Blog Post</h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Markdown Editor */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Content</label>
          <MdEditor
            value={content}
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            Upload New Image
          </label>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-60 object-cover rounded-lg shadow"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600"
          >
            Update Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
