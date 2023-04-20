import genres from "../data/genres";

//Interface for an individual genre object returned from the rawg.io API
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => ({ data: genres, isLoading: false, error: null });

export default useGenres;
