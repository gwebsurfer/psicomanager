/* eslint-disable camelcase */
import Rollbar, { Configuration, LogArgument } from 'rollbar';

type LoggingTypes =
  | 'log'
  | 'error'
  | 'info'
  | 'debug'
  | 'critical'
  | 'warn'
  | 'warning';

const clientToken = import.meta.env.VITE_REACT_APP_PUBLIC_ROLLBAR_CLIENT_TOKEN;

export const hasToken = clientToken;

const getRollbarEnvironment = () => {
  return import.meta.env.VITE_REACT_APP_PUBLIC_ROLLBAR_ENV;
};

export const getRollbarConfig = () => {
  return {
    environment: getRollbarEnvironment(),
    accessToken: clientToken || '',
    retryInterval: 1000,
    captureUncaught: true,
    captureUnhandledRejections: true,
    addErrorContext: true,
    payload: {
      client: {
        javascript: {
          source_map_enabled: true,
          code_version: '1.0.0',
          guess_uncaught_frames: true,
        },
      },
    },
  } as Configuration;
};

export const createRollbarInstance = () =>
  hasToken ? new Rollbar(getRollbarConfig()) : undefined;

const rollbarInstance = createRollbarInstance();

const handleRollbarLog =
  (type: LoggingTypes) =>
  (...args: LogArgument[]) => {
    if (rollbarInstance) rollbarInstance[type](...args);
  };

const rollbar = {
  log: handleRollbarLog('log'),
  error: handleRollbarLog('error'),
  info: handleRollbarLog('info'),
  debug: handleRollbarLog('debug'),
  critical: handleRollbarLog('critical'),
  warn: handleRollbarLog('warn'),
  warning: handleRollbarLog('warning'),
};

export default rollbar;
