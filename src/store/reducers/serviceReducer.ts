import * as actionTypes from "../actions/services/actionTypes";

const initialState: ServiceState = {
  services: [],
  serviceTypeOptions: [],
  vehicleOptions: [],
};

const serviceReducer = (
  state: ServiceState = initialState,
  action: ServiceAction
): ServiceState => {
  switch (action.type) {
    case actionTypes.ADD_SERVICE_INIT:
    case actionTypes.UPDATE_SERVICE_INIT:
    case actionTypes.REMOVE_SERVICE_INIT:
    case actionTypes.FETCH_SERVICE_INIT:
      return {
        ...state,
        loading: true,
        editing: false,
        error: {},
      };
    case actionTypes.EDIT_SERVICE:
      return {
        ...state,
        editing: true,
        error: {},
      };
    case actionTypes.CANCEL_EDIT_SERVICE:
      return {
        ...state,
        editing: false,
        error: {},
      };
    case actionTypes.ADD_SERVICE_FAILURE:
    case actionTypes.UPDATE_SERVICE_FAILURE:
    case actionTypes.REMOVE_SERVICE_FAILURE:
    case actionTypes.FETCH_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        editing: false,
        error: action.error,
      };
    case actionTypes.ADD_SERVICE_SUCCESS:
      if (!action.service) return state;
      const { creationDate, serviceTypes, vehicle } = action.service;
      const newService: IService = {
        id: Math.random(), // not really unique
        serviceTypes,
        vehicle,
        creationDate: creationDate,
      };
      return {
        ...state,
        services: state.services.concat(newService),
        loading: false,
        editing: false,
        error: {},
      };
    case actionTypes.UPDATE_SERVICE_SUCCESS:
      if (!action.service) return state;
      const idx = state.services.findIndex((x) => x.id === action.service?.id);
      const newServices: IService[] = [
        ...state.services.slice(0, idx),
        action.service,
        ...state.services.slice(idx + 1),
      ];
      return {
        ...state,
        services: newServices,
        loading: false,
        editing: false,
        error: {},
      };
    case actionTypes.REMOVE_SERVICE_SUCCESS:
      if (!action.service) return state;
      const { id } = action.service;
      const updatedVehicles: IService[] = state.services.filter(
        (service) => service.id !== id
      );
      return {
        ...state,
        services: updatedVehicles,
        loading: false,
        editing: false,
        error: {},
      };
    case actionTypes.FETCH_SERVICE_SUCCESS:
      return {
        ...state,
        services: action.services || [],
        serviceTypeOptions: action.serviceTypeOptions || [],
        vehicleOptions: action.vehicleOptions || [],
        loading: false,
        editing: false,
        error: {},
      };
  }
  return state;
};

export default serviceReducer;
