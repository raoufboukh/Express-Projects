"use client";
import React, { useState } from "react"; 
import { faqs } from "../../components/constants";
import ContactTeam from "@/components/Team/ContactTeam";

interface FaqItem {
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <div className="pages">
        <div className="container mx-auto lg:px-20 px-4">
          <h2 className="h2">Frequently Asked Questions</h2>
        </div>
      </div>

      <div className="container lg:px-20 px-4 gap-10 my-20 mx-auto">
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq: FaqItem, index: number) => (
            <div key={index} className="border border-gray-300 rounded-md mb-4">
              <button
                className="w-full text-left p-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg">{faq.question}</span>
                <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border-t border-gray-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div> 
      <ContactTeam/>
    </section>
   
  );
};

export default Faq;
