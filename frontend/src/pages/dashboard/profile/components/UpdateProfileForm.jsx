import React from "react";
import InputField from "../../../../components/InputField/InputField";
import ErrorText from "../../../../components/ErrorText/ErrorText";
import Button from "../../../../components/Button/Button";

const UpdateProfileForm = ({ formik, isLoading, error, success }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full sm:max-w-[522px] max-w-[95%] [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border">
        <div className="p-6 rounded shadow-md sm:w-[520px] h-auto">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Update Profile
          </h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="First Name"
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              value={formik.values.first_name}
              onChange={formik.handleChange("first_name")}
            />
            <ErrorText
              text={formik.touched.first_name && formik.errors.first_name}
            />

            <InputField
              label="Last Name"
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              value={formik.values.last_name}
              onChange={formik.handleChange("last_name")}
            />
            <ErrorText
              text={formik.touched.last_name && formik.errors.last_name}
            />

            <InputField
              label="Country"
              name="country"
              type="text"
              placeholder="Enter your country"
              value={formik.values.country}
              onChange={formik.handleChange("country")}
            />
            <ErrorText text={formik.touched.country && formik.errors.country} />

            <InputField
              label="Phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange("phone")}
            />
            <ErrorText text={formik.touched.phone && formik.errors.phone} />

            <Button
              isCircular
              buttonColor="btn-blue"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>

          {error && (
            <ErrorText
              text={error || "Something went wrong! Please try again."}
            />
          )}

          {success && (
            <p className="text-green-500 text-center mt-4">
              Profile updated successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
