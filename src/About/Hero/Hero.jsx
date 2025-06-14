import { Helmet } from "react-helmet";

export default function Hero() {
  return (
   
    <section className="relative w-full ">
    
       <Helmet>
        <title>About Dr. Ken Hansraj – Spine Surgeon & Global Health Consultant</title>
        <meta name="description" content="Learn about Dr. Ken Hansraj's mission to eradicate spinal problems through research, education, and patient care." />
       
        <meta name="keywords" content="Spine surgeon, global health consultant, spinal wellness, author biography" />
        <link rel="canonical" href="https://drken.us/about" />
      </Helmet>
      <img 
        src="./surgery.png"
        alt="Surgery Background"
        className="w-full h-[600px] sm:h-[500px] md:h-[1200px] lg:h-[530px] object-cover"
      />

      <div className="absolute inset-0 flex items-start px-4 md:px-10 pt-6 md:pt-10 ">
        <div className="flex flex-col gap-3 md:space-y-4 max-w-full md:max-w-[700px] p-4 md:p-6 rounded-lg bg-opacity-60  max-h-[calc(100%-2rem)] scrollbar-thin">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-semibold my-3" style={{color:"#001040"}}>
            Dr. Kenneth Hansraj,
          </h1>
          <div className="text-[18px] sm:text-[20px] md:text-[25px]" style={{lineHeight:"10px"}}>
            <p className="text-[#001040] font-medium mb-4">New York Based</p>
            <p className="text-[#F99420] font-medium">Spinal & Orthopedic Surgeon</p>
          </div>
          <p className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-tight md:leading-normal">
            <strong>Kenneth Hansraj, M.D.</strong> is a spinal and orthopedic surgeon specializing in cervical, thoracic, and lumbar procedures. He performs knifeless surgery, bloodless spine surgery, and minimally invasive approaches when possible. He also utilizes advanced bone grafting techniques, spinal navigation to assess instrumentation placement, modern operating tables, and spinal cord and nerve monitoring during spine surgery. Additionally, he uses stem cells in spine surgery.
          </p>
          <p className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-tight md:leading-normal mt-2">
            Dr. Ken believes in whole-body wellness, preventative care, and that the spine is a principal indicator of general health—impacted by both “human software and hardware.
          </p>
        </div>
      </div>
    </section>
  );
}