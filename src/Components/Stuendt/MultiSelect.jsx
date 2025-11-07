// import React, { useState } from "react";
// import { Listbox } from "@headlessui/react";
// import downArrowFilter from "../../assets/sanadSVG/downArrow.svg"
// import { ReactSVG } from 'react-svg'


// const MultiSelect = ({ options, selected, setSelected }) => {
//     const handleChange = (value) => {
//         const index = selected.indexOf(value);
//         if (index === -1) {
//             setSelected([...selected, value]);
//         } else {
//             setSelected(selected.filter((item) => item !== value));
//         }
//     };

//     const [toggle, settoggle] = useState(false)

//     return (
//         <div value={selected} onChange={setSelected}>

//             <>
//                 <div className="relative"
//                     onClick={() => settoggle(prev => !prev)}
//                 >
//                     <span className="inline-block w-full rounded-md shadow-sm">
//                         <div className="cursor-pointer relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300">
//                             <span className="block truncate">
//                                 {selected.length === 0
//                                     ? "Select options..."
//                                     : `${selected.length} selected`}
//                             </span>
//                             <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                                 <svg
//                                     className="w-5 h-5 text-gray-400"
//                                     viewBox="0 0 20 20"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         clipRule="evenodd"
//                                         d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414L11.414 11l2.293 2.293a1 1 0 01-1.414 1.414L10 12.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 11 6.293 8.707a1 1 0 010-1.414z"
//                                         fill="currentColor"
//                                     />
//                                 </svg>
//                             </span>
//                         </div>
//                     </span>
//                 </div>

//                 <div className={`absolute mt-1 w-1/2   bg-white shadow-lg ${toggle ? "block" : "hidden"}`}>
//                     <ul
//                         tabIndex={0}
//                         className="max-h-60 overflow-y-auto focus:outline-none  rounded-md overflow-hidden"
//                     >
//                         {options.map((option, index) => (
//                             <li
//                                 key={index}
//                                 className={`cursor-pointer select-none  py-2 px-4   hover:bg-gray-50 `}
//                                 onClick={(e) => {
//                                     e.stopPropagation(); // Stop event propagation
//                                     handleChange(option);
//                                 }}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <span
//                                         className={`${selected.indexOf(option) !== -1
//                                             ? "font-semibold"
//                                             : "font-normal"
//                                             } block truncate`}
//                                     >
//                                         {option}
//                                     </span>

//                                     {selected.indexOf(option) !== -1 ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
//                                         <path fill="none" d="M0 0h24v24H0z" />
//                                         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
//                                     </svg> : null
//                                     }


//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//             </>

//         </div>
//     );
// };

// export default MultiSelect;