import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePut } from "../../../hooks/usePut";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import UpdateProfileForm from "./components/UpdateProfileForm";

const UpdateProfilePage = () => {
  const [user, setUser] = useLocalStorage("user", "");
  const { execute, isLoading, data, error } = usePut();

  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      country: user?.country || "",
      phone: user?.phone || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(255, "First name cannot exceed 255 characters")
        .required("First name is required"),
      last_name: Yup.string()
        .max(255, "Last name cannot exceed 255 characters")
        .required("Last name is required"),
      country: Yup.string()
        .max(255, "Country cannot exceed 255 characters")
        .required("Country is required"),
      phone: Yup.string()
        .max(15, "Phone number cannot exceed 15 characters")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      execute("/api/user", values);
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data.data.user); // Update local storage with new user data
    }
  }, [data]);

  return (
    <UpdateProfileForm
      formik={formik}
      isLoading={isLoading}
      error={error}
      success={data && !error}
    />
  );
};

export default UpdateProfilePage;
