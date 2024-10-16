/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { RiArrowRightSLine } from "react-icons/ri";

const ActivityCell = ({ cellImage, activityText, userName, postID }) => {
  return (
    <div className="border-black border-2 p-4 space-y-4 rounded-2xl shadow-xl md:w-3/4">
      {/* cell header ---------------------------------- */}
      <div className="flex justify-between items-center">
        {/* profile photo */}
        <div className="w-11 h-10">
          <img
            src={cellImage}
            alt="Profie photo"
            className="rounded-full h-full w-full object-cover"
          />
        </div>

        {/* cell body ---------------------------------- */}
        <div className="flex justify-start ps-3 items-center w-full">
          <p>
            <strong>{userName} </strong>
            {activityText}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <RiArrowRightSLine className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ActivityCell;
