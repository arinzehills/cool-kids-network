import React, { useEffect, useState } from "react";
import AnimatedModal from "../../../../components/AnimatedModal/AnimatedModal";
import Button from "../../../../components/Button/Button";
import { usePost } from "../../../../hooks/usePost";

const AssignRoleModal = ({ onAssignRole, email }) => {
  console.log("ROLE HERE!!!", email);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Cool kid");
  const { execute, isLoading, data, error } = usePost();
  const handleSubmit = (event) => {
    event.preventDefault();
    onAssignRole?.(selectedRole);
    execute("/api/admin/assign-role", {
      email: email,
      role: selectedRole,
    });
  };
  useEffect(() => {
    if (data) {
      setOpenModal(false);
    }
  }, [data]);
  return (
    <div>
      <Button
        onClick={() => setOpenModal(true)}
        isCircular
        buttonColor="btn-orange"
      >
        {"Assign Role"}
      </Button>

      {/* Modal Component */}
      <AnimatedModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalHeight="auto"
        canClose={true}
      >
        <h2 className="text-xl text-white font-semibold mb-4">Assign Role</h2>
        <p className="text-yellow-300 font-bold">
          Note:Your assigning new role for {email}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="role" className="text-white block mb-2 font-medium">
              Select Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-white w-full p-2 border border-gray-300 rounded-md"
            >
              <option className="" value="Cool kid">
                Cool kid
              </option>
              <option value="Cooler Kid">Cooler Kid</option>
              <option value="Coolest Kid">Coolest Kid</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              {isLoading ? "Processing..." : "Assign"}
            </button>
          </div>
        </form>
      </AnimatedModal>
    </div>
  );
};

export default AssignRoleModal;
