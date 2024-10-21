import profilePicTest from "../assets/pouyaj.jpg";

const ProfilePic = () => {
  return (
    <img
      src={profilePicTest}
      alt="Avatar"
      className="rounded-[50%] p-2 h-[65px]"
    ></img>
  );
};

export default ProfilePic;
