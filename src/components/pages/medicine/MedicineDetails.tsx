"use client";

import { Tag, Divider, Row, Col, Image, Spin } from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import { CircleArrowRight, ShoppingCart } from "lucide-react";
import { IMedicine } from "@/types";
import { getSingleMedicine } from "@/services/Medicines";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/features/cart/cartSlice";
import Link from "next/link";

const MedicineDetails = ({ medicineId }: { medicineId: string }) => {
  const [medicine, setMedicine] = useState<IMedicine | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch=useAppDispatch();

  useEffect(() => {
    const getMedicine = async () => {
      setLoading(true);
      try {
        const data = await getSingleMedicine(medicineId);
        setMedicine(data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getMedicine();
  }, [medicineId]);

  return loading && medicine ? (
    <div className="flex justify-center items-center">
      <Spin />
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{medicine?.name} - Medicine Details</title>
        <meta name="description" content={medicine?.description} />
      </Head>

      <div className="relative bg-[url('https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2000&auto=format&fit=crop')] bg-linear-to-t from-sky-500 to-indigo-500 text-white py-16">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          <nav className="mb-4 text-sm text-blue-200">
            Home / Medicines / {medicine?.name}
          </nav>
          <h1 className="text-4xl font-bold mb-2">{medicine?.name}</h1>
          <div className="flex items-center gap-4">
            {medicine?.requiredPrescription && (
              <Tag color="red" className="text-base py-1">
                Prescription Required
              </Tag>
            )}
            <Tag
              color={medicine?.stockAvailability ? "green" : "red"}
              className="text-base py-1"
            >
              {medicine?.stockAvailability ? "In Stock" : "Out of Stock"}
            </Tag>
          </div>
        </div>
        <div className="bg-linear-to-r from-[#0000007e] to-[#0000007e] absolute inset-0"></div>
      </div>

      <main className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div className="border border-gray-50 rounded-lg overflow-hidden bg-gray-100 p-3 flex justify-center items-center">
                <Image
                  src={medicine?.image}
                  alt={medicine?.name}
                  preview={false}
                  className="w-full max-h-[500px] min-h-96 rounded-lg object-contain"
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">
                    ${medicine?.price.toFixed(2)}
                  </span>
                 <Link href={"/cart"}>
                 <button
                  onClick={()=>dispatch(addToCart({product:medicine!,quantity:1}))} 
                    disabled={!medicine?.stockAvailability}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-all font-medium text-sm cursor-pointer"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                 </Link>
                </div>

                <Divider />

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{medicine?.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Symptoms Treated
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {medicine?.symptoms.split(",").map((symptom, index) => (
                        <Tag key={index} color="blue" className="text-sm">
                          {symptom.trim()}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Expiry Date</h3>
                    <p className="text-gray-600">
                      {medicine?.expiryDate &&
                        new Date(medicine.expiryDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                    </p>
                  </div>

                  <Divider />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Manufacturer Details
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <ShopOutlined />
                        <span>{medicine?.manufacturerDetails.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneOutlined />
                        <span>{medicine?.manufacturerDetails.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <EnvironmentOutlined />
                        <span>{medicine?.manufacturerDetails.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <section className="mt-8 pt-8 border-t border-t-gray-100">
            <h2 className="text-2xl font-semibold mb-4">
              Important Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <h3 className="font-semibold mb-2">Safety Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <CircleArrowRight size={16} /> Read the label carefully
                    before use
                  </li>
                  <li className="flex items-center gap-3">
                    <CircleArrowRight size={16} /> Keep out of reach of children
                  </li>
                  <li className="flex items-center gap-3">
                    <CircleArrowRight size={16} /> Store in a cool dry place
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dosage Instructions</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <CircleArrowRight size={16} />
                    Consult your doctor for proper dosage
                  </li>
                  <li className="flex items-center gap-3">
                    <CircleArrowRight size={16} />
                    Do not exceed recommended dose
                  </li>
                  <li className="flex items-center gap-3">
                    <CircleArrowRight size={16} />
                    Take with food if stomach upset occurs
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MedicineDetails;
