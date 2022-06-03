import { api } from "../api";

interface ISkillsResponse {
  index: string;
  name: string;
  url: string;
}

export const getAllSkills = async () => {
  try {
    const { data, status } = await api.get("/api/skills");
    if (status === 200) {
      const results: ISkillsResponse[] = data.results;
      const allSkills = await Promise.all(
        results.map(async (skill) => {
          const { data } = await api.get(skill.url);
          return data;
        })
      );
      return allSkills;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
