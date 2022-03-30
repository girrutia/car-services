interface IVehicle {
  id?: number;
  brand: ComboType | null;
  model: ComboType | null;
  year: number;
  patent: string;
  color: ComboType | null;
  vehicleType: ComboType | null;
}

interface IBrand {
  id: number;
  name: string;
  slug: string;
}

interface IModel {
  id_brand: number;
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
  brands: IBrand[];
  models: IModel[];
  vehicleTypes: IVehicleType[];
  colors: IColor[];
  editing?: boolean;
  loading?: boolean;
  error?: ErrorCustomType;
};

interface VehicleAction {
  type: string;
  vehicle?: IVehicle;
  error?: ErrorCustomType;
  vehicles?: IVehicle[];
  brands?: IBrand[];
  models?: IModel[];
  vehicleTypes?: IVehicleType[];
  colors?: IColor[];
}

type SelectedOptions = {
  brand?: ComboType;
  model?: ComboType;
  year?: ComboType;
  color?: ComboType;
  vehicleType?: ComboType;
};

type VehicleDispatchType = (args: VehicleAction) => VehicleAction;
