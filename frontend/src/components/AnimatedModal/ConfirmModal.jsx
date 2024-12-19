import React from "react";
import AnimatedModal from "./AnimatedModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../Button";

const ConfirmModal = ({
  openModal = false,
  setOpenModal,
  onConfirm,
  loading,
  title,
  message,
}) => {
  return (
    <>
      <AnimatedModal
        modalHeight={300}
        openModal={openModal}
        setOpenModal={setOpenModal}
        isCircular={true}
        children={
          <>
            <div className="my-16 centerClass flex-col gap-4 w-full">
              <Icon icon="ph:info-fill" className="text-blue-300 text-4xl" />
              <h3 className="text-xl font-medium">{title ?? "Confirm!"}</h3>
              <p>{message ?? "Did you want to continue?"}</p>
              <div className="flex justify-evenly gap-4 w-full ">
                <Button
                  buttonColor={"btn-orange"}
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  buttonColor={"btn-blue"}
                  onClick={onConfirm}
                  loading={loading}
                >
                  OK
                </Button>
              </div>
            </div>
          </>
        }
        bkdropclassName={undefined}
        style={undefined}
      />
    </>
  );
};

export default ConfirmModal;
