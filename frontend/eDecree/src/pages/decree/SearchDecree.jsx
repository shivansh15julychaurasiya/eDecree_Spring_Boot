import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  CalendarIcon,
  FunnelIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  InboxIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  FolderOpenIcon,
  ScaleIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { caseTypeService } from "../../service/caseFileService";

export default function SearchDecree() {
  const [form, setForm] = useState({
    caseType: "",
    caseNo: "",
    caseYear: "",
  });

  const [caseTypes, setCaseTypes] = useState([]);
  const [caseFiles, setCaseFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  // Load case types on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await caseTypeService.getCaseTypes();
        setCaseTypes(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load case types. Please refresh the page.");
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSearch = async () => {
    // Validation
    if (!form.caseType || !form.caseNo || !form.caseYear) {
      setError("Please fill in all fields before searching.");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const payload = {
        caseType: form.caseType,
        caseNo: form.caseNo,
        caseYear: Number(form.caseYear),
      };

      const data = await caseTypeService.getCaseFileList(payload);
      setCaseFiles(data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Search failed. Please check your inputs and try again.");
      setCaseFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ caseType: "", caseNo: "", caseYear: "" });
    setCaseFiles([]);
    setSearched(false);
    setError(null);
  };

  const isFormValid = form.caseType && form.caseNo && form.caseYear;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 p-6 md:p-8 text-white">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </div>
              <span className="text-primary-100 text-sm font-medium">Decree Management</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Search Decree</h1>
            <p className="mt-1 text-primary-100 text-sm">
              Find decree records by case type, number, and year
            </p>
          </div>
          {searched && (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-xl backdrop-blur-sm">
              <FolderOpenIcon className="h-5 w-5 text-primary-100" />
              <span className="text-sm font-medium">
                {caseFiles.length} {caseFiles.length === 1 ? "Result" : "Results"} Found
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Search Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-slate-800">Search Filters</h2>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 transition-colors"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-danger-50 border border-danger-100 text-danger-700 animate-fade-in">
              <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Case Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <BriefcaseIcon className="h-4 w-4 text-primary-500" />
                Case Type
              </label>
              <div className="relative">
                <select
                  name="caseType"
                  value={form.caseType}
                  onChange={handleChange}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all hover:border-slate-300"
                >
                  <option value="">Select Case Type</option>
                  {caseTypes.map((ct) => (
                    <option key={ct.ctId} value={ct.ctId}>
                      {ct.ctLabel} - {ct.ctName}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRightIcon className="h-4 w-4 text-slate-400 rotate-90" />
                </div>
              </div>
            </div>

            {/* Case No */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <DocumentTextIcon className="h-4 w-4 text-primary-500" />
                Case Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="caseNo"
                  value={form.caseNo}
                  onChange={handleChange}
                  placeholder="e.g. 1284"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all hover:border-slate-300"
                />
              </div>
            </div>

            {/* Case Year */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4 text-primary-500" />
                Case Year
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="caseYear"
                  value={form.caseYear}
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                  min="1900"
                  max="2099"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all hover:border-slate-300"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={!isFormValid || loading}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg ${
                  isFormValid && !loading
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:from-primary-700 hover:to-primary-800 hover:-translate-y-0.5"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    Search Decree
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {searched && (
        <div className="animate-slide-up">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ScaleIcon className="h-5 w-5 text-primary-500" />
              <h2 className="text-lg font-semibold text-slate-800">Search Results</h2>
              <span className="px-2.5 py-0.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-full">
                {caseFiles.length}
              </span>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {caseFiles.length === 0 && !loading ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                  <InboxIcon className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-1">
                  No Results Found
                </h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  No decree records match your search criteria. Try adjusting the case type, number, or year.
                </p>
              </div>
            ) : (
              /* Data Table */
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Case Number
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Case Type
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Year
                      </th>
                      {/* <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Petitioner
                      </th> */}
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {caseFiles.map((item, index) => {
                      const hasPetitioner = item.petitioners && item.petitioners.length > 0;
                      return (
                        <tr
                          key={index}
                          className="group hover:bg-primary-50/40 transition-colors duration-150"
                        >
                          {/* S.No */}
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
                              {index + 1}
                            </span>
                          </td>

                          {/* Case No */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <DocumentTextIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
                              <span className="text-sm font-semibold text-slate-800">
                                {item.fd_case_no}
                              </span>
                            </div>
                          </td>

                          {/* Case Type */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-slate-700">
                                {item.caseType?.ctLabel}
                              </span>
                              <span className="text-xs text-slate-400">
                                {item.caseType?.ctName}
                              </span>
                            </div>
                          </td>

                          {/* Year */}
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                              <CalendarIcon className="h-3 w-3" />
                              {item.fd_case_year}
                            </span>
                          </td>

                          {/* Document Name */}
                          {/* <td className="px-6 py-4">
                            <span className="text-sm text-slate-600 max-w-[200px] truncate block">
                              {item.fd_document_name || "N/A"}
                            </span>
                          </td> */}

                          {/* Petitioner */}
                          {/* <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <UserIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
                              <span className="text-sm text-slate-700">
                                {hasPetitioner ? item.petitioners[0].pt_name : "N/A"}
                              </span>
                            </div>
                          </td> */}

                          {/* Status Badge */}
                          <td className="px-6 py-4 text-right">
                            {hasPetitioner ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success-50 text-success-700 text-xs font-semibold border border-success-100">
                                <CheckCircleIcon className="h-3 w-3" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold border border-slate-200">
                                <XCircleIcon className="h-3 w-3" />
                                Pending
                              </span>
                            )}
                          </td>

                          {/* Action buttons */}
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex items-center justify-center gap-2">
                              <button
                                onClick={() => window.open(`/case-details/${item.fd_id}`, "_blank")}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-200 hover:bg-primary-100 hover:text-primary-800 hover:border-primary-300 transition-colors duration-150"
                                title="View case details"
                              >
                                <EyeIcon className="h-3.5 w-3.5" />
                                View
                                <ArrowTopRightOnSquareIcon className="h-3 w-3 opacity-60" />
                              </button>
                              <button
                                onClick={() => window.open(`/generate-decree/${item.fd_id}`, "_blank")}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success-50 text-success-700 text-xs font-semibold border border-success-200 hover:bg-success-100 hover:text-success-800 hover:border-success-300 transition-colors duration-150"
                                title="Generate decree"
                              >
                                <DocumentArrowDownIcon className="h-3.5 w-3.5" />
                                Generate Decree
                              </button>
                            </div>
                          </td>

                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {caseFiles.length > 0 && (
            <div className="mt-4 flex items-center justify-between px-2">
              <p className="text-xs text-slate-400">
                Showing <span className="font-semibold text-slate-600">{caseFiles.length}</span> record(s)
              </p>
              <button
                onClick={handleReset}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
              >
                <ArrowPathIcon className="h-3 w-3" />
                New Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

