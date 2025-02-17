import { useState, useEffect } from "react";
import axios from "axios";

const Delete = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
      try {
          const response = await axios.get("http://127.0.0.1:5000/blogs");
          console.log("API Response:", response.data); // Debugging log
          setBlogs(response.data.blogs);
      } catch (error) {
          console.error("Error fetching blogs:", error);
      }
  };
  

    const deleteBlog = async (blogId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/delete/${blogId}`);
            setBlogs(blogs.filter((blog) => blog.blog_id !== blogId));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Manage Blogs</h1>
            {blogs.length === 0 ? (
                <p>No blogs available</p>
            ) : (
                blogs.map((blog) => (
                    <div key={blog.blog_id} className="border p-4 mb-4">
                        <h2 className="font-bold">{blog.blog_title}</h2>
                        <p>{blog.blog_description}</p>
                        <img src={blog.blog_image} alt={blog.blog_title} className="w-48 h-32 object-cover my-2" />
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => deleteBlog(blog.blog_id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Delete;
