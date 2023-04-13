/*
Function which takes image url and inserts the crop parameters after "media/"
*/
const getCroppedImageUrl = (url: string) => {
  if (!url) return "";

  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
