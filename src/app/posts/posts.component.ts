import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { POSTS } from '../mock-posts';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // posts: Post[];
  posts = POSTS;

  constructor(private postService: PostService) { }
  ngOnInit() {
    this.getPosts();
  }
  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.postService.addPost({ title } as Post)
      .subscribe(post => {
        this.posts.push(post);
      });
  }

  delete(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.postService.deletePost(post).subscribe();
  }
}
