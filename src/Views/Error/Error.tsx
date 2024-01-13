import React from 'react';
//import { ViewContainer } from './Error.styles';
import { useRollbar } from '@rollbar/react';

type Props = {
  statusCode?: number;
  error?: Error | null;
};

const Error: React.FC<Props> = (props) => {
  const logging = useRollbar();
  React.useEffect(() => {
    if (props.statusCode !== 404)
      logging.error(`[${props.statusCode}] User on the error page`, {
        ...props,
      });
  }, []);

  const message = React.useMemo(() => {
    return props.statusCode === 404
      ? 'Ops, não encontramos o que você está procurando'
      : 'Desculpe, houve um erro inesperado, mas nosso time já foi avisado e vamos corrigir em breve';
  }, [props.statusCode, props.error]);

  return (
    <>
      <div>
        {props.statusCode === 404 && (
          <>
            <h1>{props.statusCode || 500}</h1>
          </>
        )}
        <p>{message}</p>
        {(props.statusCode === 500 ||
          props.statusCode === 404 ||
          !props.statusCode) && (
          <button onClick={() => (window.location.href = '/')}>
            Voltar para o início
          </button>
        )}
      </div>
    </>
  );
};

export default Error;
