import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaPhone, FaUserPlus } from "react-icons/fa";

export default function Following({ following = [], toggleFollow = () => {} }) {
  const navigate = useNavigate();

  const handleCompanyClick = (companyId) => navigate(`/company/${companyId}`);

  if (!following || following.length === 0) {
    return (
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="text-center py-6 sm:py-8 md:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
            <FaUserPlus className="text-2xl text-gray-400" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">No Companies Followed</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto px-2">Start following companies to see them here. You'll get updates from companies you follow.</p>
          <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 rounded-full bg-blue-500 text-white">Explore Companies</button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-4xl mx-auto p-3 overflow-x-hidden">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Following</h1>
        <p className="text-gray-600 text-sm">You're following {following.length} {following.length === 1 ? "company" : "companies"}</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {following.map((company) => (
          <article key={company.id} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm overflow-hidden">
            <div className="flex items-start gap-3">
              <img
                src={company.logo || "/api/placeholder/60/60"}
                alt={company.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border"
                onError={(e) => (e.target.src = "/api/placeholder/60/60")}
              />
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{company.name}</h3>
                    {company.title && <p className="text-xs text-gray-500 truncate">{company.title}</p>}
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                      <FaStar className="text-yellow-400" />
                      <span>{company.rating ? company.rating.toFixed(1) : "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-2">
                    <button onClick={() => toggleFollow(company)} className="px-3 py-1 text-sm rounded-full border">{company.following ? "Unfollow" : "Follow"}</button>
                  </div>
                </div>

                {(company.location || company.phone) && (
                  <div className="mt-3 text-xs text-gray-500 space-y-1">
                    {company.location && <div className="flex items-center gap-2"><FaMapMarkerAlt /><span className="truncate">{company.location}</span></div>}
                    {company.phone && <div className="flex items-center gap-2"><FaPhone /><span className="truncate">{company.phone}</span></div>}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
