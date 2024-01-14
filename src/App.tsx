import RollbarProvider from './providers/RollbarProvider';
import { ErrorBoundary } from '@rollbar/react';
import { Home } from './views/Home/Home';

function App() {
  return (
    <RollbarProvider>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default App;
