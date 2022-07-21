import { useColors } from "vuestic-ui";
import { customGet, customPost } from "../../services/vuestic-ui/api";

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

const generateArray = (length: number) => {
  return Array.from(Array(length), generateValue);
};

const getSize = () => {
  const minSize = 12;
  return Math.max(minSize, new Date().getMonth());
};

let generatedData: GeneratedData;
let firstMonthIndex = 0;

export const getLineChartData = async (
  themes: ColorThemes,
  firstMonth: number
) => {
  const size = getSize();
  const yLabels = generateYLabels();

  let { data } = await customGet("sensor-values", {
    filter: { limit: 10, order: "id DESC" }
  });

  data = data.reverse();

  const xValues = data.map((value: any) => {
    return value.id;
  });

  generatedData = {
    labels: xValues.splice(firstMonthIndex, size),
    datasets: [
      {
        label: "Sensor 1",
        backgroundColor: colorToRgba(themes.primary, 0.6),
        borderColor: "transparent",
        data: data.map((value: any) => {
          return value.sv_value.toFixed(2);
        })
      }
    ]
  };

  return generatedData;
};

export const simulateCreateData = async () => {
  const sv_value = Math.random() * 5 + 1;
  return customPost("sensor-values", { sv_value });
};
