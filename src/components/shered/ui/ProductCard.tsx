import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { IProduct } from "@/types";
import { ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ medicine }: { medicine: IProduct }) => {
    const dispatch = useAppDispatch();
    return (
        <div className='h-full'>
            <div className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col'>
                <div className='relative'>
                    <div className='h-48 bg-gray-100 flex items-center justify-center overflow-hidden'>
                        <Image
                            alt={medicine.name}
                            src={medicine.image || "/placeholder.svg"}
                            width={500}
                            height={500}
                            className='object-cover w-full h-full hover:scale-105 transition-transform duration-300'
                        />
                    </div>

                    {medicine.requiredPrescription && (
                        <div className='absolute top-3 right-3 bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1'>
                            <Tag size={12} />
                            Prescription Required
                        </div>
                    )}

                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3'>
                        <div className='font-bold text-lg line-clamp-1'>
                            ${medicine.price.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className='p-4 flex-grow flex flex-col'>
                    <Link
                        href={`/medicine/${medicine._id}`}
                        className='font-semibold text-lg hover:text-blue-600 transition-colors line-clamp-1 mb-1'>
                        {medicine.name}
                    </Link>

                    <div className='text-xs text-gray-500 space-y-1 mb-4'>
                        <div className='flex items-center justify-between'>
                            <span>Manufacturer:</span>
                            <span className='font-medium text-gray-700'>
                                {medicine.manufacturerDetails.name}
                            </span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Stock:</span>
                            <span
                                className={`font-medium ${
                                    medicine.quantity > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}>
                                {medicine.quantity > 0
                                    ? `${medicine.quantity} units`
                                    : "Out of Stock"}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            dispatch(
                                addToCart({
                                    product: medicine,
                                    type: "medicine",
                                    quantity: 1,
                                })
                            )
                        }
                        className={`flex items-center cursor-pointer justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-medium text-sm w-full ${
                            medicine.quantity > 0
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={medicine.quantity <= 0}>
                        <ShoppingCart size={16} />
                        {medicine.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
