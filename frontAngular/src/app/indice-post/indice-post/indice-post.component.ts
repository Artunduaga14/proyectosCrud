// src/app/posts/indice-posts.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PostsService } from '../services/posts.service';
// import { Post } from '../models/post.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../models-public/posts.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-indice-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './indice-post.component.html',
  styleUrls: ['./indice-post.component.css']
})
export class IndicePostsComponent implements OnInit {
  posts: Post[] = [];
  columnas: string[] = ['id', 'title', 'body', 'acciones'];

  postsService = inject(PostService);

  ngOnInit(): void {
    this.postsService.getAll().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Posts recibidos:', this.posts);
      },
      error: (err) => {
        console.error('Error al obtener posts:', err);
      }
    });
  }

  editar(post: Post) {
    alert(`Editar post: ${post.title}`);
  }

  eliminar(post: Post) {
    alert(`Eliminar post: ${post.title}`);
  }
}
