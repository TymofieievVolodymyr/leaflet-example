import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) {
  }

  getStateShapes(): any {
    // return this.http.get('/assets/data/gz_2010_us_040_00_5m.json');
    return this.http.get('/assets/data/gz_2010_us_040_00_5m.json');
  }
}
