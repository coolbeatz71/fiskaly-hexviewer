const convertToHEX = (value: string | number, length: number) => {
  return typeof value === "string"
    ? Number(value.charCodeAt(0)).toString(16).padStart(length, "0")
    : value.toString(16).padStart(length, "0");
};

export default convertToHEX;
