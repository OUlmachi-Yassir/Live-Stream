import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from './entities/playlist.schema';

@Injectable()
export class PlaylistService {
  constructor(@InjectModel(Playlist.name) private playlistModel: Model<Playlist>) {}

  async create(playlistData): Promise<Playlist> {
    const playlist = new this.playlistModel(playlistData);
    return playlist.save();
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistModel.find().exec();
  }

  async findById(id: string): Promise<Playlist> {
    return this.playlistModel.findById(id).exec();
  }

  async updatePlaylistMovies(id: string, movies: Record<string, any>[]): Promise<Playlist> {
    console.log('Updating playlist with movies:', movies); 
    return this.playlistModel.findByIdAndUpdate(
      id,
      { $set: { movies } },
      { new: true } 
    ).exec();
  }
  
  

  async update(id: string, playlistData): Promise<Playlist> {
    return this.playlistModel.findByIdAndUpdate(id, playlistData, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.playlistModel.findByIdAndDelete(id).exec();
  }
}
