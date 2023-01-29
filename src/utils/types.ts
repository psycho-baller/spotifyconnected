export interface ItemType {
  track: {
    id: string;
    name: string;
  };
}
export interface SongType {
  id: string;
  name: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  connections: {
    instagram: string[];
    spotify: string[];
  };
}
