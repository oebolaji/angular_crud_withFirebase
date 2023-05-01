import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ang-fire';
  userData: Observable<any> | undefined;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  addData(f: any) {
    // console.log(f.value);
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value)
      .then(() => {
        console.log('Data Saved Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    //oonly subscribing here to log the data
    collectionData(collectionInstance, { idField: 'id' }).subscribe((val) => {
      console.log(val);
    });

    //added the object {idField: 'id'} to the collection data to get an id field from the collection.
    // the 'id' is a name given to the idField
    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

  updateData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);

    //hardcoded to replace a real life form situation
    const updateData = {
      name: 'updatedName',
    };
    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Data Updated');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance)
    .then(() => {
      console.log('Data Deleted successfully');
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
