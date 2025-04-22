
"use client";
//eslint-skip-disable
import { useEffect, useState } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { getAllMedicines } from "@/services/Medicines";
import { IMedicine, IMeta } from "@/types";
import { useAppDispatch } from "@/redux/hook";
import { Calendar, DollarSign, Package } from 'lucide-react';
import Link from "next/link";
import { addToCart } from "@/redux/features/cart/cartSlice";

type IData = {
  result: IMedicine[];
  meta: IMeta;
};

const FeaturedSection = () => {
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getAllMedicines();
        if (data) {
          setData(data);
        }
      } catch (err) {
        console.error("Error fetching medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Featured Medicines
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully selected range of premium medicines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.result.slice(0, 8).map((medicine, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.01]">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={medicine.image}
                  alt={medicine.name}
                />
              </div>
              <div className="px-5 mt-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[16px] font-semibold text-gray-800">{medicine.name}</h3>
                  <div className="flex items-center">
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${medicine.requiredPrescription
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                      }`}>
                      {medicine.requiredPrescription ? 'Rx Required' : 'OTC'}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-3 w-auto ml-0">{medicine.description}</p>

                <div className="flex items-center text-gray-700 mb-1">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">${medicine.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center text-gray-700 mb-1">
                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                  <span>
                    <span className={medicine.quantity < 500 ? 'text-red-600 font-medium' : 'font-medium'}>
                      {medicine.quantity}
                    </span> units in stock
                  </span>
                </div>

                <div className="flex items-center text-gray-700 mb-3">
                  <Calendar className="h-4 w-4 mr-2 mt-0 text-gray-500" />
                  <span>Expires: {new Date(medicine.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="px-5  mb-2">
             <button
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-all font-medium text-sm mt-5 w-full cursor-pointer hover:gap-3"
                disabled={medicine.quantity <= 0}
                onClick={() => dispatch(addToCart({ product: medicine!, quantity: 1 }))}

              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <Link href={`/medicine/${medicine?._id}`}>
                <button
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-all font-medium text-sm mt-5 w-full cursor-pointer hover:gap-3"
                  disabled={medicine.quantity <= 0}
                >
                  View Details
                </button>
              </Link>
             </div>
            </div>
          ))}
        </div>
      </div>
      <Link href="/shop">
        <button className="mt-8 mx-auto flex items-center justify-center gap-2 px-4 py-2 border border-primary rounded-md text-primary hover:text-primary/80 hover:border-primary/80 transition-colors">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </Link>
    </section>
  );
};

export default FeaturedSection;
