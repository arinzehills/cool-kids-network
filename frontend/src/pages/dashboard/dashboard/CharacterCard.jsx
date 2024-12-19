import React from "react";
import { useGet } from "../../../hooks/useGet";

const CharacterCard = () => {
  const { data, error, isLoading } = useGet("/api/user");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("DATACAHR, ", data);
  const user = data?.user;

  if (!user) return <div>No user data available.</div>;

  return (
    <div className=" shadow-md rounded-lg p-6 max-w-md mx-auto text-gray-100">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">
        Your Character Details
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : !user ? (
        <div>No user data available.</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div class="p-8 grid grid-cols-2 gap-4 text-gray-300 w-full sm:max-w-[522px] max-w-[95%] [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border">
          <div className="font-semibold">ID:</div>
          <div>{user.id}</div>
          <div className="font-semibold">First Name:</div>
          <div>{user.first_name}</div>
          <div className="font-semibold">Last Name:</div>
          <div>{user.last_name}</div>
          <div className="font-semibold">Email:</div>
          <div>{user.email}</div>
          <div className="font-semibold">Country:</div>
          <div>{user.country}</div>
          <div className="font-semibold">Role:</div>
          <div>{user.role}</div>
          <div className="font-semibold">Created At:</div>
          <div>{new Date(user.created_at).toLocaleString()}</div>
          <div className="font-semibold">Updated At:</div>
          <div>{new Date(user.updated_at).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
