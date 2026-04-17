import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { getMeAPI, loginAPI } from "@/services/auth.service";
import { validateLogin } from "@/utils/loginValidator";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, error } = validateLogin({ email, password });
    if (!isValid) {
      toast.error(Object.values(error)[0]);
    }
    setLoading(true);
    try {
      await loginAPI({ email, password });
      const res = await getMeAPI();
      const userData = res.data;
      login(userData);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FieldGroup className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-1">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
        </Field>

        {/* Button */}
        <Button
          className="w-full mt-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </FieldGroup>
    </div>
  );
}

export default Login;
