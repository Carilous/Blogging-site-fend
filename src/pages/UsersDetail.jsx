import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

const UserPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
       
        const userRes = await API.get(`/auth/users/${id}`);
        setUser(userRes.data.user);

    
        const postsRes = await API.get(`/posts/users/${id}`);
        setPosts(postsRes.data.posts || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user/posts:", err);
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!user) return <p className="text-center text-red-500">User not found</p>;
 
 
const handleDelete = async () => {
  const token = localStorage.getItem("token"); 
  if (!token) {
    alert("You must be logged in to delete your account.");
    return;
  }

  if (!window.confirm("Are you sure you want to delete your account?")) return;

  try {
    console.log("Deleting user with id:", user._id, "token:", token);

    const res = await API.delete(`/auth/users/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    alert(res.data.message);

    
    localStorage.removeItem("token");
    window.location.href = "/signup";
  } catch (err) {
    console.error("Delete error:", err);
    alert(err.response?.data?.message || "Error deleting user");
  }
};



  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* User Card */}
      <div className="bg-green-900 text-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center mb-8">
        <img
          src={user.profilePicture || "https://example.com/default-profile-picture.png"}
          alt={user.username}
          className="w-28 h-28 rounded-full object-cover   text-white shadow-md mb-4"
        />
        <h2 className="text-3xl font-bold text-white-800">{user.username}</h2>
        <p className="text-white-500">{user.email}</p>
        <p className="text-sm text-white-400 mt-2">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </p>

         <button
           onClick={handleDelete} className="bg-green-700  w-30 rounded-md text-sm hover:bg-red-500">Exist DevBlog </button>

      
      </div>

      {/* Posts List */}
      <h3 className="text-2xl text-blue-600 font-semibold mb-4">{user.username}'s Posts</h3>
      {posts.length === 0 ? (
        <p className="text-red-400">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
              {post.fileUrl && (
                <img
                  src={post.fileUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h4 className="text-xl font-bold mb-2">{post.title}</h4>
              {post.subtitle && <p className="text-gray-500 mb-2">{post.subtitle}</p>}
              <p className="text-gray-700 mb-2">{post.content.slice(0, 100)}...</p>
              <Link
                to={`/posts/${post._id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
