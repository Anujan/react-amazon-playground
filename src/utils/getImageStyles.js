export default function getImageStyles(image, desiredImageHeight=250) {
  return {
    width: desiredImageHeight * image.aspect,
    height: desiredImageHeight
  }
};
