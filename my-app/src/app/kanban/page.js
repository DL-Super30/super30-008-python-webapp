'use client';
export default function kanban(){
    return(
        <div className="mt-5"> 
            <div className="w-full h-[90vh] ">
                <div className="grid grid-cols-4 gap-2 	">
                    <div className="bg-[#FFEDD5] h-20 p-3 rounded-t-md border-t-4 border-t-[#A8A29E]">NOT CONTACTED</div>
                    <div className="bg-blue-200  h-20 p-3 rounded-t-md border-t-4 border-t-[#93C5FD]">ATTEMPTED</div>
                    <div className="bg-green-200  h-20 p-3 rounded-t-md border-t-4 border-t-[#86EFAC]">WARM LEAD</div>
                    <div className="bg-[#E0E7FF] h-20 p-3 rounded-t-md border-t-4 border-t-[#94A3B8]">COLD LEAD</div>
                    <div className="h-96 bg-[#E5E7EB] rounded-md"></div>
                    <div className="h-96 bg-[#E5E7EB] rounded-md"></div>
                    <div className="h-96 bg-[#E5E7EB] rounded-md"></div>
                    <div className="h-96 bg-[#E5E7EB] rounded-md"></div>
                   

                </div>
                
            </div>
        </div>
    )
}