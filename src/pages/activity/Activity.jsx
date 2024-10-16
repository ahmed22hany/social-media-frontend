import ActivityCell from "../../components/shared/ActivityCell";

const somePosts = [
  {
    id: 1,
    username: "deVeloper",
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KehqXBrMLd32HsfjDoaq098WeNA0b3g_2A&s",
    postText: "This is a testing test in the cell",
    activityText: "has followed you.",
    likes: 120,
    comments: 65,
  },
  {
    id: 2,
    username: "HamdyShal",
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDpWYsLSeY1sLvwgFNwBeJGjszUfEofDpwJw&s",
    postText: "This hamdy shal is a testing test in the cell",
    activityText: "commented on your post.",
    likes: 1200,
    comments: 650,
  },
  {
    id: 3,
    username: "ahmedHany",
    profileImg:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    postText: "This ahmed hany is a testing test in the cell",
    activityText: "liked your post.",
    likes: 130,
    comments: 25,
  },
];

const Activity = () => {
  return (
    <div className="flex flex-col gap-y-4 md:items-center md:justify-center p-4">
      <h1 className="font-black text-2xl">Activity</h1>
      {somePosts.map((post) => (
        <ActivityCell
          key={post.id}
          cellImage={post.profileImg}
          activityText={post.activityText}
          userName={post.username}
          postID={post.id}
        />
      ))}
    </div>
  );
};

export default Activity;
