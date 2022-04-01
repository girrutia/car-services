import * as actionTypes from "../actions/vehicles/actionTypes";

const initialState: VehicleState = {
  vehicles: [],
  brandOptions: [],
  modelOptions: [],
  colorOptions: [],
  vehicleTypeOptions: [],
  ownerOptions: [],
};

const vehicleReducer = (
  state: VehicleState = initialState,
  action: VehicleAction
): VehicleState => {
  switch (action.type) {
    case actionTypes.ADD_VEHICLE_INIT:
    case actionTypes.UPDATE_VEHICLE_INIT:
    case actionTypes.REMOVE_VEHICLE_INIT:
    case actionTypes.FETCH_VEHICLE_INIT:
      return {
        ...state,
        loading: true,
        editing: false,
        error: {},
      };
    case actionTypes.EDIT_VEHICLE:
      return {
        ...state,
        editing: true,
        error: {},
      };
    case actionTypes.CANCEL_EDIT_VEHICLE:
      return {
        ...state,
        editing: false,
        error: {},
      };
    case actionTypes.ADD_VEHICLE_FAILURE:
    case actionTypes.UPDATE_VEHICLE_FAILURE:
    case actionTypes.REMOVE_VEHICLE_FAILURE:
    case actionTypes.FETCH_VEHICLE_FAILURE:
      return {
        ...state,
        loading: false,
        editing: false,
        error: action.error,
      };
    case actionTypes.ADD_VEHICLE_SUCCESS:
      if (!action.vehicle) return state;
      const { brand, color, model, patent, vehicleType, year, owner } = action.vehicle;
      const newVehicle: IVehicle = {
        id: Math.random(), // not really unique
        brand,
        color,
        model,
        patent,
        vehicleType,
        year,
        owner,
      };
      return {
        ...state,
        vehicles: state.vehicles.concat(newVehicle),
        loading: false,
        editing: false,
        error: {},
      };
    case actionTypes.UPDATE_VEHICLE_SUCCESS:
      if (!action.vehicle) return state;
      const idx = state.vehicles.findIndex((x) => x.id === action.vehicle?.id);
      const newVehicles: IVehicle[] = [
        ...state.vehicles.slice(0, idx),
        action.vehicle,
        ...state.vehicles.slice(idx + 1),
      ];
      return {
        ...state,
        vehicles: newVehicles,
        loading: false,
        editing: false,
        error: {},
      };
    case actionTypes.REMOVE_VEHICLE_SUCCESS:
      if (!action.vehicle) return state;
      const { id } = action.vehicle;
      const updatedVehicles: IVehicle[] = state.vehicles.filter(
        (vehicle) => vehicle.id !== id
      );
      return {
        ...state,
        vehicles: updatedVehicles,
        loading: false,
        editing: false,
        error: {},
      };
    case actionTypes.FETCH_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicles: action.vehicles || [],
        brandOptions: action.brandOptions || [],
        modelOptions: action.modelOptions || [],
        colorOptions: action.colorOptions || [],
        vehicleTypeOptions: action.vehicleTypeOptions || [],
        ownerOptions: action.ownerOptions || [],
        loading: false,
        editing: false,
        error: {},
      };
  }
  return state;
};

export default vehicleReducer;
