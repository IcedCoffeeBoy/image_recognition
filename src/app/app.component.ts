import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';

import { ImageClassifierService } from './image-classifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('imgOutput', { static: false }) imgRef: ElementRef;
  @ViewChild('loading', { static: false }) loadingRef: ElementRef;
  loading = true;
  title = 'image-recognition';
  imageInput;
  predictions;
  predicting = false;

  constructor(
    private classifierService: ImageClassifierService,
    private render: Renderer2,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.classifierService.initClassifier();
    this.classifierService.ready.subscribe((res) => {
      this.loading = false;
    });
  }

  processFile(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageInput = reader.result;
    };
  }

  setPredicting(status: boolean) {
    if (status) {
      this.render.removeClass(this.loadingRef.nativeElement, 'hidden');
    } else {
      this.render.addClass(this.loadingRef.nativeElement, 'hidden');
    }
  }

  onPredict() {
    // this.image = await this.camera.capturePhoto();
    this.predicting = true;
    this.classifierService
      .classify(this.imgRef.nativeElement)
      .then((predictions) => {
        this.predictions = predictions;
        this.predicting = false;
      });
  }

}


