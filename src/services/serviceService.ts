import axios from "axios";

export default {
  fetchServicesService: async (): Promise<IService[]> => {
    let retVal: IService[] = [];
    try {
      const result = await axios.get("/mock/services.json");
      if (result?.data) {
        retVal = result.data;
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  },
  fetchServiceTypeService: async (): Promise<ServiceType[]> => {
    let retVal: ServiceType[] = [];
    try {
      const result = await axios.get("/mock/serviceTypes.json");
      if (result?.data) {
        retVal = result.data;
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  },
};
