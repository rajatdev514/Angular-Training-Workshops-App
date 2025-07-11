import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ISession from './models/ISession';
import { environment } from '../../environments/environment';

export type VoteType = 'upvote' | 'downvote';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSessionsForWorkshop(workshopId: number) {
    return this.http.get<ISession[]>(
      `${this.apiUrl}/workshops/${workshopId}/sessions`
    );
  }

  voteForSession(sessionId: number, voteType: VoteType) {
    return this.http.put<ISession>(
      `${this.apiUrl}/sessions/${sessionId}/${voteType}`,
      null
    );
  }
}
