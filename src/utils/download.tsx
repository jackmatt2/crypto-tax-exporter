import { Asset } from "../assets/types";

export const downloadCSV = (name: string, csvMatrix: string[][]) => {
  const csv = csvMatrix.map((it) => it.join(",")).join("\n");
  const hiddenElement = document.createElement("a");
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
  hiddenElement.target = "_blank";
  hiddenElement.download = `${name}-${new Date().toISOString()}.csv`;
  hiddenElement.click();
};
