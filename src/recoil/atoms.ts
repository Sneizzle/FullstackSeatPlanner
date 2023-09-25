import { PersonConfig } from "@/app/admin/Interface/Interfaces";
import { atom } from "recoil";
export const personState = atom <PersonConfig | undefined>({
  key: "personState", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});
export const peopleState = atom <PersonConfig[]>({
    key: "peopleState", // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
  });