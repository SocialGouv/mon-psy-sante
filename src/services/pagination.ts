export function getPaginationLabels(page, totalPages) {
  const pages = [];
  for (
    let leftOffset = Math.min(totalPages - page - 4, -2),
      rightOffset = leftOffset + 6,
      index = Math.max(1, page + leftOffset),
      end = Math.min(totalPages, index + rightOffset);
    index <= end;
    index++
  ) {
    pages.push(String(index));
  }
  if (pages[0] !== "1") {
    if (pages[0] === "3") pages.unshift("2");
    else if (pages[0] !== "2") pages.unshift("…");
    pages.unshift("1");
  }
  if (pages[pages.length - 1] !== String(totalPages)) {
    if (pages[pages.length - 1] === String(totalPages - 2))
      pages.push(String(totalPages - 1));
    else if (pages[pages.length - 1] !== String(totalPages - 1))
      pages.push("…");
    pages.push(String(totalPages));
  }
  return pages;
}
