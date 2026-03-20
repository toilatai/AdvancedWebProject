import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  @ViewChild('allBlogPosts') allBlogPosts!: ElementRef;



  scrollToAllBlogPosts(){
    const offset = 370; // Khoảng cách bạn muốn cuộn xuống dưới, điều chỉnh tùy ý
  
    window.scrollBy({
      top: offset,
      behavior: 'smooth'
    });
  }

  scrollToCeramic(){
    const offset = 1000; // Khoảng cách bạn muốn cuộn xuống dưới, điều chỉnh tùy ý
  
    window.scrollBy({
      top: offset,
      behavior: 'smooth'
    });
  }

  scrollToPlant(){
    const offset = 1800; // Khoảng cách bạn muốn cuộn xuống dưới, điều chỉnh tùy ý
  
    window.scrollBy({
      top: offset,
      behavior: 'smooth'
    });
  }

  scrollToFlower(){
    const offset = 2400; // Khoảng cách bạn muốn cuộn xuống dưới, điều chỉnh tùy ý
  
    window.scrollBy({
      top: offset,
      behavior: 'smooth'
    });
  }
  
}

