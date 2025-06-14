import { ACHIEVEMENTS } from "../../utils/Links";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Youtube() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="container mb-10 px-4 sm:px-6">
      <div className="w-full max-w-[1307px] mx-auto aspect-video rounded-xl overflow-hidden">
        <div className="relative w-full h-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ozWx4OdWW-0?autoplay=1&loop=1&playlist=ozWx4OdWW-0&mute=1"
            title="My Spine Surgery Philosophy"
           
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>

      <div
        ref={ref}
        className="font-helvetica grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 w-full mx-auto px-2"
      >
        {ACHIEVEMENTS.map((data) => (
          <div
            key={data.id}
            className="w-full rounded-xl shadow-md shadow-[#8787836B] flex flex-col justify-center items-center space-y-2 sm:space-y-3 p-4 sm:p-6"
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl" style={{color:"#001040"}}>
              {inView ? <CountUp start={0} end={data.count} duration={2} separator="" /> : 0}
            </h1>
            <p className="text-[#FFA200] text-sm sm:text-base md:text-lg font-bold text-center">
              {data.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}