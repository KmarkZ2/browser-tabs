"use client";

import clsx from "clsx";
import { RefObject, useState } from "react";
import Tab from "./tab";
import { Link } from "@/types/links";

type OverflowParams = {
  list: Link[];
  setRef: (id: string, el: HTMLDivElement | null) => void;
};

export default function Overflow({ list, setRef }: OverflowParams) {
  const [overflowOpen, setOverflowOpen] = useState<boolean>(false);

  return (
    <button
      className={clsx(
        "w-9 flex justify-center items-center bg-no-repeat bg-center  bg-[length:16px_16px] duration-200 relative",
        !overflowOpen
          ? "bg-[#FFFFFF] bg-[url(/icons/arrow.svg)] "
          : "bg-[#4690E2] bg-[url(/icons/arrow_up.svg)]"
      )}
      onClick={() => setOverflowOpen((prev) => !prev)}
    >
      <div
        className={clsx(
          "absolute flex flex-col items-start right-0 top-full p-[15px] bg-[#FFFFFF] border-[1px] border-[#E9E9E9B2] divide-y-[1px] divide-[#AEB6CE33] w-[225px] duration-75",
          !overflowOpen
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
      >
        {list.map((el) => (
          <div key={el.href} ref={(e) => setRef(el.href, e)} className="w-full">
            <Tab
              href={el.href}
              icon={el.icon}
              label={el.label}
              linkClassName="w-full"
            />
          </div>
        ))}
      </div>
    </button>
  );
}
