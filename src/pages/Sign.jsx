import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sign() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('customer'); // 'customer' or 'company'
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      if (loginType === 'customer') {
        // Navigate to customer login page (or dashboard)
        navigate('/customer-login');
      } else {
        // Navigate to company dashboard
        navigate('/company-dashboard');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h1>

        {/* Login Type Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLoginType('customer')}
            className={`flex-1 py-2 rounded-md font-medium ${
              loginType === 'customer'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setLoginType('company')}
            className={`flex-1 py-2 rounded-md font-medium ${
              loginType === 'company'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Company
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:bg-blue-300"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Info Message */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            {loginType === 'customer' 
              ? 'Sign in as customer to access customer features'
              : 'Sign in as company to access company dashboard'
            }
          </p>
        </div>

        {/* Quick Navigation (for testing) */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate('/customer-login')}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Go to Customer Page
          </button>
          <button
            onClick={() => navigate('/company-dashboard')}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Go to Company Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sign;