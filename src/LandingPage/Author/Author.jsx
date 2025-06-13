
import forbes from "../../assets/forbes.png"
import webmd from "../../assets/webmd.svg"
import msn from "../../assets/msn.svg"
import washingtonsvg from "../../assets/the-washington-post.svg"
import dailynews from "../../assets/daily-news.svg"
import menshealth from "../../assets/men-s-health.svg"
import esquire from "../../assets/esquire.svg"
import gq from "../../assets/gq.svg"
import glamour from "../../assets/glamour.svg"
import npr from "../../assets/npr.jpg"
import nyt from "../../assets/the-new-york-times.svg"
import times from "../../assets/the-times.png"
import cosmo from "../../assets/cosmos.png"
export default function Author() {
  return (
    <section className="flex flex-col justify-center items-center py-10 px-4 space-y-10">
      <h1 className="headingarea text-center">
        Published Author <span className="text-[#F99420]">.</span>
      </h1>

      <div className="flex flex-wrap flex-row justify-around gap-4 max-w-6xl w-full">
        
        <img src={forbes} alt="Author 1" className=" object-contain w-30 h-30"  />
        <img src={washingtonsvg} alt="Author 2" className=" object-contain w-30 h-30" />
        <img src={dailynews} alt="Author 3" className=" object-contain w-30 h-30" />
        <img src={webmd} alt="Author 4" className=" object-contain w-30 h-30" />
        <img src={msn} alt="Author 5" className=" object-contain w-30 h-30" />
        <img src={menshealth} alt="Author 6" className=" object-contain w-30 h-30" />
        <img src={esquire} alt="Author 7" className=" object-contain w-30 h-30" />
        <img src={glamour} alt="Author 8" className=" object-contain w-30 h-30" />
        <img src={gq} alt="Author 9" className=" object-contain w-30 h-30" />
        <img src={npr} alt="Author 10" className=" object-contain w-30 h-30" />
        <img src={nyt} alt="Author 11" className=" object-contain w-30 h-30" />
        <img src={times} alt="Author 12" className=" object-contain w-30 h-30" />
        <img src={cosmo} alt="Author 13" className=" object-contain w-30 h-30" />
      </div>
    </section>
  );
}
