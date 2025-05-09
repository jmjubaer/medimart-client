import { IOrder, IOrderProduct } from "@/types/order.type";
import Image from "next/image";
import Link from "next/link";
import AddReviewModal from "./AddReviewModal";

const ReviewProductCard = ({product,order}: {product: IOrderProduct,order:IOrder}) => {
    return (
        <div
            key={product?.product?._id}
            className='mt-4 flex items-center gap-1 xs:gap-3'>
            <Image
                width={100}
                height={100}
                src={product?.product?.image}
                alt=''
                className='w-24 h-24 border border-gray-300 object-cover rounded-md'
            />
            <div className=''>
                <Link
                    href={`/medicine/${product.product?._id}`}
                    className='text-lg font-semibold secondary_font'>
                    {product?.product?.name?.length > 13 &&
                    order?.products?.length > 1 ? (
                        <>
                            {product?.product?.name?.slice(0, 13)}
                            {"...."}
                        </>
                    ) : (
                        product?.product?.name
                    )}
                </Link>
                <p className='my-1 text-lg font-semibold '>
                    <span className='font-medium text-lg mr-2'> Price:</span>$
                    {product?.product?.price}
                </p>
                {order?.status === "Delivered" ? (
                    <AddReviewModal product={product.product} />
                ) : (
                    <p className='my-1 text-lg font-semibold '>
                        <span className='font-medium text-lg mr-2'>
                            {" "}
                            Quantity:
                        </span>
                        {product?.quantity}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ReviewProductCard;
