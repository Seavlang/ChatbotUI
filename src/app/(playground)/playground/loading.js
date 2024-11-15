import ChatLoading from "@/app/components/ChatLoading";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (<div className="flex justify-center mt-96 h-full">
    <l-dot-wave size="47" speed="1" color="#090854">
      
    </l-dot-wave>
  </div>)

}