const UserLogo = ({ user }) => {
  return (
    <div className="flex items-center gap-2 ">
      <img
        className="w-8 h-8 rounded-full"
        src={
          user.profile_image == "default.jpg" ? avatar.src : user.profile_image
        }
        alt="Profile"
        height={15}
        width={15}
      />
      <div className="text-start">
        <h4 className="text-sm font-medium">{user.full_name}</h4>
        <p className="w-1/2 text-[8px] text-gray-400 truncate">
          Seller ID: {user._id}
        </p>
      </div>
    </div>
  );
};

export default UserLogo;
