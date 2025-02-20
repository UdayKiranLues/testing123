import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { authentication } from "../../../configure";
import { CartList } from "../../../redux/slices/cartSlice";
import axios from "axios";

const ProductView = () => {
    const { state } = useLocation();
    const [selectedSize, setSelectedSize] = useState(null);

    const { CartListData } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const addtoCart = (data) => {
        const payload = {
            item_uuid: data.uuid,
            user_uuid: user?.user?.uuid,
            quantity: 1
        };
        axios.post(authentication.cart_add, payload, {
            headers: { Authorization: `Bearer ${user?.accessToken}` }
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
            headers: { Authorization: `Bearer ${user?.accessToken}` }
        })
            .then(() => {
                dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const cartItem = CartListData?.find((item) => item.item_uuid === state.uuid);

    return (
<div className="max-w-4xl mx-auto p-4">
    {/* Mobile View: Image First, Details Below */}
    <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-2/5">
            <img
                src={state?.image_url}
                alt={state?.name}
                className="w-full object-cover rounded-lg shadow-md"
            />
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-3/5 px-4 md:px-8 mt-4 md:mt-0">
            <h2 className="text-xl font-semibold">{state?.name}</h2>

            <div className="text-red-600 text-2xl font-bold">${state?.price}.00</div>

            <div className="flex items-center space-x-1">
                <span>⭐️⭐️⭐️☆☆</span>
                <span className="text-gray-500">(3.3) 25 Reviews</span>
            </div>

            <div className="text-gray-700">
                <span className="font-medium">Color:</span> {state?.color}
            </div>

            <div>
                <h3 className="font-medium mb-2">REGULAR</h3>
                <p className="text-gray-600">
                    A balance of casual and cool, this style works for anyone who loves laid-back comfort with a fashion-forward twist.
                </p>
            </div>

            <div>
                <span className="font-medium">Size :</span> {state?.size}
            </div>

            {/* Cart Buttons */}
            {cartItem ? (
                <div className="inline-flex rounded-md shadow-md mt-4">
                    <button
                        onClick={() => cartUpdate(state, -1)}
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100"
                    >
                        -
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-300">
                        {cartItem.quantity}
                    </span>
                    <button
                        onClick={() => cartUpdate(state, 1)}
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => addtoCart(state)}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg shadow-md transition"
                >
                    ADD TO CART
                </button>
            )}
        </div>
    </div>
</div>

    );
};

export default ProductView;
