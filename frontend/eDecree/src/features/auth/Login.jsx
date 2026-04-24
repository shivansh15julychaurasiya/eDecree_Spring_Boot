import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { loginApi } from "../../service/authService"
import { loginSuccess } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { roleMapper } from "../../utils/roleMapper";
import { getDefaultRoute } from "../../utils/getDefaultRoute";

// Simple inline SVG icons for zero-dependency elegance
const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ username: false, password: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = useCallback(() => {
    const errors = [];
    if (!form.username.trim()) errors.push("Username is required");
    if (!form.password) errors.push("Password is required");
    return errors;
  }, [form]);

  const handleLogin = async () => {
    setTouched({ username: true, password: true });
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "));
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await loginApi(form);
      const data = res.data ? res.data : res;

      if (res.success) {
        const roleName = data.role;
        const mapped = roleMapper[roleName];
        const roles = mapped ? [mapped] : [];

        dispatch(
          loginSuccess({
            username: data.username,
            roles,
            token: data.accessToken,
          })
        );

        navigate(getDefaultRoute(roles), { replace: true });
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const isInvalid = (field) => touched[field] && !form[field];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50">
      {/* LEFT — Branding Panel */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-pulse-slow" />

        <div className="relative z-10 p-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <LockIcon />
            </div>
            <span className="text-xl font-bold tracking-tight">E-Filing Portal</span>
          </div>
        </div>

        <div className="relative z-10 px-12 pb-16">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 animate-slide-up">
            Digital Justice,<br />
            <span className="text-primary-300">Simplified.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-md leading-relaxed animate-fade-in">
            Securely manage, file, and track your legal documents in one unified platform built for speed and transparency.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary-900 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xs font-bold shadow-lg">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold">Trusted by 10,000+ officials</p>
              <div className="flex items-center gap-1 mt-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-slate-400 ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 relative">
        {/* Mobile top branding */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-3">
              <LockIcon />
            </div>
            <h2 className="text-2xl font-bold">E-Filing Portal</h2>
            <p className="text-sm text-slate-300 mt-1">Digital Justice, Simplified</p>
          </div>
        </div>

        <div className={`w-full max-w-md glass rounded-2xl shadow-2xl shadow-slate-200/60 border border-white/50 p-8 sm:p-10 mt-40 lg:mt-0 animate-slide-up`}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
            <p className="text-slate-500 mt-1 text-sm">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="animate-shake mb-6 rounded-lg bg-red-50 border border-red-100 p-3 flex items-start gap-3">
              <div className="mt-0.5 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-red-700 font-medium leading-snug">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <UserIcon />
                </div>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  aria-label="Username"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
                    isInvalid("username")
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={form.username}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, username: e.target.value }));
                    if (error) setError("");
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {isInvalid("username") && (
                <p className="text-xs text-red-500 mt-1 ml-1">Username is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-label="Password"
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl border bg-white/70 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
                    isInvalid("password")
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={form.password}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, password: e.target.value }));
                    if (error) setError("");
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
              {isInvalid("password") && (
                <p className="text-xs text-red-500 mt-1 ml-1">Password is required</p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500/20 cursor-pointer"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-2.5 rounded-xl text-white font-semibold shadow-lg shadow-primary-500/30 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] ${
                loading
                  ? "bg-primary-400 cursor-not-allowed shadow-none"
                  : "bg-primary-600 hover:bg-primary-700 hover:shadow-primary-600/40"
              }`}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Secure connection</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="text-center">
              <p className="text-xs text-slate-400">
                Protected by enterprise-grade encryption.
                <br />
                Unauthorized access is prohibited and monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

