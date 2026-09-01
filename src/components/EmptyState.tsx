import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useTranslations } from 'next-intl';

const EmptyState = () => {
  const translation = useTranslations('Empty_modal');
  return (
    <div className="mt-20 flex items-center justify-center">
      <Card className="p-5">
        <CardHeader className="text-3xl text-secondary">{translation('modal_header')}</CardHeader>
        <CardBody className="text-center">{translation('modal_body')}</CardBody>
      </Card>
    </div>
  );
};

export default EmptyState;
