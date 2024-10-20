import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { postUrls } from "@/service/HttpService";
import { useAuthStore } from "@/store/authStore";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { QRCodeCanvas } from "qrcode.react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type UrlData = {
  custom_url: string;
  original_url: string;
  title: string;
};

type CreateLinkCardProps = {
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
};

const CreateLinkCard = ({ setIsRefresh }: CreateLinkCardProps) => {
  const [urlData, setUrlData] = useState<UrlData>({
    custom_url: "",
    original_url: "",
    title: "",
  });
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const qrRef = useRef<HTMLCanvasElement | null>(null);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [searchParams, setSearchParams] = useSearchParams();
  const isUrl = searchParams?.get("url") ?? "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setUrlData((prev: UrlData) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const generateShortUrl = async () => {
    const short_url = Math.random().toString(36).substring(2, 6);
    setShortUrl(short_url);
  };

  const resetState = () => {
    setUrlData((prevData: UrlData) => {
      return {
        ...prevData,
        custom_url: "",
        title: "",
        original_url: "",
      };
    });
  };

  const createUrlCollection = async (qrCode: string) => {
    setIsLoading(true);
    const { original_url, custom_url, title } = urlData;
    if (
      title?.length &&
      original_url?.length &&
      qrCode?.length &&
      currentUser?.id
    ) {
      const uniqueId = uuidv4();
      try {
        await postUrls(
          currentUser?.id,
          uniqueId,
          custom_url,
          original_url,
          qrCode,
          shortUrl,
          title
        );
        setIsOpen(false);
        resetState();
        setIsRefresh((prev) => !prev);
      } catch (e) {
        console.error("error", e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (shortUrl?.length && qrRef?.current) {
      const qrCodeUrl = qrRef.current.toDataURL("image/png");
      createUrlCollection(qrCodeUrl);
    }
  }, [shortUrl]);

  useEffect(() => {
    if (isUrl?.length) {
      setIsOpen(true);
      setUrlData((prevData: UrlData) => {
        return {
          ...prevData,
          original_url: isUrl,
        };
      });
    }
  }, [isUrl]);

  const handleClose = (isClose: boolean) => {
    setIsOpen(isClose);
    setSearchParams({});
    setUrlData((prevData: UrlData) => {
      return {
        ...prevData,
        original_url: "",
      };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isClose) => handleClose(isClose)}>
      <DialogTrigger>
        <Button className="bg-green-500 text-black hover:bg-red-800 hover:text-white">
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col gap-10">
        <DialogHeader className="flex flex-col gap-10">
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>

          {urlData?.original_url && (
            // Render the QR code as a canvas using QRCodeCanvas
            <QRCodeCanvas
              value={shortUrl}
              size={120}
              marginSize={1}
              ref={qrRef}
            />
          )}

          <Input
            id="link-title"
            placeholder="Short Link Title"
            className="p-5"
            name="title"
            value={urlData?.title}
            onChange={onChange}
          />
          <Input
            id="original-title"
            placeholder="Enter Your Url"
            className="p-5"
            name="original_url"
            value={urlData?.original_url}
            onChange={onChange}
          />
          <div className="flex items-center gap-2">
            <Card className="p-2">Shorten.in</Card>
            <Input
              id="custom-title"
              placeholder="Custom Link (Optional)"
              className="p-5"
              name="custom_url"
              value={urlData?.custom_url}
              onChange={onChange}
            />
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            className="bg-green-500 text-black hover:bg-red-800 hover:text-white"
            onClick={generateShortUrl}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLinkCard;
