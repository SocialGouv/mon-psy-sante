export const getDepartment = (text: string): string => {
  if (!text || text.length < 2) {
    return null;
  }

  if (text.startsWith("971")) {
    return "971";
  }
  if (text.startsWith("972")) {
    return "972";
  }
  if (text.startsWith("973")) {
    return "973";
  }
  if (text.startsWith("974")) {
    return "974";
  }
  if (text.startsWith("976")) {
    return "976";
  }

  const number = +text.slice(0, 2);
  if (number > 0 && number < 96) {
    return text.slice(0, 2);
  }

  return null;
};
