import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {　Comment　} from '../class/comment';
import { User } from '../class/user';

const CURRENT_USER: User = new User(1, '遠藤　瞭');
const ANOTHER_USER: User = new User(2,'テストユーザ');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser = CURRENT_USER;
  comment = "";
  

  constructor( private db: AngularFireDatabase) {
    //firebaseのrealtimeDatabaseに格納されている「comments」を配列として受け取る
    this.commentsRef = db.list('/comments');

    //firebaseのRealtimeDatabaseに格納されている「comment」のキーまで含むメタ情報取得(snapshotchanges)、Observableに変換
    this.comments$ = this.commentsRef.snapshotChanges()
    //snapshotchangesはobservableのためpipeメソッド使える
      .pipe (
        //mapオペレーターで整形
        map((snapshots: SnapshotAction<Comment>[]) => {
          return snapshots.map(snapshot => {
            //実データのみ取得(payload.val)
            const value = snapshot.payload.val();
            //オブジェクトを返す
            return new Comment({key: snapshot.payload.key, ...value });
          })
        })
      )
  }

  ngOnInit(): void {
  }

  addComment(comment: string) :void {
    if (comment) {
      this.commentsRef.push(new Comment({user: this.currentUser, message: comment}));
      //保存された場合に空文字をセット
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
