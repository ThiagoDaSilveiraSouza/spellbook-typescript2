import { api } from "../api";

interface IspellResponse {
  index: string;
  name: string;
  url: string;
}

export const getAllSpells = async () => {
  try {
    const { data, status } = await api.get("/api/spells");
    if (status === 200) {
      const results: IspellResponse[] = data.results;
      return await Promise.all(
        results.map(async (spell) => {
          const { data } = await api.get(spell.url);
          return data;
        })
      );
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
