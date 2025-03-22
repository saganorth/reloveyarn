import React, { useState } from 'react';
import Header from '../../component/ui/Header';
import Footer from '../../component/ui/Footer';
const faqData = [
  { 
    question: "What is ReLoveYarn?", 
    answer: "ReLoveYarn is a passion-driven crochet brand that focuses on sustainable and handmade products for your unique style." 
  },
  { 
    question: "Do you ship internationally?", 
    answer: "Yes! We ship worldwide. Shipping times vary depending on location." 
  },
  { 
    question: "How long does it take to receive an order?", 
    answer: "Each piece is handmade, so production time is 1-3 weeks before shipping. We’ll update you via email once your order is on the way!" 
  },
  { 
    question: "Can I request a custom design?", 
    answer: "Absolutely! Use our form to requset a ." 
  },
  { 
    question: "What materials do you use?", 
    answer: "We use a mix of recycled yarn, organic cotton, and high-quality wool to ensure durability and comfort." 
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
      <><Header /><div className="max-w-3xl mx-auto mt-12 p-8 bg-pink-100 border-2 border-gray-300 shadow-md rounded-lg font-serif">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
              🎀 ReLoveYarn FAQ 🎀
          </h1>
          <p className="text-center text-gray-700 italic mb-6">
              All your burning questions, answered! ✨
          </p>

          {/* FAQ Section */}
          <div className="space-y-6">
              {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-400 pb-4">
                      <button
                          className="w-full text-left font-bold text-xl text-gray-800 hover:text-pink-600 transition-all"
                          onClick={() => toggleAnswer(index)}
                      >
                          {openIndex === index ? '💗 ' : '💖 '} {faq.question}
                      </button>
                      {openIndex === index && (
                          <p className="mt-2 text-gray-700 text-lg pl-6">{faq.answer}</p>
                      )}
                  </div>
              ))}
          </div>
      </div><Footer /></>
  );
};

export default FAQPage;
