import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ImageClassifierService } from './image-classifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('imgOutput', { static: false }) imgRef: ElementRef;
  loading = true;
  title = 'image-recognition';
  imageInput;
  predictions;

  constructor(
    private classifierService: ImageClassifierService
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
    }
  }

  async onPredict() {
    // this.image = await this.camera.capturePhoto();
    this.predictions = await this.classifierService.classify(this.imgRef.nativeElement);
    console.log(this.predictions);
  }

}


