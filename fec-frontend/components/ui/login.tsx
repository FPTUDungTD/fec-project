"use client";

import React, { useState, useId } from "react";
import "./login.css";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const emailId = useId();
  const passwordId = useId();
  const rememberMeId = useId();

  // Hàm validate chi tiết từng trường
  const validateField = (name: string, value: string): string => {
    let msg = "";

    if (name === "email") {
      const emailTrimmed = value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailTrimmed) {
        msg = "Vui lòng nhập địa chỉ email.";
      } else if (!emailTrimmed.includes("@")) {
        msg = "Email phải chứa ký tự '@'.";
      } else if (!emailRegex.test(emailTrimmed)) {
        msg = "Định dạng email không hợp lệ (ví dụ: example@gmail.com).";
      }
    }

    if (name === "password") {
      if (!value) {
        msg = "Vui lòng nhập mật khẩu.";
      } else if (value.length < 8) {
        msg = "Mật khẩu phải có ít nhất 8 ký tự.";
      } else if (!/[a-z]/.test(value)) {
        msg = "Mật khẩu phải chứa ít nhất 1 chữ cái thường (a-z).";
      } else if (!/[A-Z]/.test(value)) {
        msg = "Mật khẩu phải chứa ít nhất 1 chữ cái in hoa (A-Z).";
      } else if (!/[0-9]/.test(value)) {
        msg = "Mật khẩu phải chứa ít nhất 1 chữ số (0-9).";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        msg = "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (@, #, $, v.v.).";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
    return msg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    // Re-validate ngay khi người dùng gõ nếu trước đó đã có lỗi
    if (errors[name as keyof FormErrors]) {
      validateField(name, typeof val === "string" ? val : "");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    // Validate toàn bộ form trước khi gửi
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    if (emailError || passwordError) {
      return;
    }

    setIsLoading(true);
    try {
      // Giả lập gửi request xác thực đăng nhập
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitting login payload:", formData);

      // Hiển thị popup trình duyệt khi tất cả điều kiện đều hợp lệ
      alert("Đăng nhập thành công!");
    } catch {
      setServerError("Email hoặc mật khẩu không chính xác.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <header className="login-header">
          <div className="badge">FEC Potatoes</div>
          <h1>Welcome to FEC Family</h1>
          <p>Please enter your account details to continue</p>
        </header>

        {serverError && <div className="login-alert error">{serverError}</div>}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor={emailId}>Email Address</label>
            <input
              type="email"
              id={emailId}
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField("email", e.target.value)}
              className={errors.email ? "input-error" : ""}
              autoComplete="email"
              required
            />
            {errors.email && <span className="field-hint error">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor={passwordId}>Password</label>
              <a href="#forgot" className="forgot-link">
                Forgot password?
              </a>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id={passwordId}
                name="password"
                placeholder="Tối thiểu 8 ký tự, có hoa, thường, số, ký tự đặc biệt"
                value={formData.password}
                onChange={handleChange}
                onBlur={(e) => validateField("password", e.target.value)}
                className={errors.password ? "input-error" : ""}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <span className="field-hint error">{errors.password}</span>}
          </div>

          {/* Remember Me */}
          <div className="login-options-row">
            <label htmlFor={rememberMeId} className="remember-me">
              <input
                type="checkbox"
                id={rememberMeId}
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-wrapper">
                <span className="spinner" />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-auth-grid">
          <button type="button" className="social-btn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>
        </div>

        <footer className="login-footer">
          Don&apos;t have an account? <a href="/register">Sign up now</a>
        </footer>
      </div>
    </div>
  );
}