import React, { useEffect, useState } from "react";
import moment from "moment";
import Table from "../../../components/Table/Table";
import { useGet } from "../../../hooks/useGet";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import AssignRoleModal from "../admin/AssignRole/AssignRole";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useLocalStorage("user", "");
  const [limit, setLimit] = useState(10);

  const { data, error, isLoading, refetch } = useGet(
    `/api/users?page=${page}&limit=${limit}`
  );

  const columnData = [
    { heading: "First Name", value: "first_name" },
    { heading: "Last Name", value: "last_name" },
    { heading: "Role", value: "role" },
    { heading: "Country", value: "country" },
    { heading: "Registered On", value: "created_at" },
    user?.role === "Maintainer" && { heading: "Assign Role", value: "action" },
  ];

  useEffect(() => {
    if (!isLoading && data?.users) {
      const updatedCharacters = Array.isArray(data.users)
        ? data.users.map((character) => ({
            ...character,
            created_at: (
              <div className="text-sm">
                {moment(character.created_at).format("DD MMM, YYYY")}
              </div>
            ),
            action: (
              <AssignRoleModal
                email={character?.email}
                onAssignRole={() => {
                  refetch();
                }}
              />
            ),
          }))
        : [];
      setCharacters(updatedCharacters);
    }
  }, [data, isLoading]);

  const handleViewCharacter = (id) => {
    console.log(`View character with ID: ${id}`);
    // Add navigation logic here, e.g., router.push(`/characters/${id}`);
  };

  console.log("CHARACT UERS ", data?.users);
  return (
    <div className="rounded-lg mt-4 bg-white px-4 py-8">
      {error ? (
        <div className="text-white text-center bg-gray-700">
          Access denied. Upgrade to Cooler or Coolest Kid to view characters.
        </div>
      ) : (
        // <>dskldsakl</>
        <Table
          currentPage={page}
          error={error}
          pageLimit={limit}
          loading={isLoading}
          onPaginationChange={(val) => {
            setPage(val?.page);
            setLimit(val?.limit);
          }}
          tableTitle="Character List"
          totalItems={characters?.length}
          data={characters}
          columnData={columnData}
          onClickRow={(item) => {
            handleViewCharacter(item.id);
          }}
        />
      )}
    </div>
  );
};

export default CharacterList;
