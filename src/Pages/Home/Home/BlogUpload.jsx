import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogUpload = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogTitle || !blogDescription || !blogImage) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("blog_title", blogTitle);
    formData.append("blog_description", blogDescription);
    formData.append("blog_image", blogImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/blogs",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Blog uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading blog", error);
      toast.error("Failed to upload blog");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-[] shadow-lg border-2 rounded-lg ">
      <h2 className="text-2xl font-bold mb-4">Upload Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          className="w-full p-2 border rounded cursor-pointer"
          required
        />
        <small className="text-red-500 text-justify">
          please input '###' if you want to start a new line
        </small>
        <textarea
          placeholder="Blog Description"
          value={blogDescription}
          onChange={(e) => setBlogDescription(e.target.value)}
          className="w-full p-2 border rounded cursor-pointer"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border cursor-pointer rounded"
          required
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-40 object-cover mt-2 rounded"
          />
        )}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload Blog
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BlogUpload;
