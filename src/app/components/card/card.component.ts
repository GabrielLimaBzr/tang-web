import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PostResume } from 'src/app/models/post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [DatePipe, MessageService]
})
export class CardComponent implements OnChanges {
  isLoading: boolean;

  constructor(private datePipe: DatePipe, private postService: PostService, private messageService: MessageService, private eventService: EventService) { }

  createdFormatted: string;

  @Input() post: PostResume;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && changes['post'].currentValue) {
      this.createdFormatted = this.formatarData(changes['post'].currentValue.created);
    }
  }

  private formatarData(data: string): string {
    return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm:ss');
  }


  deletePost(id: number) {
    this.isLoading = true;
  
    this.postService.deletePost(id).subscribe(
      (result) => {
        this.messageService.add({ severity: 'success', summary: 'Adeus Post', detail: 'Post deletado com sucesso!' });
      },
      (error) => {
        let errorMsg = `Status: ${error.status} Message: ${error.error.message}`;
        this.messageService.add({ severity: 'error', summary: 'Erro ao excluir post', detail: errorMsg, life: 5000 });
      },
      () => {
        setTimeout(() => {
          this.eventService.notifyPostDeleted();
          this.isLoading = false;
        }, 1000);
      }
    );
  }
  

}
