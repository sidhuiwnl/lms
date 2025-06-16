import { Helmet } from "react-helmet";

export default function Hero() {
  return (
    <section className="relative w-full h-full">
      <Helmet>
        <title>About Dr. Ken Hansraj – Spine Surgeon & Global Health Consultant</title>
        <meta name="description" content="Learn about Dr. Ken Hansraj's mission to eradicate spinal problems through research, education, and patient care." />
        <meta name="keywords" content="Spine surgeon, global health consultant, spinal wellness, author biography" />
        <link rel="canonical" href="https://drken.us/about" />
      </Helmet>

     
      <img 
        src="./surgery.png"
        alt="Surgery Background"
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[1000px] xl:h-[800px] object-cover"
      />

    
      <div className="absolute inset-0 flex items-start px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 max-w-full md:max-w-[650px] lg:max-w-[700px] p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg  ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-semibold text-blue-900 my-2 sm:my-3">
            Dr. Kenneth Hansraj,
          </h1>
          
          <div className="text-lg sm:text-xl md:text-2xl space-y-2">
            <p className="text-blue-900 font-medium">New York Based</p>
            <p className="text-amber-500 font-medium">Spinal & Orthopedic Surgeon</p>
          </div>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-gray-800 mt-2 sm:mt-3">
            <span className="font-bold">Kenneth Hansraj, M.D.</span> is a spinal and orthopedic surgeon specializing in cervical, thoracic, and lumbar procedures. He performs knifeless surgery, bloodless spine surgery, and minimally invasive approaches when possible. He also utilizes advanced bone grafting techniques, spinal navigation to assess instrumentation placement, modern operating tables, and spinal cord and nerve monitoring during spine surgery. Additionally, he uses stem cells in spine surgery.
          </p>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-gray-800 mt-2 sm:mt-3">
            Dr. Ken believes in whole-body wellness, preventative care, and that the spine is a principal indicator of general health—impacted by both "human software and hardware."
          </p>
        </div>
      </div>
    </section>
  );
}