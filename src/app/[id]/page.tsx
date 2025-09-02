interface PageProps {
  params: { id: string };
}

export default function linkPage({ params }: PageProps) {
  return (
    <div className="p-5 w-full h-full">
      <div className="bg-[#FEFEFE] rounded-md w-full h-full"></div>
    </div>
  );
}
