"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(1);
    console.log(openIndex);
    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='w-full divide-y-2 divide-gray-300 '>
            {items.map((item, index) => (
                <div key={index}>
                    <button
                        onClick={() => toggleAccordion(index)}
                        className='flex items-center justify-between w-full px-5 py-4 bg-[#f4f4f4] sm:text-lg text-base cursor-pointer font-semibold hover:bg-[#dddddd] text-left'>
                        <span className='font-medium'>{item.title}</span>
                        {openIndex === index ? (
                            <ChevronUp size={25} />
                        ) : (
                            <ChevronDown size={25} />
                        )}
                    </button>
                    {openIndex === index && (
                        <div className=' p-5 text-gray-700 bg-white border-x border-gray-200'>
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
