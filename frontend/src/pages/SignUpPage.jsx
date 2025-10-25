import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, MessageSquare } from "lucide-react";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ShapesDesign from "../components/ShapesDesign"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  
  const { signup, isSigningUp } = useAuthStore();

  const validateFullName = (fullName) => {
    if (!fullName.trim()) {
      return "Full name is required"
    }
    return ""
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      return "Email is required"
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required"
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number"
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character"
    }
    return ""
  }

  const handleFullNameChange = (e) => {
    const fullName = e.target.value
    setFormData({...formData, fullName})
    setErrors({...errors, fullName: validateFullName(fullName)})
  }

  const handleEmailChange = (e) => {
    const email = e.target.value
    setFormData({...formData, email})
    setErrors({...errors, email: validateEmail(email)})
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setFormData({...formData, password})
    setErrors({...errors, password: validatePassword(password)})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const fullNameError = validateFullName(formData.fullName)
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    
    if (fullNameError || emailError || passwordError) {
      setErrors({
        fullName: fullNameError,
        email: emailError,
        password: passwordError,
      })
      return
    }

    signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />           
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Signup for free</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40"/>
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10 ${errors.fullName ? 'input-error' : ''}`}
                placeholder="Juan dela Cruz"
                value={formData.fullName}
                onChange={handleFullNameChange}
              />  
            </div>
            {errors.fullName && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.fullName}</span>
              </label>
            )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40"/>
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
                placeholder="juandelacruz@email.com"
                value={formData.email}
                onChange={handleEmailChange}
              />  
            </div>
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.email}</span>
              </label>
            )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40"/>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10 ${errors.password ? 'input-error' : ''}`}
                placeholder="********"
                value={formData.password}
                onChange={handlePasswordChange}
              />  
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
              </button>
            </div>
            {errors.password && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.password}</span>
              </label>
            )}
            </div>
            
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin"/>
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account? {" "}
              <Link to="/login" className="link link-primary">
                Sign In
              </Link>
            </p>
          </div>    
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-200">
      <ShapesDesign/>
      <div className="flex flex-col justify-center items-center p-8 text-center bg-base-primary">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-primary">Create, Connect, Have Fun</h2>
                    <p className="mt-2 text-base-content/70 max-w-md">Connect with friends, share moments, and stay in touch with a secure end-to-end message platform.</p>
                </div>
      </div>
      </div>

    </div>
  )
}

export default SignUpPage