import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Bookpage.css";
import { Helmet } from "react-helmet";

export default function BookPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get the first available format with price > 0
  const getFirstAvailablePrice = (book) => {
    const formats = [
      { type: "kindle", price: book?.kindle },
      { type: "hardcover", price: book?.hardcover },
      { type: "audible", price: book?.audible },
      { type: "audio_cd", price: book?.audio_cd },
    ];
    const validFormat = formats.find(
      (format) => format.price && !isNaN(parseFloat(format.price)) && parseFloat(format.price) > 0
    );
    return validFormat ? parseFloat(validFormat.price).toFixed(2) : "0.00";
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getBooks`);
        if (res.status !== 200) throw new Error("Failed to fetch books");
        setBooks(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading books...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  
  return (
    <>
      <Helmet>
        <title>Books by Dr. Ken Hansraj – Enhance Your Spine Health</title>
        <meta
          name="description"
          content="Explore Dr. Hansraj's publications, including 'Watch Your Back' and 'Keys to An Amazing Life', offering strategies for spinal wellness."
        />
        <meta
          name="keywords"
          content="Spine health books, Watch Your Back, Keys to An Amazing Life, back pain strategies"
        />
        <link rel="canonical" href="https://drken.us/book" />
      </Helmet>

      <div className="container py-4">
        <div className="row">
          {books.map((book) => (
            <div key={book.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-md border-1 p-2">
                {/* Image occupying full card width */}
                <div
                  role="button"
                  onClick={() => navigate(`/book/${btoa(book.id)}`)}
                  className="d-flex justify-content-center align-items-center"
                >
                  {/* Production
                  `${import.meta.env.VITE_BACKEND_URL}/api/${book.images[0].replace(/\\/g, "/")}
                    */}
                  <img
                    src={
                      book.images?.[0]
                        ? `${import.meta.env.VITE_BACKEND_URL}/${book.images[0].replace(/\\/g, "/")}`
                        : "https://via.placeholder.com/400x600"
                    }
                    alt={book.title}
                    className="card-img-top img-fluid"
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{book.title}</h5>
                  <div className="d-flex justify-content-between">
                    <p className="text-[#ffa200] font-extrabold mb-1" style={{ fontSize: "25px" }}>
                      ${getFirstAvailablePrice(book)}
                    </p>
                    <p className="text-[#ffa200] mb-2" style={{ fontSize: "22px" }}>
                      {"★".repeat(book.stars)}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/book/${btoa(book.id)}`)}
                      className="bluebutton px-3 py-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}