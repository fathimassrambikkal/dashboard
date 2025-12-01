import React, { useEffect, useState, useCallback } from "react";
import {
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

/**
 * Settings component
 * - Apple-like minimal buttons (option 1)
 * - No horizontal scrolling (overflow-x-hidden everywhere)
 * - Optimized, fewer re-renders, clear structure
 *
 * Props:
 * - companyInfo: object
 * - setCompanyInfo: function
 */

const specialtiesList = [
  "Carpenter",
  "Curtains & Blind",
  "Lighting",
  "Paint",
  "Carpet",
];

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function Settings({ companyInfo = {}, setCompanyInfo }) {
  const [form, setForm] = useState({
    companyName: "",
    companyDescription: "",
    contactMobile: "",
    address: "",
    specialties: [],
    logo: null,
    coverPhoto: null,
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    pinterest: "",
    snapchat: "",
    whatsapp: "",
    google: "",
    ...companyInfo,
  });

  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
  const [toast, setToast] = useState(null); // {type:'success'|'info'|'error', text}
  const [confirmOpen, setConfirmOpen] = useState(false);

  // keep local form in sync when companyInfo changes externally
  useEffect(() => setForm((f) => ({ ...f, ...companyInfo })), [companyInfo]);

  // small helper to update field
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  // handle file inputs (logo/cover)
  const handleFile = useCallback(async (e) => {
    const { name, files } = e.target;
    if (!files?.[0]) return;
    const base64 = await toBase64(files[0]);
    setForm((prev) => ({ ...prev, [name]: base64 }));
  }, []);

  const toggleSpecialty = useCallback((item) => {
    setForm((prev) => {
      const has = prev.specialties?.includes(item);
      return {
        ...prev,
        specialties: has
          ? prev.specialties.filter((s) => s !== item)
          : [...(prev.specialties || []), item],
      };
    });
  }, []);

  const removeFile = useCallback((key) => {
    setForm((prev) => ({ ...prev, [key]: null }));
  }, []);

  const showToast = useCallback((type, text = "") => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleSave = useCallback(
    (e) => {
      e?.preventDefault?.();
      setCompanyInfo?.(form);
      showToast("success", "Settings saved");
    },
    [form, setCompanyInfo, showToast]
  );

  const handleDeleteAll = useCallback(() => {
    const empty = {
      companyName: "",
      companyDescription: "",
      contactMobile: "",
      address: "",
      specialties: [],
      logo: null,
      coverPhoto: null,
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      pinterest: "",
      snapchat: "",
      whatsapp: "",
      google: "",
    };
    setForm(empty);
    setCompanyInfo?.(empty);
    setConfirmOpen(false);
    showToast("info", "All settings cleared");
  }, [setCompanyInfo, showToast]);

  // keyboard accessibility: close specialties when Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsSpecialtiesOpen(false);
        setConfirmOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/10 p-4 sm:p-6 overflow-x-hidden">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 max-w-xs w-full">
          <div
            className={`flex items-start gap-3 p-3 rounded-xl shadow-lg border ${
              toast.type === "success"
                ? "bg-white border-blue-200"
                : "bg-white border-gray-200"
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white">
              <FaCheckCircle />
            </div>
            <div className="flex-1 text-sm text-gray-800">{toast.text}</div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Confirm delete modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
          <div className="max-w-md w-full bg-white rounded-xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
                <FaExclamationTriangle />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">Delete All Settings</h3>
                <p className="text-sm text-gray-600 mt-1">
                  This will clear all settings and cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 rounded-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="flex-1 rounded-full px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h1>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm overflow-x-hidden"
        >
          {/* Uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Photo</label>
              {form.coverPhoto ? (
                <div className="relative rounded-lg overflow-hidden mb-2">
                  <img src={form.coverPhoto} alt="cover preview" className="w-full h-28 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile("coverPhoto")}
                    className="absolute top-2 right-2 rounded-full w-8 h-8 bg-white/90 flex items-center justify-center text-red-600 shadow"
                    aria-label="remove cover"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <div className="mb-2 h-28 rounded-lg bg-gray-50 flex items-center justify-center text-sm text-gray-400">
                  No cover
                </div>
              )}
              <input
                type="file"
                name="coverPhoto"
                accept="image/*"
                onChange={handleFile}
                className="w-full text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
              {form.logo ? (
                <div className="relative rounded-lg overflow-hidden inline-block mb-2">
                  <img src={form.logo} alt="logo preview" className="w-24 h-24 object-contain" />
                  <button
                    type="button"
                    onClick={() => removeFile("logo")}
                    className="absolute top-1 right-1 rounded-full w-7 h-7 bg-white/90 flex items-center justify-center text-red-600 shadow"
                    aria-label="remove logo"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <div className="mb-2 w-24 h-24 rounded-lg bg-gray-50 flex items-center justify-center text-sm text-gray-400">
                  No logo
                </div>
              )}
              <input type="file" name="logo" accept="image/*" onChange={handleFile} className="w-full text-sm" />
            </div>
          </div>

          {/* Text fields */}
          <div className="mt-4 space-y-3">
            <input
              name="companyName"
              placeholder="Company Name"
              value={form.companyName || ""}
              onChange={onChange}
              className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200"
            />
            <textarea
              name="companyDescription"
              placeholder="Company Description"
              value={form.companyDescription || ""}
              onChange={onChange}
              rows={3}
              className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 resize-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="contactMobile"
                placeholder="Contact Mobile"
                value={form.contactMobile || ""}
                onChange={onChange}
                className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
              <input
                name="address"
                placeholder="Address"
                value={form.address || ""}
                onChange={onChange}
                className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Specialties (dropdown) */}
          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>

            <button
              type="button"
              onClick={() => setIsSpecialtiesOpen((s) => !s)}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white text-sm"
              aria-expanded={isSpecialtiesOpen}
            >
              <span>{(form.specialties || []).length} selected</span>
              <span className="text-gray-500">{isSpecialtiesOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>

            {isSpecialtiesOpen && (
              <div className="mt-2 p-2 bg-white border border-gray-100 rounded-lg max-h-48 overflow-y-auto">
                <div className="grid grid-cols-1 gap-1">
                  {specialtiesList.map((s) => {
                    const checked = (form.specialties || []).includes(s);
                    return (
                      <label
                        key={s}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSpecialty(s)}
                          className="w-4 h-4"
                        />
                        <span className="truncate">{s}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* selected chips */}
            {form.specialties?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.specialties.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs"
                  >
                    <span className="truncate max-w-xs">{s}</span>
                    <button
                      type="button"
                      onClick={() => toggleSpecialty(s)}
                      className="text-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      aria-label={`remove ${s}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Social inputs */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "youtube",
              "instagram",
              "facebook",
              "google",
              "whatsapp",
              "pinterest",
              "linkedin",
              "snapchat",
            ].map((key) => (
              <input
                key={key}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={form[key] || ""}
                onChange={onChange}
                className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
            ))}
          </div>

          {/* Buttons (Apple-style minimal) */}
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              aria-label="Save settings"
              className="flex-1 rounded-full px-4 py-2 text-sm bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              aria-label="Delete all settings"
              className="flex-1 rounded-full px-4 py-2 text-sm bg-white border border-gray-200 shadow-sm hover:shadow-md transition text-red-600"
            >
              Delete All
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
