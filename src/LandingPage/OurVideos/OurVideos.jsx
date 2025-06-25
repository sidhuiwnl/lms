import { useEffect, useState } from "react";

export default function OurVideos() {
  const [videos, setVideos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getYoutubeVideo`);
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const visibleVideos = showAll ? videos : videos.slice(0, 3);

  return (
    <section className="py-10 px-4 flex flex-col items-center space-y-10">
      <h1 className="headingarea text-center py-4">Our Videos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl justify-items-center">
        {visibleVideos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col items-center space-y-2 text-center mx-2"
          >
            <iframe
              src={video.yotubelLink}
              className="w-[370px] max-w-[382px] h-[215px] sm:h-[251px] rounded-lg shadow-lg"
              allowFullScreen
            />
            <p className="text-[#001040] font-medium text-base sm:text-lg">
              {video.title}
            </p>
          </div>
        ))}
      </div>

      {/* Toggle Button Logic */}
      {videos.length > 3 && (
        <p
          onClick={() => setShowAll(!showAll)}
          className="underline text-[#001040] font-medium cursor-pointer"
        >
          {showAll ? "Collapse" : "View All"}
        </p>
      )}
    </section>
  );
}
