import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() playlistData) {
    return this.playlistService.create(playlistData);
  }

  @Get()
  async findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.playlistService.findById(id);
  }

  @Put(':id')
  async addMoviesToPlaylist(
    @Param('id') id: string,
    @Body('movies') movies: { title: string; image: string; trailer: string }[] 
  ) {
    console.log('Received movies:', movies); 
    return this.playlistService.updatePlaylistMovies(id, movies);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.playlistService.delete(id);
  }
}
