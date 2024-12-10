import axios from "axios";

import { atomFamily,selectorFamily } from "recoil";
import { atom,selector } from "recoil";

export const getAdminUser = atomFamily({
  key:"AdminUser",
  default:selectorFamily({
    key:"adminUsrSelector",
    get:(id)=>async()=>{
      const res = await axios.get(`/api/peoples/getadmin`);
      return res.data
  }
  })
});


export const usrrr = atom({
   key:"adminFI",
   default:selector({
      key:"usrselector",
      get:async()=>{
        const res = await axios.get(`/api/peoples/getadmin`);
        return res.data
      }
   })
});