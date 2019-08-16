import { YoloService } from './yolo.service';
import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';

import { ImageClassifierService } from './image-classifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('imgOutput', { static: false }) imgRef: ElementRef;
  @ViewChild('layout', { static: false }) canvasRef;
  loading = true;
  title = 'image-recognition';
  imageInput;
  predictions;
  boxes;
  predicting = false;

  constructor(
    private classifierService: ImageClassifierService,
    private yolo: YoloService
  ) { }

  ngOnInit() {
    // this.classifierService.initClassifier();
    // this.classifierService.ready.subscribe((res) => {
    //   this.loading = false;
    // });
    this.yolo.init();
    this.yolo.ready.subscribe((res) => {
      this.loading = false;
    })
  }

  processFile(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageInput = reader.result;
    };
  }

  onPredict() {
    // this.image = await this.camera.capturePhoto();
    this.predicting = true;
    setTimeout(async () => {
      // this.classifierService
      //   .classify(this.imgRef.nativeElement)
      //   .then((predictions) => {
      //     this.predictions = predictions;
      //     this.predicting = false;
      //   });
      this.boxes = await this.yolo.predict(this.imgRef);
      console.log(this.boxes);
      this.predicting = false;
    }, 500);
  }

}


