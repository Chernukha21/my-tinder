import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';

const EmptyState = () => {
  return (
    <div className="mt-20 flex items-center justify-center">
      <Card className="p-5">
        <CardHeader className="text-3xl text-secondary">
          There are no results for this filter
        </CardHeader>
        <CardBody className="text-center">Please select a different option</CardBody>
      </Card>
    </div>
  );
};

export default EmptyState;
