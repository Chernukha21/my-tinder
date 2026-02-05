import { Card, CardBody, CardHeader } from '@heroui/card';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { CardFooter } from '@heroui/react';
import { Button } from '@heroui/button';

type Props = {
  body?: ReactNode;
  headerIcon: IconType;
  headerText: string;
  subHeaderText?: string;
  action?: () => void;
  actionLabel?: string;
  footer?: ReactNode;
};

const CardWrapper = ({
  headerText,
  headerIcon: Icon,
  subHeaderText,
  action,
  actionLabel,
  body,
  footer,
}: Props) => {
  return (
    <div className="vertical-center flex items-center justify-center">
      <Card className="mx-auto w-[50%] p-5">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-secondary">
            <div className="flex flex-row items-center gap-3">
              <Icon size={30} />
              <h1 className="text-3xl font-semibold">{headerText}</h1>
            </div>
            {subHeaderText && <p className="text-neutral-500">{subHeaderText}</p>}
          </div>
        </CardHeader>
        {body && <CardBody>{body}</CardBody>}
        <CardFooter>
          {action && (
            <Button onPress={action} fullWidth color="secondary" variant="bordered">
              {actionLabel}
            </Button>
          )}
          {footer && <>{footer}</>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
