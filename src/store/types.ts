export type UserData = {
  username: string;
  email: string;
  id: string;
};

export type UrlCollection = {
  created_at: string;
  custom_url: string;
  original_url: string;
  id: string;
  qr: string;
  short_url: string;
  title: string;
  user_id: string;
};

export type UrlsCollection = {
  data: UrlCollection[];
};

export type ClicksCollectionData = {
  city: string;
  country: string;
  url_id: string;
  device: string;
};
