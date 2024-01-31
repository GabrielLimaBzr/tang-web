import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { FileHandle } from 'src/app/models/file';
import { PostCreate } from 'src/app/models/post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  providers: [MessageService]
})
export class CreatePostComponent {

  constructor(private messageService: MessageService, private sanitizer: DomSanitizer, private postService: PostService, private eventService: EventService) { }

  postCreate: PostCreate = {
    title: "",
    content: "",
    postFiles: []
  }


  @Input() visible = false;
  @Output() okClicked = new EventEmitter<void>();

  isLoading: boolean = false;

  onOkClick(): void {
    this.okClicked.emit();
    this.visible = false;
  }

  createPost() {
    this.isLoading = true
    const post = this.prepareFormData(this.postCreate)
    console.log(this.formDataToObject(post));
    
    this.postService.createPost(post).subscribe((result) => {

      this.messageService.add({ severity: 'success', summary: 'AEEEEE NOVO Post', detail: 'Post criado com sucesso!' });
    },
      (error) => {
        let errorMsg = `Status: ${error.status} Message: ${error.error.message}`;
        this.messageService.add({ severity: 'error', summary: 'Erro ao criar post', detail: errorMsg, life: 5000 });
        this.isLoading = false;
      },
      () => {
        setTimeout(() => {
          this.eventService.notifyPostDeleted();
          this.isLoading = false;
        }, 1000);
      }
    )
  }

  formDataToObject(formData: FormData) {
    const object: any = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  }

  prepareFormData(post: PostCreate): FormData {
    const formData = new FormData();

    formData.append(
      'post',
      new Blob([JSON.stringify(post)], { type: 'application/json' })
    );

    for (var i = 0; i < post.postFiles.length; i++) {
      formData.append(
        'file',
        post.postFiles[i].file,
        post.postFiles[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event) {
   
    
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.postCreate.postFiles.push(fileHandle);
    }

  }
}
