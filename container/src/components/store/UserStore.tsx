import { atom, useAtom } from "jotai";

const userAtom = atom<string>("");

const useUserStore = () => useAtom(userAtom);

export default useUserStore;
