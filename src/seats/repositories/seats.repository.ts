import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

interface RecliningSeatsCountRow {
  recliningSeats: string | number;
}

@Injectable()
export class SeatsRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async countRecliningByTheater(theaterId: number): Promise<number> {
    const [row] = await this.dataSource.query<RecliningSeatsCountRow[]>(
      `SELECT COUNT(*) AS recliningSeats
       FROM seats
       WHERE theater_id = ? AND reclining = true`,
      [theaterId],
    );
    if (!row) {
      throw new Error('The reclining seats count query returned no result');
    }
    return Number(row.recliningSeats);
  }
}
