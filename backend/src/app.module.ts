import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/StreamCeni', {

    }),
    UsersModule, 
    AuthModule, RoomModule, PlaylistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
