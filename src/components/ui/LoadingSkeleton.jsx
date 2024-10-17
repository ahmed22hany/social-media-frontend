import React from "react";
import {
  Box,
  Skeleton as ChakraSkeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      className="w-full h-full rounded-2xl">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default LoadingSkeleton;
