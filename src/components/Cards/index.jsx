import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../configure";
import { CartList } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productData }) => {
    const { CartListData } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addtoCart = (data) => {
        const payload = {
            item_uuid: data.uuid,
            user_uuid: user?.user?.uuid,
            quantity: 1
        };
        axios.post(authentication.cart_add, payload, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(() => {
                dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const cartUpdate = (data, quantity) => {
        const payload = {
            item_uuid: data.uuid,
            user_uuid: user?.user?.uuid,
            quantity: quantity
        };
        axios.post(authentication.cart_add, payload, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(() => {
                dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const cartItem = CartListData?.find((item) => item.item_uuid === productData.uuid);

    return (
        <div className="p-2 w-full md:w-full">
            {/* Product Container */}
            <div className="relative text-center sm:text-left md:w-full">
                {/* Image - Full Width on Desktop */}
                <img
                    onClick={() => navigate(`/user/product/view/${productData?.uuid}`, {
                        state: productData
                    })}
                    src={productData?.image}
                    alt={productData?.name}
                    className="w-32 h-32 sm:w-24 sm:h-24 md:w-full md:h-64 object-cover rounded-lg shadow-md cursor-pointer"
                />

                {/* Product Details */}
                <div className="mt-2 md:w-full">
                    {/* Name - One Line */}
                    <h3 className="text-lg sm:text-sm font-semibold truncate cursor-pointer"
                        onClick={() => navigate(`/user/product/view/${productData?.uuid}`, {
                            state: productData
                        })}
                    >
                        {productData?.name}
                    </h3>

                    {/* Description - Two Lines */}
                    <p className="text-sm sm:text-xs text-gray-600 line-clamp-2 cursor-pointer"
                        onClick={() => navigate(`/user/product/view/${productData?.uuid}`, {
                            state: productData
                        })}
                    >
                        {productData?.description || "Premium quality product for everyday use."}
                    </p>

                    {/* Price - On New Line */}
                    <p className="text-lg sm:text-sm font-bold mt-1">${productData?.price}</p>

                    {/* Add to Cart Button */}
                    {cartItem ? (
                        <div className="inline-flex rounded-lg bg-white text-black mt-3">
                            <button
                                onClick={() => cartUpdate(productData, -1)}
                                className="px-4 py-2 sm:px-3 sm:py-1 md:px-4 md:py-2 font-medium border-r rounded-l-lg hover:bg-gray-200 sm:text-xs">
                                -
                            </button>
                            <span className="px-4 py-2 sm:px-3 sm:py-1 md:px-4 md:py-2 sm:text-xs">{cartItem.quantity}</span>
                            <button
                                onClick={() => cartUpdate(productData, 1)}
                                className="px-4 py-2 sm:px-3 sm:py-1 md:px-4 md:py-2 font-medium border-l rounded-r-lg hover:bg-gray-200 sm:text-xs">
                                +
                            </button>
                        </div>
                    ) : (
<button
    onClick={() => addtoCart(productData)}
    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold 
               px-5 py-2 text-base 
               sm:px-2 sm:py-1 sm:text-xs
               md:px-5 md:py-2 md:text-sm 
               rounded-lg shadow-lg transition">
    ADD
</button>


                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
