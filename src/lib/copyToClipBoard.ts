const copyToClipboard = async (value: string): Promise<void | boolean> => {
  return "clipboard" in navigator
    ? await navigator.clipboard.writeText(value)
    : document.execCommand("copy", true, value);
};

export default copyToClipboard;
