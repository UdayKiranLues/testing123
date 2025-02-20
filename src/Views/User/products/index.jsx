import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/Cards";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CartList } from "../../../redux/slices/cartSlice";
import { useParams } from "react-router-dom";
import { authentication } from "../../../configure";

const sizes = ["All", "S", "M", "L", "XL"];
const colors = ["All", "Red", "Blue", "Green", "Yellow", "Orange", "White", "Brown", "Pink", "Navy Blue", "Grey"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
];

const ProductList = () => {
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [productsData, setProductsData] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { gender } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${authentication?.products_list}?page=0&limit=100&search=&category_uuid=${gender}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    }).then((res) => {
      setProductsData(res.data.data.result);
    });
    dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
  }, []);

  const filteredProducts = productsData.filter(
    (product) =>
      (selectedSize === "All" || product.size === selectedSize) &&
      (selectedColor === "All" || product.color === selectedColor) &&
      (selectedPriceRange.label === "All" ||
        (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max))
  );

  const applyFilters = () => {
    setIsFilterModalOpen(false);
  };

  const clearFilters = () => {
    setSelectedSize("All");
    setSelectedColor("All");
    setSelectedPriceRange(priceRanges[0]);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        {/* Mobile Filter Buttons */}
        <div className="md:hidden flex justify-between mb-4">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="px-4 py-2 border rounded-lg bg-purple-600 text-black"
            style={{
              backgroundColor: isFilterModalOpen && 'purple',
              color: isFilterModalOpen && 'white'
            }}
          >
            Filters
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 border rounded-lg bg-gray-200"
          >
            Clear
          </button>
        </div>

        {/* Sidebar Filters for Desktop */}
        <div className="hidden md:block bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Size Filter Accordion */}
          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center font-medium text-gray-700 py-2"
              onClick={() => setActiveFilter(activeFilter === "size" ? "" : "size")}
            >
              Size <span>{activeFilter === "size" ? "▲" : "▼"}</span>
            </button>
            {activeFilter === "size" && (
              <div className="flex flex-wrap gap-2 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    style={{
                      backgroundColor: selectedSize === size && 'purple'
                    }}
                    className={`px-3 py-1 border rounded-lg text-sm ${selectedSize === size ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter Accordion */}
          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center font-medium text-gray-700 py-2"
              onClick={() => setActiveFilter(activeFilter === "color" ? "" : "color")}
            >
              Color <span>{activeFilter === "color" ? "▲" : "▼"}</span>
            </button>
            {activeFilter === "color" && (
              <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    style={{
                      backgroundColor: selectedColor === color && 'purple'
                    }}
                    className={`px-3 py-1 border rounded-lg text-sm ${selectedColor === color ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter Accordion */}
          <div>
            <button
              className="w-full flex justify-between items-center font-medium text-gray-700 py-2"
              onClick={() => setActiveFilter(activeFilter === "price" ? "" : "price")}
            >
              Price <span>{activeFilter === "price" ? "▲" : "▼"}</span>
            </button>
            {activeFilter === "price" && (
              <div className="flex flex-col gap-2 mt-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    style={{
                      backgroundColor: selectedPriceRange.label === range.label && 'purple'
                    }}
                    className={`px-3 py-1 border rounded-lg text-sm ${selectedPriceRange.label === range.label ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    onClick={() => setSelectedPriceRange(range)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {/* Mobile Filter Modal */}
        {isFilterModalOpen && (
          <div className="md:hidden fixed inset-0 flex justify-center items-end z-50">
            {/* Transparent Overlay */}
            <div
              className="absolute inset-0 bg-transparent bg-opacity-30"
              onClick={() => setIsFilterModalOpen(false)} // Click outside to close
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full p-4 rounded-t-lg shadow-lg max-h-[80vh] overflow-y-auto z-50">
              <h2 className="text-lg font-semibold text-center">Filters</h2>

              {/* Size Filter */}
              <div className="mt-4">
                <div className="mb-4">
                  <button
                    className="w-full flex justify-between items-center font-medium text-gray-700 py-2"
                    onClick={() => setActiveFilter(activeFilter === "size" ? "" : "size")}
                  >
                    Size <span>{activeFilter === "size" ? "▲" : "▼"}</span>
                  </button>
                  {activeFilter === "size" && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          style={{
                            backgroundColor: selectedSize === size && 'purple'
                          }}
                          className={`px-3 py-1 border rounded-lg text-sm ${selectedSize === size ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Color Filter Accordion */}
                <div className="mb-4">
                  <button
                    className="w-full flex justify-between items-center font-medium text-gray-700 py-2"
                    onClick={() => setActiveFilter(activeFilter === "color" ? "" : "color")}
                  >
                    Color <span>{activeFilter === "color" ? "▲" : "▼"}</span>
                  </button>
                  {activeFilter === "color" && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          style={{
                            backgroundColor: selectedColor === color && 'purple'
                          }}
                          className={`px-3 py-1 border rounded-lg text-sm ${selectedColor === color ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Filter Accordion */}
                <div>
                  <button
                    className="w-full flex justify-between items-center font-medium text-gray-700 py-2"
                    onClick={() => setActiveFilter(activeFilter === "price" ? "" : "price")}
                  >
                    Price <span>{activeFilter === "price" ? "▲" : "▼"}</span>
                  </button>
                  {activeFilter === "price" && (
                    <div className="flex flex-col gap-2 mt-2">
                      {priceRanges.map((range) => (
                        <button
                          key={range.label}
                          style={{
                            backgroundColor: selectedPriceRange.label === range.label && 'purple'
                          }}
                          className={`px-3 py-1 border rounded-lg text-sm ${selectedPriceRange.label === range.label ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                          onClick={() => setSelectedPriceRange(range)}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* <h3 className="font-medium text-gray-700 mb-2">Size</h3> */}
                {/* <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 border rounded-lg text-sm ${
                selectedSize === size ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div> */}
              </div>

              {/* Apply and Clear Buttons */}
              <div className="flex justify-between mt-4">
                {/* <button
                  onClick={clearFilters}
                  className="px-4 py-2 border rounded-lg bg-gray-200"
                >
                  Clear
                </button> */}
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 border rounded-lg bg-purple-600 text-white w-full"
                  style={{
                    backgroundColor: 'purple'
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Product Grid */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard productData={product} key={product.uuid} />)
          ) : (
            <p className="text-gray-500 text-center col-span-2">No products match your filter criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
