import { Loader } from "lucide-react";
type Props = {};

const PageLoader = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};

export default PageLoader;
