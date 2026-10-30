import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { RecliningSeatsReportDto } from './dto/reclining-seats-report.dto';
import { SeatResponseDto } from './dto/seat-response.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  create(@Body() dto: CreateSeatDto): Promise<SeatResponseDto> {
    return this.seatsService.create(dto);
  }

  @Get('reports/theater/:theaterId/reclining-count')
  getRecliningCount(
    @Param('theaterId', ParseIntPipe) theaterId: number,
  ): Promise<RecliningSeatsReportDto> {
    return this.seatsService.getRecliningCount(theaterId);
  }

  @Get()
  findAll(): Promise<SeatResponseDto[]> {
    return this.seatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SeatResponseDto> {
    return this.seatsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSeatDto,
  ): Promise<SeatResponseDto> {
    return this.seatsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.seatsService.remove(id);
  }
}
