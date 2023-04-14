import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './routes/Home';
import PageDetail from './routes/PageDetail';
import PageRevisionDetail from './routes/PageRevisionDetail';
import NotFound from './routes/NotFound';
import MainLayout from './components/layouts/MainLayout';

const queryClient = new QueryClient();

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="page/:pageTitle">
          <Route index element={<PageDetail />} />
          <Route path=":timestamp" element={<PageRevisionDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
