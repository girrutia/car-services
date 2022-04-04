interface IService {
  id?: number;
  serviceTypes: ServiceTypeWithCost[] | null;
  vehicle: ComboTypeVehicle | null;
  totalCost: number;
  creationDate: Date;
  updateDate?: Date | null;
}

type ServiceState = {
  services: IService[];
  serviceTypeOptions: ServiceType[];
  vehicleOptions: IVehicle[];
  restrictionOptions?: IRestriction[];
  editing?: boolean;
  loading?: boolean;
  error?: ErrorCustomType;
};

interface ServiceTypeWithCost {
  id: number;
  serviceType: ComboType;
  cost: number;
}

interface ICost {
  vehicleTypeId: number;
  cost: number;
}

type ServiceType = {
  id: number;
  name: string;
  costs?: ICost[];
};

type ComboTypeServiceType = {
  value: string | number;
  label: string;
  costs?: ICost[];
};

type ComboTypeVehicle = {
  value: string | number;
  label: string;
  vehicle: IVehicle;
};

interface IRestriction {
  color_id?: number;
  model_id?: number;
  brand_id?: number;
  vehicleType_id?: number;
  owner_id?: number;
}

interface ServiceAction {
  type: string;
  service?: IService;
  error?: ErrorCustomType;
  services?: IService[];
  vehicleOptions?: IVehicle[];
  serviceTypeOptions?: ServiceType[];
  restrictionOptions?: IRestriction[];
}

type ServiceDispatchType = (args: ServiceAction) => ServiceAction;
