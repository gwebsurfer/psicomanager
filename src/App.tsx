import RollbarProvider from './providers/RollbarProvider';
import { ErrorBoundary } from '@rollbar/react';
import { Home } from './views/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { ApiDataProvider } from './providers/ApiDataProvider';
import { ModalProvider } from './providers/ModalProvider';

function App() {
  return (
    <RollbarProvider>
      <ErrorBoundary>
        <ApiDataProvider>
          <ModalProvider>
            <Navbar />
            <Home />
          </ModalProvider>
        </ApiDataProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default App;
