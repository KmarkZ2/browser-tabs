"use client";

import { usePathname } from "next/navigation";
import Tab from "./tab";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/types/links";
import Image from "next/image";
import { DragDropContext } from "@hello-pangea/dnd";

const navbarLinks: Link[] = [
  { href: "/dashboard", label: "Dashboard", icon: "/icons/dashboard.svg" },
  { href: "/banking", label: "Banking", icon: "/icons/banking.svg" },
  {
    href: "/telefonie",
    label: "Telefonie",
    icon: "/icons/telefonie.svg",
  },
  {
    href: "/accounting",
    label: "Accounting",
    icon: "/icons/accounting.svg",
  },
  { href: "/verkauf", label: "Verkauf", icon: "/icons/verkauf.svg" },
  {
    href: "/statistik",
    label: "Statistik",
    icon: "/icons/statistik.svg",
  },
  {
    href: "/postOffice",
    label: "Post Office",
    icon: "/icons/post_office.svg",
  },
  {
    href: "/administration",
    label: "Administration",
    icon: "/icons/administration.svg",
  },
  { href: "/help", label: "Help", icon: "/icons/help.svg" },
  {
    href: "/warenbestand",
    label: "Warenbestand",
    icon: "/icons/warenbestand.svg",
  },
  {
    href: "/auswahllisten",
    label: "Auswahllisten",
    icon: "/icons/auswahllisten.svg",
  },
  { href: "/einkauf", label: "Einkauf", icon: "/icons/einkauf.svg" },
  { href: "/rechn", label: "Rechn", icon: "/icons/rechn.svg" },
];

export default function NavBar() {
  const path = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflowOpen, setOverflowOpen] = useState<boolean>(false);
  const [visibleLinks, setVisibleLinks] = useState<Link[]>([]);
  const [overflowLinks, setOverflowLinks] = useState<Link[]>([]);
  const [pinned, setPinned] = useState<Link[]>([]);
  const [isHoveredVisible, setIsHoveredVisible] = useState<string | null>(null);
  const [isHoveredPined, setIsHoveredPined] = useState<string | null>(null);

  useEffect(() => {
    try {
      const getVisibleLinks = localStorage.getItem("visibleLinks");
      const getOverflowLinks = localStorage.getItem("overflowLinks");
      const getPinnedLinks = localStorage.getItem("pinnedLinks");
      if (getVisibleLinks) {
        const parsed = JSON.parse(getVisibleLinks);
        setVisibleLinks(
          Array.isArray(parsed) && parsed.length > 0 ? parsed : navbarLinks
        );
      }
      setOverflowLinks(getOverflowLinks ? JSON.parse(getOverflowLinks) : []);
      setPinned(getPinnedLinks ? JSON.parse(getPinnedLinks) : []);
    } catch (er) {
      console.error(er);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("visibleLinks", JSON.stringify(visibleLinks));
  }, [visibleLinks]);

  useEffect(() => {
    localStorage.setItem("overflowLinks", JSON.stringify(overflowLinks));
  }, [overflowLinks]);

  useEffect(() => {
    localStorage.setItem("pinnedLinks", JSON.stringify(pinned));
  }, [pinned]);

  const setNewPinned = (link: Link) => {
    const isExist = pinned.some((l) => l.href === link.href);
    if (isExist) {
      setPinned((prev) => prev.filter((item) => item.href !== link.href));
      setVisibleLinks((prev) => [...prev, link]);
    } else {
      setPinned((prev) => [...prev, link]);
      setVisibleLinks((prev) => prev.filter((el) => el.href !== link.href));
      setOverflowLinks((prev) => prev.filter((el) => el.href !== link.href));
    }
  };

  const openOverflowsLinks = () => {
    setOverflowOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;

      const children = Array.from(container.children) as HTMLElement[];
      const containerWidth = container.offsetWidth;

      if (!pinned) return;
      const unPinned = navbarLinks.filter(
        (el) => !pinned.some((p) => p.href === el.href)
      );

      let usedWidth = 0;
      const visible: Link[] = [];
      const overflow: Link[] = [];

      unPinned.forEach((link, i) => {
        const childWidth = children[i]?.offsetWidth || 0;
        usedWidth += childWidth;
        if (usedWidth < containerWidth - 50) {
          visible.push(link);
        } else {
          overflow.push(link);
        }
      });

      setVisibleLinks(visible);
      setOverflowLinks(overflow);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [pinned]);

  return (
    <nav className="h-[49px] flex">
      {pinned &&
        pinned.map((el) => (
          <div
            className="relative w-auto h-auto flex-shrink-0"
            key={el.icon}
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

      <div className="flex relative justify-stretch w-full">
        <div ref={containerRef} className="flex relative w-full">
          {visibleLinks.map((el, index) => {
            return (
              <div
                className="relative flex-shrink-0"
                key={el.label}
                onMouseEnter={() => setIsHoveredVisible(el.href)}
                onMouseLeave={() => setIsHoveredVisible(null)}
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
                />
                {isHoveredVisible === el.href && (
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
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {overflowLinks.length > 0 && (
          <button
            className={clsx(
              "w-9 flex justify-center items-center bg-no-repeat bg-center  bg-[length:16px_16px] duration-200",
              !overflowOpen
                ? "bg-[#FFFFFF] bg-[url(/icons/arrow.svg)] "
                : "bg-[#4690E2] bg-[url(/icons/arrow_up.svg)]"
            )}
            onClick={openOverflowsLinks}
          ></button>
        )}
        {overflowOpen && (
          <div className="absolute right-0 top-full p-[15px] bg-[#FFFFFF] border-[1px] border-[#E9E9E9B2] divide-y-[1px] divide-[#AEB6CE33] flex flex-col items-start">
            {overflowLinks.map(
              (el) =>
                el && (
                  <Tab
                    key={el.icon}
                    href={el.href}
                    icon={el.icon}
                    label={el.label}
                  />
                )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
