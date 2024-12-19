import React from "react";
import { toast } from "react-toastify";

export const toastOptions = {
  theme: "colored",
  //   hideProgressBar: true,
};
const Toast = ({ title = "Title", message = "" }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};
Toast.FireSuccess = ({
  message = "Action completed Successfully",
  title = "Success",
}) => {
  toast.success(<Toast message={message} title={title} />, {
    ...toastOptions,
    style: { background: "var(--success)" },
  });
};
Toast.FireWarning = ({
  message = "Action completed Successfully",
  title = "Success",
}) => {
  toast.warning(<Toast message={message} title={title} />, {
    ...toastOptions,
    style: { background: "var(--warning)" },
  });
};
Toast.FireError = ({ title = "Error", message = "" }) => {
  toast.error(<Toast message={message} title={title} />, {
    ...toastOptions,
    style: { background: "var(--danger)" },
  });
};

export default Toast;
