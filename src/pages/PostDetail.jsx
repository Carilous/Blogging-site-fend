import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "axios";
import EmojiPicker from "emoji-picker-react";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data.post);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("❌ Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Like/Unlike post
 const handleLikeToggle = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.post(
      `/posts/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPost({ ...post, likes: res.data.likedBy });
  } catch (err) {
    console.error("❌ Error liking post:", err);
  }
};


  // Delete post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post deleted!");
      navigate("/");
    } catch (err) {
      console.error("❌ Error deleting post:", err);
    }
  };

  // Edit post REDIRECT
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  // Add comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      
      
      const res = await API.post(
        `/posts/${id}/comment`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }

      );
      const added = res.data?.comment ?? res.data; 
    setComments([...comments, added]);
    setNewComment("");
    } catch (err) {
      console.error("❌ Error adding comment:",  err.response?.status,
      err.response?.data || err.message);
    }
  };
  //delete comments 
const handleDeleteComment = async (commentId) => {
  if (!window.confirm("Delete this comment?")) return;
  try {
    const token = localStorage.getItem("token");
    await API.delete(`/posts/${id}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  } catch (err) {
    console.error("❌ Error deleting comment:", err.response?.data || err.message);
  }
};

  //add emoji to comment
 const [showEmojiPicker, setShowEmojiPicker] = useState(false);
 


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center mt-10 text-red-500">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 ">

      {/* Post Details */}
      
      <div className="bg-white hover:bg-blue-100 border border-gray-200shadow-md  border-gray-200 overflow-hidden hover:shadow-xl transition-shadow rounded-2xl shadow p-6 mb-6">
        {post. fileUrl && (
          <img
    src={post.fileUrl || `${post.file}`}  
    alt={post.title}
    className="w-full h-64 object-cover rounded-xl mb-4"
  />
        )}
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        {post.subtitle && <h2 className="text-lg text-gray-600 mb-4">{post.subtitle}</h2>}
        <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
        <p className="text-sm text-gray-500">By {post.author?.username || "Unknown"}</p>

        {/* Like / Edit / Delete buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleLikeToggle}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            👍 {post.likes?.length || 0} Likes
          </button>
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
          
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-blue-100 rounded-2xl shadow p-">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="p-3 border rounded-lg bg-white">
                <p className="text-gray-800">{c.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  By {c.user?.username || "Anonymous"} • {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
        {comments.map((c) => (
  <div key={c._id} className="p-3 border rounded-lg  flex justify-between items-start">
    <div>
      <p className="text-gray-800">{c.text}</p>
      <p className="text-xs text-gray-500 mt-1">
        By {c.user?.username || "Anonymous"} • {new Date(c.createdAt).toLocaleString()}
      </p>
    </div>
    <button
      onClick={() => handleDeleteComment(c._id)}
      className="text-white hover:text--700 ml-3 bg-red-600 text-sm px-2 py-1 rounded-lg"
      title="Delete comment"
    >
      Delete
    </button>
  </div>
))}


        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-2 ">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
          <button
            type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="px-3 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
              >
              😀    
          </button>
          {showEmojiPicker && (
  <div className="absolute mt-2 z-50">
    <EmojiPicker
      onEmojiClick={(emojiObject) =>
        setNewComment((prev) => prev + emojiObject.emoji)
      }
    />
  </div>
)}


        </form>
      </div>
    </div>
  );
};

export default PostDetails;
