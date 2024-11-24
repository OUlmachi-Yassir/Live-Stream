import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types  } from 'mongoose';

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  owner: string;

  @Prop([String])
  participants: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Playlist' }] })
  playlists: Types.ObjectId[];

  @Prop({ type: Date })
  startTime: Date;

  @Prop({ type: Date })
  endTime: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);