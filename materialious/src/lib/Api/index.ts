import { get } from 'svelte/store';
import { invidiousInstance, returnYTDislikesInstance } from '../../store';
import type { Channel, Comments, ReturnYTDislikes, SearchSuggestion, Video, VideoPlay } from './model';

export function buildPath(path: string): string {
  return `${get(invidiousInstance)}/api/v1/${path}`;
}

export async function getTrending(): Promise<Video[]> {
  const resp = await fetch(buildPath('trending'));
  return await resp.json();
}

export async function getVideo(videoId: string): Promise<VideoPlay> {
  const resp = await fetch(buildPath(`videos/${videoId}`));
  return await resp.json();
}

export async function getDislikes(videoId: string): Promise<ReturnYTDislikes> {
  const resp = await fetch(`${get(returnYTDislikesInstance)}/Votes?videoId=${videoId}`);
  return await resp.json();
}

export async function getComments(videoId: string, parameters: { sortBy: "top" | "new", source: "youtube" | "reddit", continuation?: string; }): Promise<Comments> {
  const path = new URL(buildPath(`comments/${videoId}`));
  path.search = new URLSearchParams(parameters).toString();
  const resp = await fetch(path);
  return await resp.json();
}

export async function getChannel(channelId: string): Promise<Channel> {
  const resp = await fetch(buildPath(`channels/${channelId}`));
  return await resp.json();
}

export async function getSearchSuggestions(search: string): Promise<SearchSuggestion> {
  const path = new URL(buildPath("search/suggestions"));
  path.search = new URLSearchParams({ q: search }).toString();
  const resp = await fetch(path);
  return await resp.json();
}