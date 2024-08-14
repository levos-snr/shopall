import React from "react";
import { Quote } from "lucide-react";

const ProductTestimonials = ({ reviews }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Testimonial</h3>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Reviewer"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h4 className="text-lg font-semibold text-gray-800">
              {review.reviewerName}
            </h4>
            <p className="text-sm text-gray-600">{review.comment}</p>
            <div className="mt-2 flex items-center justify-center text-pink-500">
              <Quote className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTestimonials;
