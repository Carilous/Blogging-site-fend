import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios"; 

const PostCard = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts"); 
        setBlogPosts(res.data); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-amber-700">Loading posts a second ...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-300 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 ">Latest Blog Posts</h1>

      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.length === 0 ? (
          <p className="col-span-2 text-center text-gray-500">
          ooops! No posts available yet .
          </p>
        ) : (
          blogPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white hover:bg-blue-100 border border-gray-200shadow-md rounded-2xl p-6  border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Cover Image */}
              {post.fileUrl ? (
                <img
                  src={post.fileUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                  oops! No Image
                </div>
              )}

              <div className="p-6">
                {/* Title */}
                <h2 className="text-xl font-bold mb-1">{post.title}</h2>

                {/* Subtitle */}
                {post.subtitle && (
                  <p className="text-gray-500 italic mb-2">{post.subtitle}</p>
                )}

                {/* Author + Date */}
                <p className="text-sm text-gray-500 mb-3">
                  By{" "}
                  <span className="font-semibold">
                    {post.author?.username || "Unknown"}
                  </span>{" "}
                  • {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {/* Excerpt */}
                <p className="text-gray-700 mb-4">
                  {post.content?.length > 80
                    ? post.content.slice(0, 80) + "..."
                    : post.content}
                </p>

                {/* View More Button */}
                <Link to={`/posts/${post._id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                    Read More...
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostCard;
