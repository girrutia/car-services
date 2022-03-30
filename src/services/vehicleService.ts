import axios from "axios";

export default {
  fetchVehiclesService: async (): Promise<IVehicle[]> => {
    let retVal: IVehicle[] = [];
    try {
      const result = await axios.get("/mock/vehicles.json");
      if (result?.data) {
        retVal = result.data;
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  },
  fetchBrandsService: async (): Promise<IBrand[]> => {
    let retVal: IBrand[] = [];
    try {
      const result = await axios.get("/mock/brand.json");
      if (result?.data) {
        retVal = result.data.sort((a: IBrand, b: IBrand) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  },
  fetchModelsService: async (): Promise<IModel[]> => {
    let retVal: IModel[] = [];
    try {
      const result = await axios.get("/mock/model.json");
      if (result?.data) {
        retVal = result.data.sort((a: IModel, b: IModel) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  },
  fetchVehicleTypesService: async (): Promise<IVehicleType[]> => {
    let retVal: IVehicleType[] = [];
    try {
      const result = await axios.get("/mock/vehicleType.json");
      if (result?.data) {
        retVal = result.data;
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  },
  fetchColorsService: async (): Promise<IColor[]> => {
    let retVal: IColor[] = [];
    try {
      const result = await axios.get("/mock/colors.json");
      if (result?.data) {
        retVal = result.data;
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  },
};
