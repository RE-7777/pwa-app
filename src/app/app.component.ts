import { Component } from '@angular/core';

import {　Comment　} from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '遠藤　瞭');
const ANOTHER_USER: User = new User(2,'テストユーザ');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れ様です'),
  new Comment(ANOTHER_USER, 'テストメッセージ'),
  new Comment(CURRENT_USER, 'お疲れ様です'),
  new Comment(CURRENT_USER, '了解しました'),
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  comments = COMMENTS;
  currentUser = CURRENT_USER;
  comment = "";

  addComment(comment: string) :void{
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }
}
