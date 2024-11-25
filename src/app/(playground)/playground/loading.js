import ChatLoading from "@/app/components/ChatLoading";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" h-full flex justify-center -mt-40   gap-4">
      <Spinner label="Loading..." color="default" labelColor="primary" />
    </div>
  )

}