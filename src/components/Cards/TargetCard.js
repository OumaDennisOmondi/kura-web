import React from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";

function TargetCard({ title, action, value, children: image }) {
  return (
    <Card className="cursor-pointer" onClick={action}>
      <CardBody className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
            {title}
          </p>
          {image}
          <p className="text-xs mt-4 text-gray-600 dark:text-gray-400">
            {value}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export default TargetCard;
