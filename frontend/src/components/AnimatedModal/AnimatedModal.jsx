import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const AnimatedModal = ({
  openModal,
  setOpenModal,
  children,
  bkdropclassName,
  modalHeight,
  style,
  isCircular,
  backdropwidth = "80vw",
  canClose = false,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleCancelClick = () => {
    if (canClose) {
      setOpenModal(false);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowConfirmation(false);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  return (
    <AnimatePresence>
      {openModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[9999999] flex justify-center items-center ${bkdropclassName}`}
            onClick={() => canClose && setOpenModal(false)} // Prevent closing on backdrop if canClose is false
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { duration: 0.2 } }}
              exit={{ scale: 0 }}
              className="bg-white w-full max-w-lg rounded-md p-6 relative flex flex-col overflow-y-auto max-h-[95vh] w-full sm:max-w-[522px] max-w-[95%] [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border"
              onClick={stopPropagation}
              style={{
                ...style,
                height: modalHeight,
                borderRadius: isCircular ? "50%" : "0.5rem",
              }}
            >
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.6 },
                }}
                exit={{ opacity: 0, x: 100 }}
                className="w-full h-full "
              >
                <div
                  className="absolute top-2 right-2 text-2xl cursor-pointer"
                  onClick={handleCancelClick} // Handle cancel click
                >
                  <Icon icon="material-symbols:cancel" />
                </div>
                {children}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Confirmation Modal */}
          <AnimatePresence>
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[9999999] flex justify-center items-center`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { duration: 0.2 } }}
                  exit={{ scale: 0 }}
                  className="bg-white w-full max-w-lg rounded-md p-6 relative flex flex-col"
                >
                  <p className="text-lg mb-4">
                    Are you sure you want to close?
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                      onClick={handleCloseModal} // Confirm closing
                    >
                      Yes, Close
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 rounded-md"
                      onClick={handleConfirmationClose} // Cancel confirmation
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
