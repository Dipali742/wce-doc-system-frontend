import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getStudentData(url: string): Observable<any> {
    return this.http.get(url, httpOptions);
  }

  getStudentRequest(url: string): Observable<any> {
    return this.http.get(url, httpOptions);
  }

  getDocumentTypes(url: string): Observable<any> {
    return this.http.get(url, httpOptions);
  }

  addStudent(url:string,studentData: any) : Observable<object> {
    return this.http.post(url, studentData);
  }

  addDocumentTypes(url:string,docTypeData: any) : Observable<object> {
    return this.http.post(url, docTypeData);
  }

  deleteDocumentType(url:string) : Observable<object> {
    return this.http.delete(url);
  }

  updateDocumentType(url:string, docTypeData: any) : Observable<object> {
    return this.http.patch(url, docTypeData);
  }

}
