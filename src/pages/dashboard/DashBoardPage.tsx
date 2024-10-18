import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUrls } from "@/service/HttpService";
import { useAuthStore } from "@/store/authStore";
import { UrlCollection } from "@/store/types";
import { Filter, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import UrlCard from "./components/UrlCard";
import CreateLinkCard from "./components/CreateLinkCard";

const DashBoardPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [urls, setUrls] = useState<UrlCollection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const currentUser = useAuthStore((state) => state.currentUser);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e?.target?.value);
  };

  const fetchUrls = async () => {
    setIsLoading(true);
    if (currentUser?.id) {
      try {
        const response = await getUrls(currentUser?.id);
        setUrls(response?.data!);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [currentUser, isRefresh]);

  const filterUrls = useMemo(() => {
    const filteredUrls = urls?.filter((url: UrlCollection) =>
      url?.title?.toLowerCase().includes(searchValue?.toLowerCase())
    );
    return filteredUrls;
  }, [urls, searchValue]);

  return (
    <div className="flex flex-col gap-8">
      <div></div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>URLs</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <p>{urls?.length}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cilcks</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <p>{urls?.length}</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLinkCard setIsRefresh={setIsRefresh} />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchValue}
          onChange={onChange}
          className="h-12"
        />
        <Filter className="absolute top-3 right-2 pr-2" />
      </div>
      <div className="flex flex-col gap-4 pb-16">
        {filterUrls?.map((url: UrlCollection) => {
          return <UrlCard url={url} key={url?.id} />;
        })}
      </div>
    </div>
  );
};
export default DashBoardPage;
