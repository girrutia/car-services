type RootState = {
  router: RouterState<LocationState>;
  article: ArticleState;
  owner: OwnerState;
  vehicle: VehicleState;
};

type ErrorCustomType = {
  message?: string;
  type?: string;
  description?: string;
};

type ComboType = {
  value: string | number;
  label: string;
};
