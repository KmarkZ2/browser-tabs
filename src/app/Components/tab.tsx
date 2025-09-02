import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type TabProps = {
  href: string;
  label?: string;
  icon: string;
  index?: number;
  className?: string;
};

export default function Tab({ href, label, icon, index, className }: TabProps) {
  return (
    <div className="flex justify-center gap-2.5 hover:bg-[#F1F5F8] hover:text-[#343434] duration-200">
      <Link
        href={href}
        className={clsx(
          className,
          "flex items-center px-4 py-3 relative",
          index &&
            index > 0 &&
            "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-[16px] before:bg-[#AEB6CE33]"
        )}
      >
        {icon && <img className="w-4 h-4 mr-2.5" src={icon} />}
        {label}
      </Link>
    </div>
  );
}
