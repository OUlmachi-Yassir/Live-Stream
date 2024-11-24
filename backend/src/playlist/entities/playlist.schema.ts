import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Playlist extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ type: [{ title: String, image: String, trailer: String }] })
  @IsOptional()
  movies: { title: string; image: string; trailer: string }[] = [];  
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
