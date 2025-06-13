// export default function LatestBook() {
//   return (
//     <section className="py-10 px-4 flex flex-col-reverse lg:flex-row items-center xl:space-x-12 ">
      
      
//       <div className="flex flex-col md:ml-10 max-w-3xl">
//         <h1 className="headingarea py-2">
//           The Latest Book<span className="text-[#F99420]">.</span>
//         </h1>

//         <div className="flex flex-col font-bold text-xl md:text-3xl lg:text-[40px] text-[#E00000] mb-5 ">
//           <p>Watch Your Back: Nine Proven Strategies to Reduce Your Neck and Back Pain Without Surgery</p>
         
//         </div>

//         <div className=" flex flex-col space-y-6 text-[16px] md:text-[18px]   tracking-wide">
//           <p>
//            A self-care guide for better back health—and overall well-being—with nine essential strategies to support your neck and spine.
//           </p>
//           <p>
//             Back problems are the leading cause of disability worldwide, and many of us will endure severe or chronic back pain at some time in our lives. But what can we do? Are surgery and painkillers the only answers? “Not at all,” says spine and neck expert Dr. Ken Hansraj. “There are dozens of exercises, habits, and techniques you can practice—anytime, anyplace—that will significantly improve, if not completely heal, your back pain.” Now, this leading researcher presents a comprehensive guide to help you overcome physical, mental, and emotional factors that contribute to back problems.
//           </p>
//           <p>
//            In <strong>Watch Your Back,</strong> Dr. Hansraj offers a straightforward program for taking the health of your spine and neck into your own hands. Here he offers nine adoptable strategies that provide simple, specific directions on what to do to strengthen your back and make your spine supple. With guidance on nutrition, posture fixes, mindfulness practices for positivity, stretches, and more, Dr. Hansraj’s program has provided healing and pain relief for hundreds of patients.
//           </p>
//         </div>
//       </div>

     
//       <div className="w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[504px] mb-8 lg:mb-0 p-1">
//         <img
//           src="./book-watch-your-back.png"
//           alt="Book by Dr.Ken Hansraj - Watch Your Back"
//           title="Watch Your Back by Dr.Ken Hansraj, shares nine proven strategies to ease neck and back pain without surgery, promoting spinal wellness and self-care."
//           className="w-full h-auto object-contain"
//         />
//       </div>
//     </section>
//   );
// }



// import React from "react";

// export default function LatestBook() {
//   return (
//     <section className="container-fluid mx-4 py-5">
//       <div className="row align-items-center flex-column-reverse flex-lg-row">
        
//         {/* Text Content */}
//         <div className="col-sm-12 col-lg-7 mt-4 mt-lg-0">
//           <h1 className="display-5 fw-bold mb-3 headingarea">
//             The Latest Book<span className="text-warning">.</span>
//           </h1>

//           <div className="mb-4 text-danger fw-bold" style={{ fontSize: "1.75rem" }}>
//             <p>
//               Watch Your Back: Nine Proven Strategies to Reduce Your Neck and Back Pain Without Surgery
//             </p>
//           </div>

//           <div  style={{ fontSize: "1rem" }}>
//             <p>
//               A self-care guide for better back health—and overall well-being—with nine essential strategies to support your neck and spine.
//             </p>
//             <p>
//               Back problems are the leading cause of disability worldwide, and many of us will endure severe or chronic back pain at some time in our lives. But what can we do? Are surgery and painkillers the only answers? “Not at all,” says spine and neck expert Dr. Ken Hansraj. “There are dozens of exercises, habits, and techniques you can practice—anytime, anyplace—that will significantly improve, if not completely heal, your back pain.” Now, this leading researcher presents a comprehensive guide to help you overcome physical, mental, and emotional factors that contribute to back problems.
//             </p>
//             <p>
//               In <strong>Watch Your Back,</strong> Dr. Hansraj offers a straightforward program for taking the health of your spine and neck into your own hands. Here he offers nine adoptable strategies that provide simple, specific directions on what to do to strengthen your back and make your spine supple. With guidance on nutrition, posture fixes, mindfulness practices for positivity, stretches, and more, Dr. Hansraj’s program has provided healing and pain relief for hundreds of patients.
//             </p>
//           </div>
//         </div>

//         {/* Book Image */}
//         <div className="col-sm-12 col-lg-5 text-center">
//           <img
//             src="./book-watch-your-back.png"
//             alt="Book by Dr.Ken Hansraj - Watch Your Back"
//             title="Watch Your Back by Dr.Ken Hansraj, shares nine proven strategies to ease neck and back pain without surgery, promoting spinal wellness and self-care."
//             className="img-fluid"
//             style={{ maxWidth: "400px", width: "100%" }}
//           />
//         </div>

//       </div>
//     </section>
//   );
// }





import React from "react";

export default function LatestBook() {
  return (
    <section className="container-fluid px-3 px-md-4 py-5">
      <div className="row align-items-center flex-column-reverse flex-lg-row">

        {/* Text Content */}
        <div className="col-12 col-lg-7 mt-4 mt-lg-0">
          <h1 className="display-5 fw-bold mb-3 text-center text-lg-start headingarea">
            The Latest Book<span className="text-warning">.</span>
          </h1>

          <div className="mb-4 text-danger fw-bold text-center text-lg-start" style={{ fontSize: "1.5rem" }}>
            <p className="mb-2">
              Watch Your Back: Nine Proven Strategies to Reduce Your Neck and Back Pain Without Surgery
            </p>
          </div>

          <div style={{ fontSize: "1rem" }} className="text-center text-lg-start">
            <p>
              A self-care guide for better back health—and overall well-being—with nine essential strategies to support your neck and spine.
            </p>
            <p>
              Back problems are the leading cause of disability worldwide, and many of us will endure severe or chronic back pain at some time in our lives. But what can we do? Are surgery and painkillers the only answers? “Not at all,” says spine and neck expert Dr. Ken Hansraj. “There are dozens of exercises, habits, and techniques you can practice—anytime, anyplace—that will significantly improve, if not completely heal, your back pain.”
            </p>
            <p>
              In <strong>Watch Your Back,</strong> Dr. Hansraj offers a straightforward program for taking the health of your spine and neck into your own hands. Here he offers nine adoptable strategies that provide simple, specific directions on what to do to strengthen your back and make your spine supple.
            </p>
          </div>
        </div>

        {/* Book Image */}
        <div className="col-12 col-lg-5 text-center mb-4 mb-lg-0">
          <img
            src="./book-watch-your-back.png"
            alt="Book by Dr.Ken Hansraj - Watch Your Back"
            title="Watch Your Back by Dr.Ken Hansraj, shares nine proven strategies to ease neck and back pain without surgery, promoting spinal wellness and self-care."
            className="img-fluid mx-auto"
            style={{ maxWidth: "100%", height: "auto", maxHeight: "500px" }}
          />
        </div>

      </div>
    </section>
  );
}