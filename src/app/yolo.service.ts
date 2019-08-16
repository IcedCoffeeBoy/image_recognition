import { ReplaySubject } from 'rxjs';
import { Injectable, ElementRef } from '@angular/core';
import { yolov3Tiny } from 'tfjs-yolov3';

@Injectable({
  providedIn: 'root'
})
export class YoloService {
  ready = new ReplaySubject<boolean>();
  model: any;

  constructor() { }

  async init() {
    const localModelUrl = '../assets/yolo-model.json';
    this.model = await yolov3Tiny();
    this.ready.next(true);
  }

  async predict(ref: ElementRef) {
    const boxes = await this.model(ref.nativeElement);
    return boxes;
  }


  drawRectangle(boxes: any[], canvasRef: ElementRef, imageUrl: string): void {
    const canvas = canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    const source = new Image();

    source.onload = () => {
      context.drawImage(source, 0, 0);
      context.beginPath();
      boxes.forEach((box) => {
        context.rect(box.left, box.top, box.width, box.height);
      });
      context.stroke();
    };

    source.src = imageUrl;

  }
}
