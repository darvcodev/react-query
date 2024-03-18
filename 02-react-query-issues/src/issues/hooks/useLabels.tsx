import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);

  const { data } = await githubApi.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hour
    // Esta es la que se muestra mientras se carga la data
    // placeholderData: [
    //   {
    //     id: 52079258,
    //     node_id: "MDU6TGFiZWw1MjA3OTI1OA==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Difficulty:%20starter",
    //     name: "Difficulty: starter",
    //     color: "94ce52",
    //     default: false,
    //   },
    //   {
    //     id: 6344006318,
    //     node_id: "LA_kwDOAJy2Ks8AAAABeiHarg",
    //     url: "http://api.github.com/repos/facebook/react/labels/fb-exported",
    //     name: "fb-exported",
    //     color: "ededed",
    //     default: false,
    //   }, 
    // ],
    // Esta es la que sirve del cache
    // initialData: [
    //   {
    //     id: 52079258,
    //     node_id: "MDU6TGFiZWw1MjA3OTI1OA==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Difficulty:%20starter",
    //     name: "Difficulty: starter",
    //     color: "94ce52",
    //     default: false,
    //   },
    //   {
    //     id: 6344006318,
    //     node_id: "LA_kwDOAJy2Ks8AAAABeiHarg",
    //     url: "http://api.github.com/repos/facebook/react/labels/fb-exported",
    //     name: "fb-exported",
    //     color: "ededed",
    //     default: false,
    //   }, 
    // ],
  });

  return { labelsQuery };
};
