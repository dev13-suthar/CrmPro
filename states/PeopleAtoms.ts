import {atom, selector} from "recoil"
import axios from "axios"

export const peoplesSelector = selector({
    key:"PeolpleSelector",
    get:async()=>{
    try {
      const res = await axios.get("/api/peoples");
      const data = res.data;
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching peoples data:", error);
      throw error; // Handle the error if needed
    }
    }
})

export const peoplesAtom = atom({
    key:"PeoplesAtom",
    default:peoplesSelector
});

