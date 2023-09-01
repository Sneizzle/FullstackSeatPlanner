import { PersonConfig } from "@/app/admin/Interfaces";
import { atom } from "recoil";

export const personState = atom <PersonConfig>({
  key: "personState", // unique ID (with respect to other atoms/selectors)
  default: {} as PersonConfig, // default value (aka initial value)
});




export const peopleState = atom <PersonConfig[]>({
    key: "peopleState", // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
  });