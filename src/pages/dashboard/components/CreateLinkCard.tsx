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
import { useState } from "react";

type UrlData = {
  custom_url: string;
  original_url: string;
  title: string;
};

const CreateLinkCard = () => {
  const [urlData, setUrlData] = useState<UrlData>({
    custom_url: "",
    original_url: "",
    title: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setUrlData((prev: UrlData) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createUrl = async () => {
    const { original_url, custom_url, title } = urlData;
    const short_url = Math.random().toString(36).substring(2, 6);
    
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-green-500 text-black hover:bg-red-800 hover:text-white">
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col gap-10">
        <DialogHeader className="flex flex-col gap-10">
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
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
            onClick={createUrl}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLinkCard;
