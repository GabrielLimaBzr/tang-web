import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostResume } from 'src/app/models/post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent  implements OnInit, OnDestroy {

  postsResume: PostResume[];
  private postDeletedSubscription: Subscription;


  constructor(
    private postService: PostService, private eventService: EventService
  ) {}
  
  ngOnInit(): void {
    this.postDeletedSubscription = this.eventService.postDeleted$.subscribe(() => {
      this.findAllPostResume();
    });
    this.findAllPostResume();
  }

  ngOnDestroy(): void {
    this.postDeletedSubscription.unsubscribe();
  }


  findAllPostResume() {
    this.postService.findAllPostResume().subscribe((response) => {
      this.postsResume = response
    });
  }

}
