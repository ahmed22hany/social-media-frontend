/* eslint-disable react/prop-types */
import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { IoMdHeart } from "react-icons/io";

const PostCell = ({
  cellImage,
  cellText,
  userName,
  likesNumber,
  commentsNumber,
}) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className="border-black border-2 p-4 space-y-4 rounded-2xl shadow-xl md:w-3/4">
      {/* cell header ---------------------------------- */}
      <div className="flex justify-between">
        {/* profile photo */}
        <div className="w-11 h-10">
          <img
            src={cellImage}
            alt="Profie photo"
            className="rounded-full h-full w-full object-cover"
          />
        </div>

        {/* username*/}
        <div className="flex justify-start ps-3 items-center w-full font-bold">
          <h3>{userName}</h3>
        </div>

        {/* options ------------------------------------ */}
        <button>
          <SlOptionsVertical />
        </button>
      </div>

      {/* cell body */}
      <div className="w-full">
        <p>{cellText} sd</p>
      </div>

      {/* cell bottom --------------------------------- */}
      <div className="flex gap-4">
        {/* likes */}
        <div className="flex justify-center items-center gap-1">
          <IoMdHeart
            onClick={toggleLike}
            className={`size-5 ${
              liked ? "text-red-500" : "text-gray-400"
            } cursor-pointer`}
          />
          {likesNumber + (liked ? 1 : 0)}
        </div>
        {/* comments */}
        <div className="flex justify-center items-center gap-1">
          <PiChatCenteredTextFill className="size-5 text-gray-400 cursor-pointer" />
          {commentsNumber}
        </div>
      </div>
    </div>
  );
};

export default PostCell;
