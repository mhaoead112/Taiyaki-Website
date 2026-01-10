import React, { useState } from 'react';
import { ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import Navbar from './../components/NavBar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { apiGet, buildApiUrl } from '../utils/apiClient';
import { useToast } from '../context/toastContext';


export default function Branches() {
  const api = import.meta.env.VITE_API_URL;
  const { showToast } = useToast();

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!api) {
        setError('Missing VITE_API_URL. Please set the API base URL in your environment.');
        return;
      }
      const res = await apiGet(buildApiUrl(api, '/api/branches'));
      
      if (res.data && res.data.length > 0) {
        setBranches(res.data.map((b, i) => ({
          ...b,
          key: i,
        })));
      } else {
        setError("No branches available at the moment.");
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError("The server is taking longer than expected to respond. This usually happens when the backend is waking up. Please try again.");
        showToast('Server waking up, please retry', 'info');
      } else if (err.message.includes('Network Error')) {
        setError("Unable to connect to the server. Please check your internet connection and try again.");
        showToast('Network error. Check your connection.', 'error');
      } else {
        setError("Failed to load branch information. Please try again later.");
        showToast('Failed to load branches', 'error');
      }
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    fetchBranches();
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <section className="bg-black text-white py-20 px-6">
      <div className="h-10 bg-gray-800 rounded w-64 mx-auto mb-16 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-zinc-900 border-2 border-gray-700 rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="w-full h-56 sm:h-64 md:h-60 lg:h-56 bg-gray-800"></div>
            <div className="p-6">
              <div className="h-7 bg-gray-800 rounded mb-2"></div>
              <div className="h-5 bg-gray-800 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // Error component
  const ErrorDisplay = () => (
    <section className="bg-black text-white py-20 px-6 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        {error.includes('waking up') && (
          <p className="text-sm text-gray-500 mb-6">
            💡 Our server on Render goes to sleep after inactivity. It may take 30-60 seconds to wake up.
          </p>
        )}
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
          {isRetrying ? 'Retrying...' : 'Try Again'}
        </button>
      </div>
    </section>
  );

  // Empty state component
  const EmptyState = () => (
    <section className="bg-black text-white py-20 px-6 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">No Branches Available</h2>
        <p className="text-gray-400 mb-6">We don't have any branch information at the moment. Please check back later!</p>
        <button
          onClick={handleRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
        >
          Refresh
        </button>
      </div>
    </section>
  );

  return (
    <>
    <Navbar />
    {loading ? (
      <LoadingSkeleton />
    ) : error ? (
      <ErrorDisplay />
    ) : branches.length === 0 ? (
      <EmptyState />
    ) : (
    <section className="bg-black text-white py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 text-white drop-shadow-lg">
        Our Branches
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {branches.map((branch) => (
          <div
            key={branch.key}
            className="bg-zinc-900 border-2 border-red-600 rounded-xl shadow-lg hover:shadow-red-600/40 transition duration-300 overflow-hidden"
          >
            {/* Map preview */}
            <iframe
              title={`Map of ${branch.name}`}
              src={branch.mapEmbedUrl}
              className="w-full h-56 sm:h-64 md:h-60 lg:h-56"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Details */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {branch.name}
              </h3>
              <p className="text-md text-gray-300">
                {branch.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    )}
    <Footer />
    </>
  );
}
