import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";
import React, { useEffect, useState } from "react";

type CriteriaProps = {
  disabled?: boolean;
  isLastItem?: boolean;
  children: React.ReactNode;
  status: "passed" | "failed";
};

const CriteriaWrapper = ({
  children,
  status,
  disabled,
  isLastItem,
}: CriteriaProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isLastItem && (
        <div
          aria-hidden="true"
          className={twMerge(
            disabled && "opacity-10",
            "absolute left-6 top-4 -ml-px mt-0.5 h-full w-0.5 bg-white/60 to-teal-400/40 line-grow"
          )}
        />
      )}

      <div
        className={twMerge(
          disabled && "opacity-10",
          !disabled &&
            "hover:-translate-y-1 hover:translate-x-3 hover:bg-gradient-to-r hover:scale-105 from-zinc-900/0 to-zinc-900 transition-all",
          "group relative flex items-start rounded-xl py-4 px-2 "
        )}
      >
        <span className="flex h-9 items-center">
          <span
            className={twMerge(
              status === "passed" && "ring-teal-400/70",
              status === "failed" && "ring-yellow-600/70",
              "ring relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 animate__animated animate__zoomIn"
            )}
          >
            {checked ? (
              status === "failed" ? (
                <Icon
                  icon="mdi:close-circle"
                  className="w-7 h-7 text-yellow-600"
                />
              ) : (
                <Icon
                  icon="mdi:check-circle"
                  className="w-7 h-7 text-teal-600"
                />
              )
            ) : (
              <Icon
                icon="eos-icons:loading"
                className="w-7 h-7 text-cyan-400"
              />
            )}
          </span>
        </span>
        <span className="ml-4 flex min-w-0 flex-col gap-2 animate__animated animate__fadeIn">
          {children}
        </span>
      </div>

      {disabled && (
        <div className="bg-zinc-900/10 absolute w-full h-full inset-0 rounded-3xl"></div>
      )}
    </>
  );
};

export default CriteriaWrapper;
