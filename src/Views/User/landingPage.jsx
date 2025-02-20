import React from "react";
import maleModel from './../../assets/images/maleModel.png';
import femaleModel from './../../assets/images/femaleModel.png';
import { useNavigate } from "react-router-dom";

export default function FashionBanner() {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#fbe8e5] px-6">
            {/* Content - Always Centered */}
            <div className="text-center max-w-2xl z-10 mb-6 lg:mb-0">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">Find Your Style</h2>
                <h1 className="text-4xl lg:text-5xl font-bold text-red-500">With Yourself</h1>
                <p className="mt-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
            </div>

            {/* Images - Stack in Mobile, Left & Right in Desktop */}
            <div className="flex flex-row lg:flex-col justify-center gap-4 w-full lg:w-auto">
                {/* Left Model (Absolute on Desktop) */}
                <div className="relative lg:absolute lg:left-10 bottom-0">
                    <div className="absolute -z-10 top-[-20px] left-5 w-16 h-16 lg:w-32 lg:h-32 bg-red-500 rounded-full"></div>
                    <img
                        onClick={() => navigate('/user/products/CAT-58A965CC')}
                        src={maleModel}
                        alt="Male Model"
                        className="h-[250px] lg:h-[600px] object-contain cursor-pointer"
                    />
                </div>

                {/* Right Model (Absolute on Desktop) */}
                <div className="relative lg:absolute lg:right-10 bottom-0">
                    <div className="absolute -z-10 top-[-20px] right-5 w-16 h-16 lg:w-32 lg:h-32 bg-red-500 rounded-full"></div>
                    <img
                        onClick={() => navigate('/user/products/CAT-57EA31AE')}
                        src={femaleModel}
                        alt="Female Model"
                        className="h-[250px] lg:h-[600px] object-contain cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
