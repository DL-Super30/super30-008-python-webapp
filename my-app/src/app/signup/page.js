'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
export default function signup(props) {

    const {setShowSignUp} = props;

    return (
        <div className=" bg-black w-full h-[100vh] pt-14 absolute top-0 bg-opacity-70">
            <div className="w-1/4 h-[400px] mx-auto bg-white " >
                <div className="w-full h-14 flex justify-between items-center bg-red-600 p-2">
                    <h3 className="text-3xl text-white text-start font-medium mt-[5px] ">Start Now </h3>
                    <button className='text-3xl text-white'><FontAwesomeIcon icon={faXmark} onClick={() => setShowSignUp(false)}/></button>
                </div> 
                <div className='p-4'>
                    <h4 className=" mt-[15px]">Name*</h4>
                    <input type="text" className="w-full p-2 border-2 border-solid border-grey "></input>
                    <h4 className="" >phone*</h4>
                    <div className='flex'>
                    <h1 type="text" value="91" className="w-1/5 p-2 border-2 border-solid border-grey " >91</h1>
                    <input type="text" value="" className="w-4/5 p-2 border-2 border-solid border-grey" ></input>
                    </div>
                    <h4 className=" mt-[10px]">Email*</h4>
                    <input type="text" className="w-full p-2 border-2 border-solid border-grey "></input>
                    <button className="w-[120px] p-2 bg-red-500 text-white ml-5 mt-4">SUBMIT</button>
                    </div>
            </div>
        </div>
    );

}