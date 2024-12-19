import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePost } from "../hooks/usePost";
import Button from "../components/Button/Button";
import InputField from "../components/InputField/InputField";
import ErrorText from "../components/ErrorText/ErrorText";
import TextSpanLink from "../components/TextSpanLink";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { execute, isLoading, data, error } = usePost();
  const [user, setUser] = useLocalStorage("user", "");
  const [token, setToken] = useLocalStorage("token", "");
  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      execute("/api/login", values);
    },
  });
  useEffect(() => {
    if (data) {
      setUser(data.data.user);
      setToken(data.data.token);
      navigate("/dashboard");
    }
  }, [data]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div class="w-full sm:max-w-[522px] max-w-[95%] [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border">
        <div className=" p-6 rounded shadow-md sm:w-[520px] h-[490px]">
          <h1 className="text-3xl font-semibold mb-4 text-center">Login</h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
            />
            <ErrorText text={formik.touched.email && formik.errors.email} />

            <Button
              isCircular
              buttonColor="btn-orange"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>

          {/* Error Message */}
          {error && (
            <ErrorText
              text={error || "Something went wrong! Please try again."}
            />
          )}
          <TextSpanLink
            questionText="Dont have an account?"
            linkText="Register"
            href={"/register"}
          />
          {/* Success Message */}
          {data && !error && (
            <p className="text-green-500 text-center mt-4">Login successful!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
