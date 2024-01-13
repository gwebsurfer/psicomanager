import React, { PropsWithChildren } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import type Rollbar from 'rollbar';
import { getRollbarConfig } from '../utils/rollbar';
import Error from '../Views/Error/Error';

const RollbarProvider: React.FC<PropsWithChildren<{ instance?: Rollbar }>> = ({
  children,
  instance,
}) => {
  return (
    <Provider
      {...(instance ? { instance } : { config: getRollbarConfig() })}
      instance={instance}
    >
      <ErrorBoundary fallbackUI={Error}>{children}</ErrorBoundary>
    </Provider>
  );
};

export default RollbarProvider;
