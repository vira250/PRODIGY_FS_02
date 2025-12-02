// import React from 'react';

// const SummaryCard = ({icon, text, number, color})=>{
//     return (
//     <div className="flex items-center bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5">
//       <div className={`w-14 h-14 flex items-center justify-center ${color} text-white rounded-full text-2xl shadow`}>
//         {icon}
//       </div>
//       <div className="ml-4">
//         <p className="text-xl text-gray-700 font-bold">{text}</p> {/* Increased only this */}
//         <p className="text-2xl font-bold text-gray-800">{number}</p>
//       </div>
//     </div>

//     )
// }

// export default SummaryCard;

import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div
      className="
        flex items-center 
        bg-white 
        rounded-xl 
        shadow-md 
        hover:shadow-lg 
        transition 
        duration-300 
        p-4 md:p-5
        gap-3 md:gap-4
        sm:flex-row flex-col sm:text-left text-center
      "
    >
      <div
        className={`
          flex items-center justify-center 
          ${color} text-white 
          rounded-full shadow
          w-12 h-12 text-xl 
          md:w-14 md:h-14 md:text-2xl
        `}
      >
        {icon}
      </div>

      <div>
        <p className="text-lg md:text-xl text-gray-700 font-bold">
          {text}
        </p>
        <p className="text-xl md:text-2xl font-bold text-gray-800">
          {number}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
