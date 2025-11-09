import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Podcast {
  id_podcast: number;
  titulo: string;
  url: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  private apiUrl = `http://localhost:3000/podcast`; 

  constructor(private http: HttpClient) {}

  getAllPodcast(): Observable<Podcast[]> {
    return this.http.get<Podcast[]>(this.apiUrl);
  }

  createPodcast(podcastData: Partial<Podcast>): Observable<Podcast> {
    return this.http.post<Podcast>(this.apiUrl, podcastData);
  }

  updatePodcast(id_podcast: number, podcastData: Partial<Podcast>): Observable<Podcast> {
    return this.http.put<Podcast>(`${this.apiUrl}/${id_podcast}`, podcastData);
  }

  deletePodcast(id_podcast: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_podcast}`);
  }
}
