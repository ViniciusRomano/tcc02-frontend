import { useColors } from "vuestic-ui";
import { customGet, customPost } from "../../services/vuestic-ui/api";
import moment from "moment";

function colorToRgba(color: string, a: number) {
  const { shiftHSLAColor } = useColors();

  // TODO: replace with set hsla color
  // https://github.com/epicmaxco/vuestic-ui/issues/841
  const transparentColor = shiftHSLAColor(color, { a: -1 });
  return shiftHSLAColor(transparentColor, { a });
}

const generateValue = () => {
  return Math.floor(Math.random() * 100);
};

const generateYLabels = () => {
  const flip = !!Math.floor(Math.random() * 2);
  return flip ? ["Debit", "Credit"] : ["Credit", "Debit"];
};

const getSize = () => {
  const minSize = 12;
  return Math.max(minSize, new Date().getMonth());
};

let generatedData: GeneratedData;
let firstMonthIndex = 0;

export const getLineChartData = async (themes: ColorThemes, myDate: JSON, device:any) => {
  const size = getSize();
  console.log(device)
  debugger;

  let {
    data: { data }
  } = await customGet("sensor-values/search-values", {
    date: myDate,
    dev_id:device
  });

  let values = data.values?.values || []

  const xValues = values.map((value: any, idx: number) => {
    return moment(value.createdat).format('DD/MM HH:mm');
  });

  generatedData = {
    labels: xValues,
    datasets: [
      {
        label: "Sensor",
        backgroundColor: colorToRgba(themes.primary, 0.6),
        borderColor: "transparent",
        data: values.map((value: any) => {
          return value.sv_value.toFixed(2);
        })
      }
    ]
  };

  return { generatedData, data };
};
