import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  // We'll assume your Node.js proxy is accessible under the /api route.
  private proxyUrl = '/api/proxy';

  constructor(private http: HttpClient) {}

  // Call the proxy to fetch Twitter data.
  getTwitterData(query: string): Observable<any> {
    // Build the full Twitter API URL, then encode it.
    const twitterApiUrl = encodeURIComponent(
      `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=20&tweet.fields=created_at,text,public_metrics`
    );
    return this.http.get(`${this.proxyUrl}?url=${twitterApiUrl}`);
  }
}
