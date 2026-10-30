"use client";

import React, { useState, useId } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import "./register.css";

interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const fullNameId = useId();
  const usernameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const agreeTermsId = useId();

  // Đánh giá thanh độ mạnh mật khẩu (0 - 4 điểm)
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(formData.password);
  const strengthLabels = ["Rất yếu", "Yếu", "Trung bình", "Khá mạnh", "Rất an toàn"];
  const strengthColors = ["#ef4444", "#f97316", "#eab308", "#3b82f6", "#22c55e"];

  // Hàm validate từng trường và trả về câu báo lỗi
  const validateField = (name: string, value: string | boolean, currentForm = formData): string => {
    let msg = "";

    switch (name) {
      case "fullName":
        if (typeof value === "string" && !value.trim()) {
          msg = "Vui lòng nhập họ và tên.";
        }
        break;

      case "username":
        if (typeof value === "string") {
          const val = value.trim();
          if (!val) {
            msg = "Vui lòng nhập tên người dùng (username).";
          } else if (val.length < 3) {
            msg = "Username phải có ít nhất 3 ký tự.";
          } else if (!/^[a-zA-Z0-9_]+$/.test(val)) {
            msg = "Username chỉ gồm chữ, số và dấu gạch dưới (_).";
          }
        }
        break;

      case "email":
        if (typeof value === "string") {
          const emailTrimmed = value.trim();
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailTrimmed) {
            msg = "Vui lòng nhập địa chỉ email.";
          } else if (!emailTrimmed.includes("@") || !emailRegex.test(emailTrimmed)) {
            msg = "Email không đúng định dạng (phải chứa '@' và tên miền, ví dụ: name@gmail.com).";
          }
        }
        break;

      case "password":
        if (typeof value === "string") {
          if (!value) {
            msg = "Vui lòng nhập mật khẩu.";
          } else {
            // Gộp tất cả các điều kiện mật khẩu vào kiểm tra một lần
            const isLongEnough = value.length >= 8;
            const hasLower = /[a-z]/.test(value);
            const hasUpper = /[A-Z]/.test(value);
            const hasDigit = /[0-9]/.test(value);
            const hasSpecial = /[^A-Za-z0-9]/.test(value);

            if (!isLongEnough || !hasLower || !hasUpper || !hasDigit || !hasSpecial) {
              msg = "Mật khẩu phải từ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
            }
          }
        }
        break;

      case "confirmPassword":
        if (typeof value === "string") {
          if (!value) {
            msg = "Vui lòng xác nhận mật khẩu.";
          } else if (value !== currentForm.password) {
            msg = "Mật khẩu xác nhận không khớp.";
          }
        }
        break;

      case "agreeTerms":
        if (!value) {
          msg = "Bạn phải đồng ý với Điều khoản và Quy chế thành viên.";
        }
        break;

      default:
        break;
    }

    return msg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    const nextForm = { ...formData, [name]: val };
    setFormData(nextForm);

    // Xóa/cập nhật lỗi trực tiếp khi người dùng đang sửa
    if (errors[name as keyof FormErrors]) {
      const fieldError = validateField(name, val, nextForm);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }

    // Nếu gõ lại mật khẩu chính, kiểm tra ngay khớp với ô confirm
    if (name === "password" && nextForm.confirmPassword) {
      const confirmErr = nextForm.confirmPassword !== val ? "Mật khẩu xác nhận không khớp." : "";
      setErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const errorMsg = validateField(name, val, formData);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    // Validate toàn bộ các trường cùng lúc
    const currentErrors: FormErrors = {
      fullName: validateField("fullName", formData.fullName, formData),
      username: validateField("username", formData.username, formData),
      email: validateField("email", formData.email, formData),
      password: validateField("password", formData.password, formData),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword, formData),
      agreeTerms: validateField("agreeTerms", formData.agreeTerms, formData),
    };

    setErrors(currentErrors);

    // Kiểm tra xem có trường nào còn lỗi không
    const hasAnyError = Object.values(currentErrors).some((err) => !!err);
    if (hasAnyError) {
      return;
    }

    setIsLoading(true);
    try {
      // Giả lập gọi API tạo tài khoản
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log("Registered payload:", formData);

      // Chuyển hướng tới trang đăng nhập
      router.push("/login");
    } catch {
      setServerError("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <header className="register-header">
          <div className="badge">Welcome to Potatoes Family</div>
          <h1>Create FEC Account</h1>
          <p>Start your journey of connection with the FEC Family</p>
        </header>

        {serverError && <div className="register-alert error">{serverError}</div>}

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={fullNameId}>Full Name</label>
              <input
                id={fullNameId}
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.fullName ? "input-error" : ""}
                required
              />
              {errors.fullName && <span className="field-hint error">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor={usernameId}>Username</label>
              <input
                id={usernameId}
                name="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.username ? "input-error" : ""}
                required
              />
              {errors.username && <span className="field-hint error">{errors.username}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={emailId}>Email Address</label>
            <input
              id={emailId}
              name="email"
              type="email"
              placeholder="example@fec.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email ? "input-error" : ""}
              required
            />
            {errors.email && <span className="field-hint error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor={passwordId}>Password</label>
            <div className="password-box">
              <input
                id={passwordId}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Tối thiểu 8 ký tự, gồm chữ hoa, thường, số, ký tự đặc biệt"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password ? "input-error" : ""}
                required
              />
              <button
                type="button"
                className="btn-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
              </button>
            </div>

            {formData.password && (
              <div className="strength-meter">
                <div className="bars">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className="bar"
                      style={{
                        backgroundColor:
                          strength >= step ? strengthColors[strength] : "#e2e8f0",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="strength-text"
                  style={{ color: strengthColors[strength] }}
                >
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
            {errors.password && <span className="field-hint error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor={confirmPasswordId}>Confirm Password</label>
            <input
              id={confirmPasswordId}
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.confirmPassword ? "input-error" : ""}
              required
            />
            {errors.confirmPassword && (
              <span className="field-hint error">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="terms-row">
            <input
              id={agreeTermsId}
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor={agreeTermsId}>
              Tôi đồng ý với <a href="#terms">Chính sách bảo mật</a> và{" "}
              <a href="#rules">Quy chế thành viên</a>.
            </label>
          </div>
          {errors.agreeTerms && (
            <span className="field-hint error">{errors.agreeTerms}</span>
          )}

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-wrapper">
                <span className="spinner" />
                <span>Creating account...</span>
              </div>
            ) : (
              <div className="btn-submit-content">
                <span>Sign Up Now</span>
                <UserPlus size={18} strokeWidth={2.2} />
              </div>
            )}
          </button>
        </form>

        <footer className="register-footer">
          Already have an account? <Link href="/login">Log in here</Link>
        </footer>
      </div>
    </div>
  );
}