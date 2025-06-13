

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Adminblogview() {
  const [blogs, setBlogs] = useState([]);

  async function getBlog() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blogs`);
      setBlogs(response.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  useEffect(() => {
    getBlog();
  }, []);
  const getPreview = (html) => {
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > 200 ? text.slice(0, 200) + "..." : text;
  };

  return (
    <div className="container py-4">
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={blog.id}>
            <div className="bg-white border rounded-xl shadow-md p-4 h-100 d-flex flex-column">
              <img
                src="/blog.jpg"
                alt="Default Blog"
                className="w-100 h-40 object-cover rounded mb-3"
              />
              <div className="flex-grow-1">
                <h2 className="text-lg font-semibold mb-2 text-black">{blog.title}</h2>
                <p className="text-muted small">{getPreview(blog.content)}</p>
              </div>
              <Link to={`/admin/blog/${blog.id}`} className="mt-auto text-decoration-none">
                <button className="btn btn-sm btn-warning w-100 mt-3 ">View More</button>
              </Link>
              <Link to={`/admin/renderblog/${blog.id}`} className="mt-auto text-decoration-none">
                <button className="btn btn-sm btn-warning w-100 mt-3 ">Update</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
