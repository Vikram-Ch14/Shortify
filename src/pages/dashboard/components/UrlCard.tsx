import { Button } from "@/components/ui/button";
import { getOriginalUrl } from "@/service/HttpService";
import { useAuthStore } from "@/store/authStore";
import { UrlCollection } from "@/store/types";
import { Copy, Delete, Download, Trash } from "lucide-react";
import { Link } from "react-router-dom";

type UrlCardProps = {
  url: UrlCollection;
};

const UrlCard = ({ url }: UrlCardProps) => {
  const currentUser = useAuthStore((state) => state?.currentUser);

  const handleClick = async (urlId: string) => {
    const response = await getOriginalUrl(currentUser?.id!, urlId);
    const routePath = response?.original_url;
    window.open(routePath, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      {url?.qr && (
        <img
          src={url?.qr}
          alt="QR Code"
          className="h-32 object-contain ring ring-blue-500"
        />
      )}

      <div className="flex flex-col flex-1 gap-2">
        <span
          className="text-3xl font-extrabold hover:underline cursor-pointer"
          onClick={() => handleClick(url?.id)}
        >
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          {url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost">
          <Copy />
        </Button>
        <Button variant="ghost">
          <Download />
        </Button>
        <Button variant="ghost">
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default UrlCard;
