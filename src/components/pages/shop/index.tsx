"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { Empty, Spin } from "antd";
import type { IProduct, IMeta } from "@/types";
import {
    SearchIcon,
    ShoppingCart,
    Filter,
    ChevronDown,
    Tag,
} from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Layout } from "antd";
import { getAllProducts } from "@/services/Products";

const { Sider } = Layout;
type ApiResponse = {
    data: {
        result: IProduct[];
        meta: IMeta;
    };
};

const ShopComponent = () => {
    const [medicines, setMedicines] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const [requiredPrescription, setRequiredPrescription] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSort, setSelectedSort] = useState("default");
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useAppDispatch();

    const sortOptions = [
        { label: "Default", value: "default" },
        { label: "Name (A-Z)", value: "name_asc" },
        { label: "Name (Z-A)", value: "name_desc" },
        { label: "Price (Low to High)", value: "price_asc" },
        { label: "Price (High to Low)", value: "price_desc" },
    ];
    const productTypeOptions = [
        { label: "All Product", value: "" },
        { label: "Medicine", value: "medicine" },
        { label: "Instrument", value: "instrument" },
    ];

    const observer = useRef<IntersectionObserver | null>(null);

    const lastMedicineElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading || loadingMore) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        setPage((prevPage) => prevPage + 1);
                        setLoadingMore(true);
                    }
                },
                { threshold: 0.5 }
            );

            if (node) observer.current.observe(node);
        },
        [loading, loadingMore, hasMore]
    );

    const fetchMedicines = useCallback(
        async (pageNum: number, isNewSearch: boolean) => {
            try {
                let sortField = "_id";

                if (selectedSort !== "default") {
                    const [field, direction] = selectedSort.split("_");

                    sortField = direction === "desc" ? `-${field}` : field;
                }

                const params = [
                    { name: "page", value: pageNum },
                    { name: "limit", value: 10 },
                    { name: "sort", value: sortField },
                    { name: "searchTerm", value: searchTerm },
                    {
                        name: "requiredPrescription",
                        value: requiredPrescription,
                    },
                    ...(type ? [{ name: "type", value: type }] : []),
                ];

                if (minPrice > 0) {
                    params.push({ name: "minPrice", value: minPrice });
                }
                if (maxPrice > 0) {
                    params.push({ name: "maxPrice", value: maxPrice });
                }

                // console.log("Fetching page", pageNum, "with params:", params);

                const response: ApiResponse = await getAllProducts(params);
                const { result, meta } = response.data;

                if (isNewSearch) {
                    setMedicines(result);
                } else {
                    setMedicines((prev) => [...prev, ...result]);
                }

                const currentlyLoaded = isNewSearch
                    ? result.length
                    : medicines.length + result.length;
                setHasMore(result.length > 0 && currentlyLoaded < meta.total);

                console.log(
                    "Loaded items:",
                    currentlyLoaded,
                    "Total items:",
                    meta.total,
                    "Has more:",
                    currentlyLoaded < meta.total
                );
            } catch (error) {
                console.error("Failed to fetch medicines:", error);
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        [
            searchTerm,
            requiredPrescription,
            minPrice,
            maxPrice,
            selectedSort,
            medicines.length,
            type,
        ]
    );

    useEffect(() => {
        setLoading(true);
        setMedicines([]);
        setPage(1);
        setHasMore(true);
        fetchMedicines(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, requiredPrescription, minPrice, maxPrice, selectedSort,type]);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (page > 1) {
            fetchMedicines(page, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const getSortedMedicines = () => {
        if (selectedSort === "default" || !medicines.length) {
            return medicines;
        }

        const [field, direction] = selectedSort.split("_");

        return [...medicines].sort((a, b) => {
            if (field === "name") {
                return direction === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (field === "price") {
                return direction === "asc"
                    ? a.price - b.price
                    : b.price - a.price;
            }
            return 0;
        });
    };

    const sortedMedicines = getSortedMedicines();

    const clearFilters = () => {
        setSearchTerm("");
        setRequiredPrescription(false);
        setMinPrice(0);
        setMaxPrice(0);
        setSelectedSort("default");
    };

    return (
        <div className='bg-gray-100 h-fit'>
            <Layout>
                <Sider
                    width={280}
                    theme='light'
                    breakpoint='lg'
                    collapsedWidth='0'>
                    {/* Filter and search section */}
                    <div
                        style={{ scrollbarWidth: "none" }}
                        className=' sticky h-[calc(100vh)] overflow-auto top-0 left-0 border-r border-gray-300 text-base pr-3 bg-white'>
                        <div className='p-5 py-3 border-b border-gray-100'>
                            <div className='flex items-center gap-2'>
                                <Filter size={18} className='text-gray-500' />
                                <h3 className='text-lg font-semibold'>
                                    Filters
                                </h3>
                            </div>
                        </div>
                        {/* search */}
                        <div className='p-5 py-3 border-b border-gray-100'>
                            <h4 className='font-medium mb-3 text-gray-700'>
                                Search
                            </h4>
                            <div className='relative'>
                                <input
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    value={searchTerm}
                                    type='text'
                                    className='w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                                    placeholder='Search medicines...'
                                />
                                <SearchIcon className='absolute top-1/2 right-3 w-4 h-4 text-gray-400 -translate-y-1/2' />
                            </div>
                        </div>
                        {/* product type */}
                        <div className='p-5 py-3 border-b border-gray-100'>
                            <h4 className='font-medium mb-3 text-gray-700'>
                                Product Type
                            </h4>
                            <div className='relative'>
                                <select
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none'
                                    onChange={(e) => setType(e.target.value)}
                                    value={type}>
                                    {productTypeOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className='absolute top-1/2 right-3 w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none' />
                            </div>
                        </div>
                        {/* sort by */}
                        <div className='p-5 py-3 border-b border-gray-100'>
                            <h4 className='font-medium mb-3 text-gray-700'>
                                Sort By
                            </h4>
                            <div className='relative'>
                                <select
                                    className='w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none'
                                    onChange={(e) =>
                                        setSelectedSort(e.target.value)
                                    }
                                    value={selectedSort}>
                                    {sortOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className='absolute top-1/2 right-3 w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none' />
                            </div>
                        </div>
                        {/* prescription filter */}
                        <div className='p-5 py-3 border-b border-gray-100'>
                            <h4 className='font-medium mb-3 text-gray-700'>
                                Prescription
                            </h4>
                            <label className='flex items-center justify-between cursor-pointer'>
                                <span className='text-sm text-gray-600'>
                                    Required Prescription Only
                                </span>
                                <div className='relative'>
                                    <input
                                        onChange={() =>
                                            setRequiredPrescription(
                                                !requiredPrescription
                                            )
                                        }
                                        type='checkbox'
                                        className='sr-only peer'
                                        checked={requiredPrescription}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </div>
                            </label>
                        </div>
                        {/* price range */}
                        <div className='p-5 py-3'>
                            <h4 className='font-medium mb-3 text-gray-700'>
                                Price Range
                            </h4>
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className='text-xs text-gray-500 mb-1 block'>
                                        Min Price
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setMinPrice(Number(e.target.value))
                                        }
                                        value={minPrice || ""}
                                        type='number'
                                        min='0'
                                        className='w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                                        placeholder='0'
                                    />
                                </div>
                                <div>
                                    <label className='text-xs text-gray-500 mb-1 block'>
                                        Max Price
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setMaxPrice(Number(e.target.value))
                                        }
                                        value={maxPrice || ""}
                                        type='number'
                                        min='0'
                                        className='w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
                                        placeholder='1000'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Sider>
                {/* Product section */}
                <Layout>
                    <div
                        ref={contentRef}
                        style={{ scrollbarWidth: "none" }}
                        className=' h-[calc(100vh)] overflow-auto  lg:p-5 p-3 '>
                        {loading && medicines.length === 0 ? (
                            <div className='flex justify-center items-center h-[50vh]'>
                                <Spin size='large' />
                            </div>
                        ) : !medicines.length ? (
                            <div className='flex flex-col justify-center items-center h-[50vh] bg-white rounded-xl p-8 shadow-sm'>
                                <Empty description='No medicines found matching your criteria' />
                                <button
                                    onClick={clearFilters}
                                    className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {sortedMedicines.map(
                                    (product: IProduct, index: number) => (
                                        <div
                                            key={`${product._id}-${index}`}
                                            ref={
                                                index ===
                                                sortedMedicines.length - 1
                                                    ? lastMedicineElementRef
                                                    : null
                                            }
                                            className='h-full'>
                                            <div className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col'>
                                                <div className='relative'>
                                                    <div className='h-48 bg-gray-100 flex items-center justify-center overflow-hidden'>
                                                        <Image
                                                            alt={product.name}
                                                            src={
                                                                product.image ||
                                                                "/placeholder.svg"
                                                            }
                                                            width={500}
                                                            height={500}
                                                            className='object-cover w-full h-full hover:scale-105 transition-transform duration-300'
                                                        />
                                                    </div>

                                                    {product.requiredPrescription && (
                                                        <div className='absolute top-3 right-3 bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1'>
                                                            <Tag size={12} />
                                                            Prescription
                                                            Required
                                                        </div>
                                                    )}

                                                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3'>
                                                        <div className='font-bold text-lg line-clamp-1'>
                                                            $
                                                            {product.price.toFixed(
                                                                2
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='p-4 flex-grow flex flex-col'>
                                                    <Link
                                                        href={`/medicine/${product._id}`}
                                                        className='font-semibold text-lg hover:text-blue-600 transition-colors line-clamp-1 mb-1'>
                                                        {product.name}
                                                    </Link>

                                                    <div className='text-xs text-gray-500 space-y-1 mb-4'>
                                                        <div className='flex items-center justify-between'>
                                                            <span>
                                                                Manufacturer:
                                                            </span>
                                                            <span className='font-medium text-gray-700'>
                                                                {
                                                                    product
                                                                        .manufacturerDetails
                                                                        .name
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span>Stock:</span>
                                                            <span
                                                                className={`font-medium ${
                                                                    product.quantity >
                                                                    0
                                                                        ? "text-green-600"
                                                                        : "text-red-600"
                                                                }`}>
                                                                {product.quantity >
                                                                0
                                                                    ? `${product.quantity} units`
                                                                    : "Out of Stock"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            dispatch(
                                                                addToCart({
                                                                    product:
                                                                        product,
                                                                    quantity: 1,
                                                                    type: product?.type,
                                                                })
                                                            )
                                                        }
                                                        className={`flex cursor-pointer items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-medium text-sm w-full ${
                                                            product.quantity > 0
                                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                        }`}
                                                        disabled={
                                                            product.quantity <=
                                                            0
                                                        }>
                                                        <ShoppingCart
                                                            size={16}
                                                        />
                                                        {product.quantity > 0
                                                            ? "Add to Cart"
                                                            : "Out of Stock"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {loadingMore && (
                            <div className='flex justify-center items-center py-8'>
                                <Spin size='default' />
                            </div>
                        )}

                        {!hasMore && medicines.length > 0 && (
                            <div className='text-center text-gray-500 py-8 bg-white rounded-lg mt-6 shadow-sm'>
                                <p className='font-medium'>
                                    You have reached the end
                                </p>
                                <p className='text-sm'>
                                    No more medicines to load
                                </p>
                            </div>
                        )}
                    </div>
                </Layout>
            </Layout>
        </div>
    );
};

export default ShopComponent;
