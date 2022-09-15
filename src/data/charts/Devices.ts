import { customGet, customPost, customDelete } from "../../services/vuestic-ui/api";

export const getDevices = async () => {

  let { data } = await customGet("devices", {});

  return data;
};

export const createDevice = async (value:any) => {

  let { data } = await customPost("devices", value);

  return data;
};

export const deleteDevice = async (id:any) => {

  let { data } = await customDelete(`devices/${id}`,{});

  return data;
};
