"use client";

import { Link, LocalStorageLinks } from "@/types/links";

import Overflow from "./overflow";
import Pinned from "./pinned";
import Visible from "./visible";

import { useLayoutEffect, useRef } from "react";
import { useLocalStorage } from "../lib/localStorageData";
import isEqual from "lodash.isequal";

const navbarLinks: Link[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "/icons/dashboard.svg",
    pinned: false,
  },
  {
    href: "/banking",
    label: "Banking",
    icon: "/icons/banking.svg",
    pinned: false,
  },
  {
    href: "/telefonie",
    label: "Telefonie",
    icon: "/icons/telefonie.svg",
    pinned: false,
  },
  {
    href: "/accounting",
    label: "Accounting",
    icon: "/icons/accounting.svg",
    pinned: false,
  },
  {
    href: "/verkauf",
    label: "Verkauf",
    icon: "/icons/verkauf.svg",
    pinned: false,
  },
  {
    href: "/statistik",
    label: "Statistik",
    icon: "/icons/statistik.svg",
    pinned: false,
  },
  {
    href: "/postOffice",
    label: "Post Office",
    icon: "/icons/post_office.svg",
    pinned: false,
  },
  {
    href: "/administration",
    label: "Administration",
    icon: "/icons/administration.svg",
    pinned: false,
  },
  {
    href: "/help",
    label: "Help",
    icon: "/icons/help.svg",
    pinned: false,
  },
  {
    href: "/warenbestand",
    label: "Warenbestand",
    icon: "/icons/warenbestand.svg",
    pinned: false,
  },
  {
    href: "/auswahllisten",
    label: "Auswahllisten",
    icon: "/icons/auswahllisten.svg",
    pinned: false,
  },
  {
    href: "/einkauf",
    label: "Einkauf",
    icon: "/icons/einkauf.svg",
    pinned: false,
  },
  {
    href: "/rechn",
    label: "Rechn",
    icon: "/icons/rechn.svg",
    pinned: false,
  },
];

export default function NavBar() {
  const [links, setLinks] = useLocalStorage<LocalStorageLinks>("links", {
    visible: navbarLinks,
    overflow: [],
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef(new Map<string, HTMLDivElement>());

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const handleResize = () => {
      const containerWidth = container.getBoundingClientRect().width;

      setLinks((prev) => {
        let usedWidth = 0;
        const allLinks = [...prev.visible, ...prev.overflow];
        const visible: Link[] = [...allLinks.filter((el) => el.pinned)];
        const overflow: Link[] = [];

        allLinks
          .filter((el) => !el.pinned)
          .forEach((link, i) => {
            const child = linksRef.current.get(link.href);
            if (!child) return overflow.push(link);

            const childWidth = child.getBoundingClientRect().width;

            if (usedWidth + childWidth <= containerWidth) {
              visible.push(link);
              usedWidth += childWidth;
            } else {
              overflow.push(link);
            }
          });

        if (
          !isEqual(prev.visible, visible) ||
          !isEqual(prev.overflow, overflow)
        ) {
          return { overflow, visible };
        }
        return prev;
      });
    };

    const resizeObserve = new ResizeObserver(handleResize);
    resizeObserve.observe(container);

    handleResize();

    return () => resizeObserve.disconnect();
  }, []);

  const setNewPinned = (link: Link) => {
    const newLinks = links.visible.map((el) => {
      if (el.href === link.href) return { ...el, pinned: !el.pinned };
      return el;
    });
    setLinks((prev) => ({ ...prev, visible: newLinks }));
  };

  const setRef = (id: string, el: HTMLDivElement | null) => {
    if (el) linksRef.current.set(id, el);
    else linksRef.current.delete(id);
  };

  const onDroped = (list: Link[]) => {
    const newVisible = [...links.visible.filter((el) => el.pinned), ...list];
    setLinks((prev) => ({ ...prev, visible: newVisible }));
  };

  return (
    <nav className="h-[48px] flex">
      <Pinned
        list={links.visible.filter((el) => el.pinned)}
        setNewPinned={setNewPinned}
        setRef={setRef}
      />
      <Visible
        setNewPinned={setNewPinned}
        links={links.visible.filter((el) => !el.pinned)}
        containerRef={containerRef}
        setRef={setRef}
        onDroped={onDroped}
      />
      {links.overflow.length > 0 && (
        <Overflow list={links.overflow} setRef={setRef} />
      )}
    </nav>
  );
}
