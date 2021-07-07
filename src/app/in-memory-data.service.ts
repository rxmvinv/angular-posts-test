import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Post } from './post';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts = [
      { id: 1, title: 'Just', message: 'some message' },
      { id: 2, title: 'Just', message: 'some message' },
      { id: 3, title: 'Just', message: 'some message' }
    ];
    return {posts};
  }


  // Overrides the genId method to ensure that a post always has an id.
  // If the posts array is empty,
  // the method below returns the initial number (11).
  // if the posts array is not empty, the method below returns the highest
  // post id + 1.
  genId(posts: Post[]): number {
    return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 11;
  }
}
