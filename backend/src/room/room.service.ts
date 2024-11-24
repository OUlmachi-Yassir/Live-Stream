import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './entities/room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(roomData): Promise<Room> {
    const room = new this.roomModel(roomData);
    return room.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findById(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }

  async update(id: string, roomData): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(id, roomData, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.roomModel.findByIdAndDelete(id).exec();
  }

  async addParticipant(id: string, participant: string): Promise<Room> {
    return this.roomModel
      .findByIdAndUpdate(
        id,
        { $addToSet: { participants: participant } }, 
        { new: true },
      )
      .exec();
  }

  async addPlaylist(id: string, playlistId: string): Promise<Room> {
    return this.roomModel
      .findByIdAndUpdate(
        id,
        { $addToSet: { playlists: playlistId } },
        { new: true },
      )
      .exec();
  }
}
