import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {　Comment　} from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '遠藤　瞭');
const ANOTHER_USER: User = new User(2,'テストユーザ');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser = CURRENT_USER;
  comment = "";
  

  constructor( private db: AngularFireDatabase) {
    this.commentsRef = db.list('/comments');

    //firevbaseのRealtimeDatabaseに格納されている「comment」のメタ情報取得,コメントの編集を行うため
    this.comments$ = this.commentsRef.snapshotChanges()
      .pipe (
        map((snapshots: SnapshotAction<Comment>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return new Comment({key: snapshot.payload.key, ...value });
          })
        })
      )
  }

  addComment(comment: string) :void {
    if (comment) {
      this.commentsRef.push(new Comment({user: this.currentUser, message: comment}));
      this.comment = '';
    }
  }

  updateComment(comment: Comment) :void {
    const { key, message } = comment;
    this.commentsRef.update(key!, { message });
  }

  deleteComment(comment: Comment) :void {
    this.commentsRef.remove(comment.key);
  }
}
