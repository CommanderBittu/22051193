import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/common/Navbar';
import TopUsers from './components/TopUsers/TopUsers';
import TrendingPosts from './components/TrendingPosts/TrendingPosts';
import Feed from './components/Feed/Feed';
import { DataProvider } from './contexts/DataContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <Router>
          <div className="app">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/top-users" element={<TopUsers />} />
                <Route path="/trending-posts" element={<TrendingPosts />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="*" element={<Navigate to="/feed" replace />} />
              </Routes>
            </div>
          </div>
        </Router>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;