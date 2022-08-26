export const formatAdeliId = (adeliId: string): string => {
  // Adeli ID is a 9-digit string, that can also contain letters for some departments.
  // e.g. "9A123467" (Guadeloupe) or "2A123467" (Corse-du-Sud).
  // In this particular function, we just want to remove non-alphanumeric (0 to 9 and A to F) characters
  // since it is sent to adeli service for complete checking.
  return (adeliId || "").replace(/[^0-9a-f]/gi, "").toUpperCase();
};
