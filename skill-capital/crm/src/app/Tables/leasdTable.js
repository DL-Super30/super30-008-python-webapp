// import React from "react";

// export default function LeadTable(){




//     return(

//         <div>
//           <div className=" flex items-center justify-center w-full h-full m-auto p-1 border-2 border-gray-100 rounded-md">
//             <table className='border-2  text-center table-auto   text-sm capitalize text-semibold w-full rounded-md' >
//               <thead>
//                 <tr className='border-2 bg-rose-200 p-5'>
//                   <th className='border-2 px-3'>created On</th>
//                   <th className='border-2 px-3' >Name</th>
//                   <th className='border-2 px-3'>Lead Status</th>
//                   <th className='border-2 px-3'>Phone</th>
//                   <th className='border-2 px-3'>Email</th>
//                   <th className='border-2 px-3'>Stack</th>
//                   <th className='border-2 px-3'>Course</th>
//                   <th className='border-2 px-3'>Update</th>
//                   <th className='border-2 px-3'>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredRows.length === 0 ? (
//                   <tr>
//                     <td colSpan="11">No data available</td>
//                   </tr>
//                 ) : (
//                   filteredRows.map((row, index) => (
//                     <tr key={index} className="bg-green-100">
//                       <td className="border-2 p-2 ">{row.createdOn}</td> {/* New column data not exising in form */}
//                       <td className='border-2 p-2'>{row.name}</td>
//                       <td className='border-2 p-2'>{row.leadStatus}</td>
//                       <td className='border-2 p-2'>{row.phone}</td>
//                       <td className='border-2 p-2'>{row.email}</td>
//                       <td className='border-2 p-2'>{row.stack}</td>
//                       <td className='border-2 p-2'>{row.course}</td>
//                       <td className='border-2 px-3'>
//                         <div className="flex  items-center">
//                           <button
//                             onClick={''}
//                             className="w-[70px] justify-center items-center text-green-700 flex border-1 bg-gray-200 rounded-md">
//                             <EditIcon className=" w-[20px] h-[20px]" />
//                             <p>Update</p>
//                           </button>
//                         </div>
//                       </td>

//                       <td className='border-2 px-3'>
//                         <div className="flex  items-center">
//                           <button
//                             onClick={() => handleDelete(row.id)}
//                             className=" w-[70px] justify-center items-center text-red-600 flex border-1 bg-gray-200 rounded-md">
//                             <DeleteIcon className="w-[20px] h-[20px]" />
//                             <p>Delete</p>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//       </div>
//     )
// }