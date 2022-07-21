import { customGet, customPost } from "../../services/vuestic-ui/api";

export const getInfoBlockData = async () => {

  let { data } = await customGet("sensor-values/get-avgs", {});

  return data;
};
