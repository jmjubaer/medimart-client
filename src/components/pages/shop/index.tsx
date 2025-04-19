/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, Empty } from "antd";
import { IMedicine, IMeta } from "@/types";
import { getAllMedicines } from "@/services/Medicines";
import { SearchIcon, ShoppingCart } from "lucide-react";

type IData = {
  result: IMedicine[];
  meta: IMeta;
};

const ShopComponent = () => {
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    (async () => {
      const params = [
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: "_id" },
        { name: "searchTerm", value: searchTerm },
      ];

      if (minPrice > 0) {
        params.push({ name: "minPrice", value: minPrice });
      }
      if (maxPrice > 0) {
        params.push({ name: "maxPrice", value: maxPrice });
      }

      const { data } = await getAllMedicines(params);
      
      if (data) {
        setData(data);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, [searchTerm, page, isFetch, minPrice, maxPrice]);

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-3 sm:px-6 lg:px-4 min-h-screen py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Medicine Shop</h1>

        <div className="flex gap-5 flex-wrap">
          {/* filters */}
          <div className="w-full sm:max-w-[250px]">
            <h3 className="text-2xl font-bold text-gray-800 mb-5">Filters</h3>

            <div className="border p-3 border-gray-100 shadow-xs rounded-xl mb-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2 border-b border-b-gray-100">
                Category
              </h3>

              <div>backup</div>
            </div>
            <div className="border p-3 border-gray-100 shadow-xs rounded-xl">
              <h3 className="text-xl font-bold text-[#383546] mb-2 border-b border-b-gray-100">
                Price Range
              </h3>

              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  type="number"
                  min="0"
                  className="outline-0 bg-gray-200 w-full px-5 p-2 rounded-md"
                  placeholder="Min"
                />
                to
                <input
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  type="number"
                  min="0"
                  className="outline-0 bg-gray-200 w-full px-5 p-2 rounded-md"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <div className="relative w-80 h-fit ">
                <SearchIcon className="absolute top-1/2 right-2 w-5 text-gray-500 -translate-y-1/2" />
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  className="outline-0 bg-gray-200 w-full px-5 p-2 rounded-md"
                  placeholder="Search medicine . . . ."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              { !data?.result?.length ? <Empty /> : data?.result?.map((medicine: IMedicine) => (
                <Card
                  loading={loading}
                  key={medicine._id}
                  hoverable
                  cover={
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <Image
                        alt={medicine.name}
                        src={medicine.image}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  }
                  className="h-full flex flex-col overflow-hidden"
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{medicine.name}</h3>
                      <span className="font-bold text-blue-600">
                        ${medicine.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {medicine.description}
                    </p>

                    {/* <div className="flex flex-wrap gap-1 mb-3">
                {medicine.symptoms.map((symptom) => (
                  <Tag key={symptom} color="blue">
                    {symptom}
                  </Tag>
                ))}
                <Tag color="green">{medicine.category}</Tag>
                {medicine.requiresPrescription && (
                  <Tag color="red">Prescription Required</Tag>
                )}
              </div> */}

                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Manufacturer: {medicine.manufacturerDetails.name}</p>
                      {/* <p>Expiry: {new Date(medicine.expiryDate).getDate}</p> */}
                      <p
                        className={
                          medicine.quantity > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {medicine.quantity > 0
                          ? `In Stock (${medicine.quantity})`
                          : "Out of Stock"}
                      </p>
                    </div>
                  </div>

                  <button
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-all font-medium text-sm mt-5 w-full cursor-pointer hover:gap-3"
                    disabled={medicine.quantity <= 0}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopComponent;
