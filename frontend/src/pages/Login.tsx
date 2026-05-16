import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, FieldGroup, FieldLabel } from "../components/ui/field";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { loginAPI } from "../services/auth.service";
import { validateLogin } from "../utils/loginValidator";
import type { AxiosError } from "axios";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors: error } = validateLogin({ email, password });
    if (!isValid) {
      toast.error(Object.values(error)[0]);
      return;
    }
    setLoading(true);
    try {
      const res = await loginAPI({ email, password });
      login(res.user);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err);
      toast.error(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FieldGroup className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-1">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </Field>

          {/* Button */}
          <Button className="w-full mt-2" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </FieldGroup>
    </div>
  );
}

export default Login;
