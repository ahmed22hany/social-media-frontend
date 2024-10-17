import { Skeleton } from "../../components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <div className="space-y-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-300" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-300" />
          <Skeleton className="h-4 w-[200px] bg-gray-300" />
          <Skeleton className="h-4 w-[200px] bg-gray-300" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-300" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-300" />
          <Skeleton className="h-4 w-[200px] bg-gray-300" />
          <Skeleton className="h-4 w-[200px] bg-gray-300" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-300" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-300" />
          <Skeleton className="h-4 w-[200px] bg-gray-300" />
          <Skeleton className="h-4 w-[200px] bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
