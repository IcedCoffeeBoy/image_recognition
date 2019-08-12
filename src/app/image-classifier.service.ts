import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { ReplaySubject } from 'rxjs';

import { IMAGENET_CLASSES } from './imagenet-classes';


@Injectable({
  providedIn: 'root'
})
export class ImageClassifierService {
  ready = new ReplaySubject();
  model;

  constructor() {
  }

  async initClassifier() {
    const modelUrl = '/image_recognition/assets/model.json';
    // const handler = tfn.io.fileSystem('../assets/model.json');
    this.model = await tf.loadGraphModel(modelUrl);
    this.ready.next(true);
  }

  // preprocess the image to be mobilenet friendly
  private preprocessImage(image) {
    // resize the input image to mobilenet's target size of (224, 224)
    let tensor;
    try {
      tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat();
    } catch (err) {
      console.log(err);
    }
    // if model is mobilenet, feature scale tensor image to range [-1, 1]
    const offset = tf.scalar(127.5);
    return tensor.sub(offset)
      .div(offset)
      .expandDims();
  }

  async classify(image) {
    const tensor = this.preprocessImage(image);
    const predictions = await this.model.predict(tensor).data();
    // get the model's prediction results
    let results = Array.from(predictions)
      .map((p, i) => {
        return {
          probability: p,
          className: IMAGENET_CLASSES[i]
        };
      }).sort((a: any, b: any) => {
        return b.probability - a.probability;
      }).slice(0, 5);
    return results;
  }
}
