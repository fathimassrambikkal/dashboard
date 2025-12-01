import React, { useState, useEffect } from "react";
import {
  FaFacebook, FaInstagram, FaYoutube, FaLinkedin,
  FaPinterest, FaSnapchat, FaWhatsapp, FaGooglePlusG,
  FaTrash, FaChevronDown, FaChevronUp,
} from "react-icons/fa";

export default function Settings({ companyInfo, setCompanyInfo }) {
  const [form, setForm] = useState({ ...companyInfo });
  const [specialOpen, setSpecialOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => setForm({ ...companyInfo }), [companyInfo]);

  const specialtiesList = ["Carpenter", "Curtains & Blind", "Lighting", "Paint", "Carpet"];

  const toBase64 = (file) =>
    new Promise((res) => {
      const r = new FileReader();
      r.onloadend = () => res(r.result);
      r.readAsDataURL(file);
    });

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (!files?.length) return;
    const b64 = await toBase64(files[0]);
    setForm((p) => ({ ...p, [name]: b64 }));
  };

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const toggleSpecial = (item) => {
    setForm((p) => ({
      ...p,
      specialties: p.specialties.includes(item)
        ? p.specialties.filter((x) => x !== item)
        : [...p.specialties, item],
    }));
  };

  const save = () => setCompanyInfo({ ...form });

  const deleteAll = () => {
    const empty = {
      companyName: "",
      companyDescription: "",
      contactMobile: "",
      address: "",
      logo: null,
      coverPhoto: null,
      specialties: [],
      youtube: "",
      instagram: "",
      facebook: "",
      google: "",
      whatsapp: "",
      pinterest: "",
      linkedin: "",
      snapchat: "",
    };
    setForm(empty);
    setCompanyInfo(empty);
    setShowDeleteModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-3 overflow-x-hidden">

      {/* MAIN WRAPPER */}
      <div
        className="
          w-full mx-auto
          max-w-full
          sm:max-w-xl
          md:max-w-2xl
          lg:max-w-3xl
          xl:max-w-4xl
          2xl:max-w-5xl
          bg-white/70 backdrop-blur-xl
          border border-gray-200 shadow-inner
          rounded-2xl p-4
        "
      >

        <h1 className="text-xl font-semibold text-gray-900 mb-4">Settings</h1>

        {/* SCROLLABLE CONTENT */}
        <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden space-y-5">

          {/* COVER */}
          <div className="space-y-2">
            <label className="font-medium">Cover Photo</label>

            {form.coverPhoto && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border shadow">
                <img src={form.coverPhoto} className="w-full h-full object-cover" />
                <button
                  onClick={() => setForm((p) => ({ ...p, coverPhoto: null }))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded shadow"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            )}

            <input
              type="file"
              name="coverPhoto"
              onChange={handleFileChange}
              className="w-full p-2 text-sm border rounded-lg bg-white/60"
            />
          </div>

          {/* LOGO */}
          <div className="space-y-2">
            <label className="font-medium">Logo</label>

            {form.logo && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border shadow">
                <img src={form.logo} className="w-full h-full object-contain" />
                <button
                  onClick={() => setForm((p) => ({ ...p, logo: null }))}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded shadow"
                >
                  <FaTrash size={10} />
                </button>
              </div>
            )}

            <input
              type="file"
              name="logo"
              onChange={handleFileChange}
              className="w-full p-2 text-sm border rounded-lg bg-white/60"
            />
          </div>

          {/* TEXT FIELDS */}
          {["companyName", "companyDescription", "contactMobile", "address"].map((f) => (
            <input
              key={f}
              name={f}
              value={form[f]}
              onChange={updateField}
              placeholder={f.replace(/([A-Z])/g, " $1")}
              className="w-full p-3 text-sm border rounded-xl bg-white/70 shadow-inner"
            />
          ))}

          {/* SPECIALTIES */}
          <div className="space-y-2 relative">
            <label className="font-medium">Specialties</label>

            <button
              onClick={() => setSpecialOpen(!specialOpen)}
              className="w-full p-3 text-left border rounded-xl bg-white/70 shadow-inner flex justify-between items-center"
            >
              <span>{form.specialties.length} selected</span>
              {specialOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {specialOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white rounded-xl border shadow p-3 z-10 max-h-40 overflow-y-auto">
                {specialtiesList.map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.specialties.includes(s)}
                      onChange={() => toggleSpecial(s)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* SOCIAL MEDIA */}
          <div className="space-y-2">
            <label className="font-medium">Social Media</label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "youtube", icon: FaYoutube },
                { key: "instagram", icon: FaInstagram },
                { key: "facebook", icon: FaFacebook },
                { key: "google", icon: FaGooglePlusG },
                { key: "whatsapp", icon: FaWhatsapp },
                { key: "pinterest", icon: FaPinterest },
                { key: "linkedin", icon: FaLinkedin },
                { key: "snapchat", icon: FaSnapchat },
              ].map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-2 p-2 border rounded-lg bg-white/60"
                >
                  <Icon className="text-gray-700" />
                  <input
                    name={key}
                    value={form[key]}
                    onChange={updateField}
                    placeholder={key}
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={save}
              className="flex-1 p-3 rounded-xl bg-white/80 backdrop-blur-xl shadow hover:scale-[1.02] transition text-gray-900 font-semibold border"
            >
              Save
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 p-3 rounded-xl bg-white/80 backdrop-blur-xl shadow hover:scale-[1.02] transition text-red-600 font-semibold border border-red-300"
            >
              Delete All
            </button>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 z-50">
          <div className="bg-white p-5 rounded-xl w-full max-w-sm shadow">
            <h3 className="font-semibold text-lg">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mt-1">
              This action cannot be undone.
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 p-2 rounded bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteAll}
                className="flex-1 p-2 rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
