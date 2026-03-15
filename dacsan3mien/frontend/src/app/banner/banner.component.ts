import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('video1', { static: true }) video1!: ElementRef<HTMLVideoElement>;
  @ViewChild('video2', { static: true }) video2!: ElementRef<HTMLVideoElement>;

  currentVideoIndex: number = 0;
  videos: HTMLVideoElement[] = [];
  progress: number[] = [0, 0];
  intervalId: any;

  ngAfterViewInit(): void {
    this.videos = [this.video1.nativeElement, this.video2.nativeElement];
    this.videos.forEach(video => {
      video.muted = true;
      video.playsInline = true; // For mobile devices
    });
    
    // Warm up the non-active video shortly after first paint
    setTimeout(() => {
      const next = this.videos[1];
      if (next && next.preload !== 'auto') {
        next.preload = 'metadata';
        next.load();
      }
    }, 300);

    // Start playing first video after a short delay
    setTimeout(() => {
      this.playVideo(0);
    }, 100);
  }

  playVideo(index: number): void {
    this.videos.forEach((video, i) => {
      video.pause();
      video.classList.remove('active');
      video.currentTime = 0;
      this.progress[i] = 0;
    });

    const video = this.videos[index];
    video.classList.add('active');
    
    // Play with error handling
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Video playing successfully');
        })
        .catch(error => {
          console.error('Error playing video:', error);
        });
    }
    
    this.currentVideoIndex = index;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.updateProgress(index);
    }, 100);

    // Preload the next video near the end of current playback
    video.ontimeupdate = () => {
      if (video.duration && video.currentTime > video.duration - 1.5) {
        const nextIndex = (index + 1) % this.videos.length;
        const next = this.videos[nextIndex];
        if (next && next.preload !== 'auto') {
          next.preload = 'auto';
          next.load();
        }
      }
    };

    video.onended = () => this.handleNextVideo();
  }

  updateProgress(index: number): void {
    const video = this.videos[index];
    const currentTime = video.currentTime;
    const duration = video.duration;

    if (duration > 0) {
      this.progress[index] = (currentTime / duration) * 100;
    }
  }

  handleNextVideo(): void {
    const nextIndex = (this.currentVideoIndex + 1) % this.videos.length;
    this.playVideo(nextIndex);
  }

  handleClick(index: number): void {
    this.playVideo(index);
  }
}
