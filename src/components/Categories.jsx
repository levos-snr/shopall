import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const Categories = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Category</h3>
      <Accordion type="single" collapsible>
        <AccordionItem value="clothes">
          <AccordionTrigger>Clothes</AccordionTrigger>
          <AccordionContent>List of clothes categories...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="glasses">
          <AccordionTrigger>Glasses</AccordionTrigger>
          <AccordionContent>List of glasses categories...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="footwear">
          <AccordionTrigger>Footwear</AccordionTrigger>
          <AccordionContent>List of footwear categories...</AccordionContent>
        </AccordionItem>
        {/* Add more categories here */}
      </Accordion>
    </div>
  );
};

export default Categories;
