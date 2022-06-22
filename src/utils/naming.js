export const tahun = (start, end) => {
  var currentTime = new Date();

  const year = [];
  let i = 1;

  for (let tahun = start; tahun <= currentTime.getFullYear(); tahun++) {
    let tahunTemp = { id: i, label: tahun, value: tahun };
    year.push(tahunTemp);
    i += 1;
  }
  return year;
};
