// // 'use client';
// // import React, { useState } from 'react';

// // const TestPage = () => {
// //     const [open, setOpen] = useState(false)
// //     return (
// //         <div className='min-h-screen bg-black'>
// //             <div className='flex justify-center mt-12'>
// //                 <button
// //                     onClick={() => setOpen(!false)}
// //                     className='px-8 py-3 bg-white text-black hover:bg-gray-300 active:scale-90 translate-0 duration-75 cursor-pointer rounded '>
// //                     {open ? 'Close' : "Open"}
// //                 </button>
// //             </div>
// //             <div
// //                 className={`fixed top-0 left-0 w-64 opacity-100 z-50 h-full bg-white text-black shadow-lg transform ${open ? 'translate-x-0' : '-translate-x-full'}`}
// //             >
// //                 <div className="p-4 border border-black-b flex justify-between items-center">
// //                     <h2 className="text-lg font-bold">Menu</h2>

// //                     <button onClick={() => setOpen(false)}>❌</button>
// //                 </div>

// //                 <ul className="p-4 space-y-3">
// //                     <li className="p-2 hover:bg-gray-100 rounded">Dashboard</li>
// //                     <li className="p-2 hover:bg-gray-100 rounded">Users</li>
// //                     <li className="p-2 hover:bg-gray-100 rounded">Settings</li>
// //                 </ul>
// //             </div>

// //         </div >
// //     );
// // };

// // export default TestPage;

// 'use client';
// import React, { useState } from 'react';

// const TestPage = () => {
//     const [open, setOpen] = useState(false)
//     return (
//         <div className='min-h-screen text-gray-800'>
//             <div className='flex justify-center mt-12'>
//                 <button
//                     onClick={() => setOpen(true)}
//                     className='bg-blue-600 px-8 py-3 rounded text-xl font-medium active:scale-95 duration-100 transform cursor-pointer  '>
//                     {open ? "close" : "open"}
//                 </button>
//             </div>

//             <div className={`fixed top-0 left-0 w-64 h-full bg-white text-black z-50 shadow  ${open ? 'translate-x-0' : '-translate-x-full'}`}>
//                 <button
//                     onClick={() => setOpen(false)}
//                     className='absolute top-4 right-4 text-2xl text-red-600'>
//                     X
//                 </button>

//                 <div>
//                     <h2 className="text-2xl font-bold p-4 border border-black-b">Menu</h2>
//                     <div className="p-4 space-y-4">
//                         <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">Dashboard</div>
//                         <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">Users</div>
//                         <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">Settings</div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default TestPage;

"use client";
import { useState } from "react";

export default function SimplePagination() {
    // Dummy data (20 items)
    const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // প্রতি পেজে ৫টা দেখাবো

    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-6 max-w-md mx-auto text-black">

            {/* Content */}
            <div className="space-y-2 mb-6">
                {currentItems.map((item) => (
                    <div
                        key={item}
                        className="p-3 bg-gray-100 rounded border border-black"
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center gap-2">

                {/* Previous */}
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="px-3 py-1 border border-black rounded disabled:opacity-50 bg-white"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border border-black rounded bg-cyan-400 
              ${currentPage === page ? " text-white bg-cyan-600" : ""}`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="px-3 py-1 border border-black rounded disabled:opacity-50 bg-amber-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
