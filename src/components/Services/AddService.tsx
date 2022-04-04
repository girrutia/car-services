import * as React from "react";
import CustomSelect from "../../shared/components/Select";
import { toast } from "react-toastify";

type Props = {
  formData: IService | undefined;
  saveServiceHandler: (
    service: IService | any
  ) => (dispatch: ServiceDispatchType) => void;
  cancelEditHandler: () => ServiceAction;
  serviceTypeOptions: ComboTypeServiceType[];
  vehicleOptions: ComboTypeVehicle[];
};

const AddService: React.FC<Props> = (props) => {
  const {
    formData,
    saveServiceHandler,
    cancelEditHandler,
    serviceTypeOptions,
    vehicleOptions,
  } = props;
  const initialState: IService = {
    serviceTypes: null,
    vehicle: null,
    totalCost: 0,
    creationDate: new Date(),
  };
  const [service, setService] = React.useState<IService>(initialState);

  React.useEffect(() => {
    if (formData) {
      setService(Object.assign(initialState, formData));
    }
  }, [formData]);

  const getTotalCost = () => {
    return (
      Object.values(service.serviceTypes || []).reduce(
        (total, item) =>
          parseFloat(total.toString().replace(",", "")) +
          parseFloat(item.cost.toString().replace(",", "")),
        0
      ) || 0
    );
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const option: ComboTypeVehicle = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
        vehicle: vehicleOptions[e.target.selectedIndex - 1].vehicle,
      };
      setService((prevState) => ({
        ...prevState,
        [e.target.id]: option,
        serviceTypes: null,
      }));
    } else {
      setService((prevState) => ({
        ...prevState,
        [e.target.id]: null,
        serviceTypes: null,
      }));
    }
  };

  const handleOnChangeServiceType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value) {
      if (!service.vehicle) {
        toast.warning(`Select vehicle first!`);
        return;
      }
      const option: ComboType = {
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].label,
      };
      let newMultipleOptionValue: ServiceTypeWithCost[] =
        service.serviceTypes || [];
      if (
        !newMultipleOptionValue.some(
          (o) => o.serviceType.value === option.value
        )
      ) {
        const auxIdx = serviceTypeOptions.findIndex(
          (s) => s.value.toString() === option.value.toString()
        );
        const cost =
          serviceTypeOptions[auxIdx].costs?.find(
            (c) =>
              c.vehicleTypeId === service?.vehicle?.vehicle.vehicleType?.value
          )?.cost || 0;

        newMultipleOptionValue.push({
          id: Math.random(),
          serviceType: option,
          cost,
        });
      }
      setService((prevState) => ({
        ...prevState,
        serviceTypes: newMultipleOptionValue,
      }));
    }
  };

  const handleData = (e: React.FormEvent<HTMLInputElement>) => {
    const idx = service.serviceTypes?.findIndex(
      (s) => s.id.toString() === e.currentTarget.id.toString()
    );
    const { value } = e.currentTarget;
    const regex = /^\.?(?!-)\d+(?:\.\d{1,2})?$/;
    if (regex.test(value.toString()) || !value) {
      const newValue = parseFloat(
        parseFloat(value.toString().replace(",", "")).toFixed(2)
      );
      if (isNaN(newValue) || newValue <= 0) {
        setService({
          ...service,
          serviceTypes: (service.serviceTypes || []).map((s, index) =>
            index === idx ? { ...s, cost: 0 } : { ...s }
          ),
        });
      } else {
        setService({
          ...service,
          serviceTypes: (service.serviceTypes || []).map((s, index) =>
            index === idx ? { ...s, cost: newValue } : { ...s }
          ),
        });
      }
    }
  };

  const handleDeleteServiceType = (e: React.MouseEvent) => {
    if (e.currentTarget.id) {
      const valueDelete = e.currentTarget.id;
      const newValues =
        service.serviceTypes?.filter(
          (t) => t.serviceType.value.toString() !== valueDelete
        ) || null;
      setService((prevState) => ({
        ...prevState,
        serviceTypes: newValues,
      }));
    }
  };

  const isFormValid = () =>
    (service.serviceTypes?.length || 0) > 0 &&
    !!service.vehicle?.value &&
    !service.serviceTypes?.some((s) => s.cost <= 0);

  const addNewService = (e: React.FormEvent) => {
    e.preventDefault();
    saveServiceHandler({ ...service, totalCost: getTotalCost() });
    setService(initialState);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    e?.preventDefault();
    setService(initialState);
    cancelEditHandler();
  };

  return (
    <form onSubmit={addNewService} autoComplete="off" className="Add-generic">
      <table>
        <tbody>
          <tr>
            <td colSpan={2} className="tdAlignLeft">
              <CustomSelect
                id="vehicle"
                options={vehicleOptions}
                placeholder="Select Vehicle..."
                addEmpty
                onChangeHandler={handleOnChange}
                selectedValue={service?.vehicle?.value}
              />
            </td>
            <td>
              <div className="Generic">
                <p className="pBold">{`TOTAL: ${getTotalCost().toFixed(2)}`}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <CustomSelect
                id="serviceType"
                key={Date.now()}
                options={serviceTypeOptions}
                placeholder="Select Service..."
                addEmpty
                onChangeHandler={handleOnChangeServiceType}
              />
            </td>
            <td className="tdw50">
              {service.serviceTypes?.map((s, index) => (
                <div className="Generic" key={index}>
                  <div style={{ width: "50%" }}>
                    <p>{`${s.serviceType.label}`}</p>
                  </div>
                  <div>
                    <input
                      id={`${s.id}`}
                      className="input-cost"
                      defaultValue={parseFloat(
                        (s.cost || 0).toString().replace(",", "")
                      ).toFixed(2)}
                      onChange={handleData}
                    />
                  </div>
                  <div
                    onClick={handleDeleteServiceType}
                    style={{ cursor: "pointer" }}
                    id={s.serviceType.value.toString()}
                  >
                    X
                  </div>
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button disabled={!isFormValid()} type="submit">
        {service.id ? "Update" : "Add New"}
      </button>
      <button onClick={handleCancel} type="button" id="cancel-btn">
        Cancel
      </button>
    </form>
  );
};

export default AddService;
