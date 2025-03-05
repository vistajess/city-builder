import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { TooltipProvider } from "../ui/tooltip";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";

export const ShowHide = ({
  isOverviewVisible,
  toggleShowHide,
}: {
  isOverviewVisible: boolean;
  toggleShowHide: () => void;
}) => {
  const Icon = isOverviewVisible ? EyeSlashIcon : EyeIcon;

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon
              className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors"
              onClick={toggleShowHide}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Hide overview</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
