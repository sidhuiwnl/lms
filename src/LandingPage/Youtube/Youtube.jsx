import { ACHIEVEMENTS } from "../../utils/Links";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Youtube() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="container mb-10">
      <div className="w-full max-w-[1307px] aspect-video rounded-xl overflow-hidden">
        <div className="relative w-full h-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ozWx4OdWW-0?autoplay=1&loop=1&playlist=ozWx4OdWW-0&mute=1"
            title="My Spine Surgery Philosophy"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>

      <div
        ref={ref}
        className="font-helvetica grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-32 mt-10 w-full max-w-6xl px-2"
      >
        {ACHIEVEMENTS.map((data) => (
          <div
            key={data.id}
            className="w-full rounded-xl shadow-md shadow-[#8787836B] flex flex-col justify-center items-center space-y-3 p-6"
          >
            <h1 className="font-bold text-[36px] md:text-[48px]" style={{color:"#001040"}}><b>
              {inView ? <CountUp start={0} end={data.count} duration={2} separator="" /> : 0}
            </b></h1>
            <p className="text-[#FFA200] text-[20px] md:text-[24px] font-bold text-center">
              {data.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
