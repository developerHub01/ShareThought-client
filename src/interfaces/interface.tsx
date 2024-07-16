export interface IChannelId {
  _id: string;
  channelName: string;
  channelAvatar: string;
}

export interface IPost {
  _id?: string;
  channelId: IChannelId;
  title: string;
  content: string;
  banner: string;
  views: number;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
