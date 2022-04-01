interface IVehicle {
  id?: number;
  brand: ComboType | null;
  model: ComboType | null;
  year: number;
  patent: string;
  color: ComboType | null;
  vehicleType: ComboType | null;
  owner: ComboType | null;
}

interface IBrand {
  id: number;
  name: string;
  slug: string;
}

interface IModel {
  brand_id: number;
  id: number;
  name: string;
  slug: string;
}

interface IColor {
  id: number;
  label: string;
  value: string;
  color: string;
}

interface IVehicleType {
  id: number;
  name: string;
}

type VehicleState = {
  vehicles: IVehicle[];
  brandOptions: IBrand[];
  modelOptions: IModel[];
  vehicleTypeOptions: IVehicleType[];
  colorOptions: IColor[];
  ownerOptions: IOwner[];
  editing?: boolean;
  loading?: boolean;
  error?: ErrorCustomType;
};

interface VehicleAction {
  type: string;
  vehicle?: IVehicle;
  error?: ErrorCustomType;
  vehicles?: IVehicle[];
  brandOptions?: IBrand[];
  modelOptions?: IModel[];
  vehicleTypeOptions?: IVehicleType[];
  colorOptions?: IColor[];
  ownerOptions?: IOwners[];
}

type SelectedOptions = {
  brand?: ComboType;
  model?: ComboType;
  year?: ComboType;
  color?: ComboType;
  vehicleType?: ComboType;
  owner?: ComboType;
};

type VehicleDispatchType = (args: VehicleAction) => VehicleAction;
