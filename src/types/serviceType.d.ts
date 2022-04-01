interface IService {
  id?: number;
  serviceTypes: ComboType[] | null;
  vehicle: ComboType | null;
  creationDate: Date;
  updateDate?: Date | null;
}

type ServiceState = {
  services: IService[];
  serviceTypeOptions: ServiceType[];
  vehicleOptions: IVehicle[];
  editing?: boolean;
  loading?: boolean;
  error?: ErrorCustomType;
};

type ServiceType = {
  id: number;
  name: string;
};

interface ServiceAction {
  type: string;
  service?: IService;
  error?: ErrorCustomType;
  services?: IService[];
  vehicleOptions?: IVehicle[];
  serviceTypeOptions?: ServiceType[];
}

type ServiceDispatchType = (args: ServiceAction) => ServiceAction;
