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

export const getLineChartData = async (themes: ColorThemes, myDate: JSON) => {
  const size = getSize();

  let {
    data: { data }
  } = await customGet("sensor-values/search-values", {
    date: myDate
  });

  if(!data.values) data.values = []

  const xValues = data.values.map((value: any, idx: number) => {
    return idx;
  });

  generatedData = {
    labels: xValues,
    datasets: [
      {
        label: "Sensor 1",
        backgroundColor: colorToRgba(themes.primary, 0.6),
        borderColor: "transparent",
        data: data.values.map((value: any) => {
          return value.toFixed(2);
        })
      }
    ]
  };

  return {generatedData,data};
};
