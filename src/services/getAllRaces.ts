import { api } from "../api";

interface IRacesResponse {
  index: string;
  name: string;
  url: string;
}

export const getAllRaces = async () => {
  try {
    const { data, status } = await api.get("/api/races");
    if (status === 200) {
      const results: IRacesResponse[] = data.results;
      const allRaces = await Promise.all(
        results.map(async (race) => {
          const { data } = await api.get(race.url);
          return data;
        })
      );
      return allRaces;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
