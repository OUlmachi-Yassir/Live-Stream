import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() roomData) {
    return this.roomService.create(roomData);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.roomService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() roomData) {
    return this.roomService.update(id, roomData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }

  @Put(':id/add-participant')
  addParticipant(@Param('id') id: string, @Body('participant') participant: string) {
    return this.roomService.addParticipant(id, participant);
  }

  @Put(':id/add-playlist')
  addPlaylist(@Param('id') id: string, @Body('playlistId') playlistId: string) {
    return this.roomService.addPlaylist(id, playlistId);
  }
}
