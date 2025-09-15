import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

type TabProps = {
  href: string;
  label?: string;
  icon: string;
  index?: number;
  className?: string;
  linkClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Tab({
  href,
  label,
  icon,
  index,
  className,
  linkClassName,
  ...rest
}: TabProps) {
  return (
    <div
      className={clsx(
        className,
        "hover:bg-[#F1F5F8] hover:text-[#343434] duration-200 flex",
        index &&
          index > 0 &&
          "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-[16px] before:bg-[#AEB6CE33]"
      )}
      {...rest}
    >
      <Link
        href={href}
        className={clsx("flex gap-2.5 px-4 py-[15px] relative", linkClassName)}
      >
        <Image src={icon} alt="" width={16} height={16} />
        {label}
      </Link>
    </div>
  );
}
