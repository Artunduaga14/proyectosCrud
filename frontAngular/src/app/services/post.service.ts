// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './servicio-generico.service';
import { Post } from '../models-public/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Post> {
  constructor(http: HttpClient) {
    super(http, 'https://jsonplaceholder.typicode.com/posts');
  }
}
