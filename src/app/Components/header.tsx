import NavBar from "./navbar";

export default function Header() {
  return (
    <div className="flex flex-col bg-[#FFFFFF]">
      <div className="h-[69px] border-[1px] border-[#AEB6CE33]">
        <nav></nav>
      </div>
      <NavBar />
    </div>
  );
}
