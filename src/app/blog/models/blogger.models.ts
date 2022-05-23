export interface Post {
  "kind": 'blogger#post',
  "id": string,
  "blog": {
    "id": string
  },
  "published": Date,
  "updated": Date,
  "url": string,
  "selfLink": string,
  "title": string,
  "titleLink": string,
  "content": string,
  "images": [
    {
      "url": string
    }
  ],
  "customMetaData": string,
  "author": {
    "id": string,
    "displayName": string,
    "url": string,
    "image": {
      "url": string
    }
  },
  "replies": {
    "totalItems": number,
    "selfLink": string,
    "items": any[]
  },
  "labels": [
    string
  ],
  "location": {
    "name": string,
    "lat": number,
    "lng": number,
    "span": string
  },
  "status": string
}


export interface PostsData {
  etag: string;
  kind: string;
  items: Post[];
}
