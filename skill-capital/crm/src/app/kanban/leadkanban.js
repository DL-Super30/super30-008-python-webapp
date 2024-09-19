import React from "@heroicons/react";


function leadKanban() {

    return (


        <div className=" w-[100%] flex gap-x-2 items-center justify-evenly py-6 overflow-x-auto">

            <div className="grid gap-3 text-center max-w-[200px] ">

                <div className="min-w-96 border-1 bg-green-100 flex flex-col not-italic gap-2  rounded-lg text-sm">
                    <p>Not contacted</p>
                    <p>
                        $0.00
                        <span className="px-2">Leads</span>
                    </p>

                </div>
                <div className="w-full  h-full overflow-y-auto border-1 bg-gray-100">
                    <p>not found</p>
                </div>
            </div>

            <div className="grid gap-3 text-center  max-w-[200px]">
                <div className="min-w-96  border-1 bg-green-100 flex flex-col not-italic gap-2  rounded-lg text-sm">
                    <p>Attempted</p>
                    <p>
                        $0.00
                        <span className="px-2">Leads</span>
                    </p>

                </div>
                <div className="w-full h-full overflow-y-auto border-1 bg-gray-100">
                    <p>not found</p>
                </div>
            </div>

            <div className="grid gap-3 text-center  max-w-[200px]">
                <div className="min-w-96   border-1 bg-green-100 flex flex-col not-italic gap-2  rounded-lg text-sm ">
                    <p>Warm Lead</p>
                    <p>
                        $0.00
                        <span className="px-2">Leads</span>
                    </p>

                </div>
                <div className="w-full h-full border-1 bg-gray-100">
                    <p>not found</p>
                </div>
            </div>

            <div className="grid gap-3 text-center  max-w-[200px]">
                <div className="min-w-96  border-1 bg-green-100 flex flex-col not-italic gap-2  rounded-lg text-sm">
                    <p>Cold Lead</p>
                    <p>
                        $0.00
                        <span className="px-2">Leads</span>
                    </p>

                </div>
                <div className="w-full h-full  overflow-y-auto border-1 bg-gray-100">
                    <p>not found</p>
                </div>
            </div>



        </div>
    )

}
export default leadKanban;