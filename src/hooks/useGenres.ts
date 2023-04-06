import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

//Interface for an individual genre object returned from the rawg.io API
interface Genre {
  id: number;
  name: string;
}

//Interface for the array of genre objects returned from the rawg.io API
interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  //Saving the state of the genres returned from the rawg.io API and/or the errors
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");

  //Saving the state of the loading of the genres
  const [isLoading, setLoading] = useState(false);

  //API call to the rawg.io API to get the array of genres, with error handling
  useEffect(() => {
    /*
        Uses the browsers AbortController API to handle cancellations. When called this causes 
        the fetch operation and every subsequent, then() method to be discarded, and the catch() 
        method to execute. The catch() block then has a check to differentiate whether an actual 
        error occurred, which would require an error message to be set in the state.
      */
    const controller = new AbortController();

    setLoading(true);

    apiClient
      .get<FetchGenresResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);

        //Below line should be done in the final method but not working with strict mode on for some reason
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();

    //The array below is an array of dependencies. This prevents constant calls to the backend.
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
