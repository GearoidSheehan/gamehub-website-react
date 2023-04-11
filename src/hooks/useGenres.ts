import useData from "./useData";

//Interface for an individual genre object returned from the rawg.io API
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => useData<Genre>("/genres");

export default useGenres;
