import { UrlCollection } from "@/store/types";
import { Link } from "react-router-dom";
import { formatDate } from "../utils";

type UrlCardProps = {
  url: UrlCollection;
};

const UrlCard = ({ url }: UrlCardProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <Link to={`/link/${url?.id}`}>
        <span>{url?.title}</span>
        <span>{url?.short_url}</span>
        <span>{url?.original_url}</span>
        <span>{url?.created_at}</span>
      </Link>
    </div>
  );
};

export default UrlCard;
