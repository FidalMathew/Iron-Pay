import {cn} from "@/lib/utils";
import {forwardRef} from "react";

const CustomButton = forwardRef(
  ({className, backBg = "bg-pink-500", onClick, children, ...props}, ref) => {
    return (
      <div
        onClick={onClick}
        className={cn("relative group cursor-pointer", className)}
        ref={ref}
        {...props}
      >
        <div className="bg-white border border-black w-[150px] h-[50px] absolute z-10 rounded-[0.1rem] grid place-items-center font-semibold text-sm">
          {children}
        </div>
        <div
          className={cn(
            `border border-black w-[150px] h-[50px] translate-x-[4px] translate-y-[4px] z-0 rounded-[0.1rem] group-hover:translate-x-[3px] group-hover:translate-y-[3px] duration-100 ease-in`,
            backBg
          )}
        />
      </div>
    );
  }
);

export default CustomButton;
