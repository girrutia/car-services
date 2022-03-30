import axios from "axios";

export default {
  fetchOwnersService: async (): Promise<IOwner[]> => {
    let retVal: IOwner[] = [];
    try {
      const result = await axios.get("/mock/owner.json");
      if (result?.data) {
        retVal = result.data.sort((a: IOwner, b: IOwner) =>
          a.surname > b.surname ? 1 : a.surname < b.surname ? -1 : 0
        );
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  },
};
