import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Blog() {
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
    <Helmet>
        <title>Insights on Spine Health – Dr. Ken Hansraj's Blog
</title>
        <meta name="description" content="Stay updated with the latest articles and research findings on spine health, posture, and pain management.
" />
        <meta name="keywords" content="Spine health tips, posture correction, back pain relief, research articles
" />
        <link rel="canonical" href="https://drken.us/blog" /> 
    </Helmet>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={blog.id}>
            <div className="bg-white border rounded-xl shadow-md p-4 h-100 d-flex flex-column">
              <img src="/blog.jpg" alt="Default Blog" className="w-100 h-40 object-cover rounded mb-3"/>
              <div className="flex-grow-1">
                <h2 className="text-lg font-semibold mb-2 text-black">{blog.title}</h2>
                <p className="text-black/50 small">{getPreview(blog.content)}</p>
              </div>
              <Link to={`/blog/${blog.id}`} className="mt-auto text-decoration-none" >
                <button className="btn btn-sm btn-warning w-100 mt-3 ">View More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
