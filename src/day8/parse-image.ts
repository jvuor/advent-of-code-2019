import { Image } from './Image';
import { Pixel } from './interfaces';

export function parseImage(dataString: string, width: number, height: number): Image {
  const data = dataString
    .trim()
    .split('')
    .reverse();

  if (data.length % (width * height) !== 0) {
    throw new Error('Bad dimensions');
  }

  const image = new Image(width, height);

  while (data.length > 0) {
    image.add(+(data.pop() as string));
  }

  return image;
}

const getLayer = (image: Image, layer: number) => image.pixels.filter(pixel => pixel.layer === layer);

const countDigits = (layer: Pixel[], digit: number) => layer.filter(pixel => pixel.value === digit).length;

export function checkImageData(data: string, width: number, height: number) {
  const image = parseImage(data, width, height);
  const layers: Pixel[][] = [];

  for (let layer = 0; layer <= image.layers; layer++) {
    layers.push(getLayer(image, layer));
  }

  const layerWithLeastZeros = layers
    .filter(layer => layer.length > 0) // there's a bug that lets empty layers get here
    .sort((a, b) => countDigits(a, 0) - countDigits(b, 0))[0];

  return countDigits(layerWithLeastZeros, 1) * countDigits(layerWithLeastZeros, 2);
}

export function decodeImage(data: string, width: number, height: number) {
  const image = parseImage(data, width, height);
  const result = image.decodeImage();

  console.log(result);
}
