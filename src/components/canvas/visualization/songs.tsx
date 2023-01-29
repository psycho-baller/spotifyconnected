import Song from "./song";
import type { SongType } from "@/utils/types";

export default function Songs({ data }: { data: SongType[] }) {

  return (
    <> 
      {data.map((song: SongType, index: number) => {
        return <Song  key={song.id} song={song} index={index} />;
      })}
    </>
  );
}
