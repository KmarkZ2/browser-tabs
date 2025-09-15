"use client";

import { Link } from "@/types/links";
import Image from "next/image";
import Tab from "./tab";

import clsx from "clsx";
import { useState } from "react";
import { usePathname } from "next/navigation";

type PinnedParams = {
  list: Link[];
  setNewPinned: (link: Link) => void;
  setRef: (id: string, el: HTMLDivElement | null) => void;
};

export default function Pinned({ list, setNewPinned, setRef }: PinnedParams) {
  const path = usePathname();
  const [isHoveredPined, setIsHoveredPined] = useState<string | null>(null);

  return (
    <div className="flex flex-shrink-0">
      {list.map((el) => (
        <div
          className="relative flex flex-1"
          key={el.icon}
          ref={(e) => setRef(el.href, e)}
          onMouseEnter={() => setIsHoveredPined(el.href)}
          onMouseLeave={() => setIsHoveredPined(null)}
        >
          <Tab
            href={el.href}
            icon={el.icon}
            className={clsx(
              path === el.href &&
                "bg-[#F1F5F8] text-[#343434] border-t-[#4690E2] border-t-2"
            )}
          />
          {isHoveredPined === el.href && (
            <button
              onClick={() => setNewPinned(el)}
              className={
                "absolute top-full w-auto transition-opacity duration-200 z-50 bg-white rounded-md border-[1px] border-[#AEB6CE33] shadow-[0,6,30,0,#7B7F9112] py-2.5 px-[15px]"
              }
            >
              <Image
                src={"/icons/pin.svg"}
                alt={""}
                width={16}
                height={16}
                className="inline-block mr-2.5"
              />
              Tab anpinnen
              {}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
