"use client";

import Tab from "./tab";
import { Link } from "@/types/links";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { DragEvent, RefObject, useState } from "react";
import clsx from "clsx";

type DnDParams = {
  links: Link[];
  setNewPinned: (link: Link) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  setRef: (id: string, el: HTMLDivElement | null) => void;
  onDroped: (list: Link[]) => void;
};

export default function Visible({
  links,
  setNewPinned,
  setRef,
  containerRef,
  onDroped,
}: DnDParams) {
  const path = usePathname();
  const [isHoveredVisible, setIsHoveredVisible] = useState<string | null>(null);
  const [draggedTab, setDraggedTab] = useState<Link>();

  function dragStartHandler(e: DragEvent<HTMLDivElement>, link: Link): void {
    setDraggedTab(link);
  }

  function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.classList.remove("overDrag");
  }

  function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.currentTarget.classList.add("overDrag");
  }

  function dropHandler(e: DragEvent<HTMLDivElement>, link: Link): void {
    e.preventDefault();
    if (!draggedTab) return;

    const draggedId = draggedTab.href;
    const targetdId = link.href;

    if (draggedId === targetdId) return;

    const filtered = links.filter((el) => el.href !== draggedId);
    const targetIndex = filtered.findIndex((el) => el.href === targetdId);

    filtered.splice(targetIndex, 0, draggedTab);
    onDroped(filtered);

    e.currentTarget.classList.remove("overDrag");
  }

  return (
    <div ref={containerRef} className="flex h-full w-full">
      {links.map((el, index) => {
        return (
          <div
            className="relative flex-shrink-0"
            key={el.label}
            ref={(e) => setRef(el.href, e)}
            onMouseEnter={() => setIsHoveredVisible(el.href)}
            onMouseLeave={() => setIsHoveredVisible(null)}
            onDragStart={(e) => dragStartHandler(e, el)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, el)}
          >
            <Tab
              href={el.href}
              label={el.label}
              icon={el.icon!}
              index={index}
              className={clsx(
                path === el.href &&
                  "bg-[#F1F5F8] text-[#343434] border-t-[#4690E2] border-t-2"
              )}
              draggable
              onDragStart={(e) => e.currentTarget.classList.add("dragging")}
              onDragEnd={(e) => e.currentTarget.classList.remove("dragging")}
            />
            {isHoveredVisible === el.href && (
              <button
                onClick={() => setNewPinned(el)}
                className={
                  "absolute top-full transition-opacity duration-200 z-50 bg-white rounded-md border-[1px] border-[#AEB6CE33] shadow-[0,6,30,0,#7B7F9112] py-2.5 px-[15px]"
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
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
