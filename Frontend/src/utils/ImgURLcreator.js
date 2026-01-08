const getImgURL = (path, name) =>
  new URL(`../assets/${path}/${name}`, import.meta.url).href;

export default getImgURL;
