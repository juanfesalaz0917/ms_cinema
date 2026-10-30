import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Theater } from '../entities/theater.entity';

type TheaterReportRow = Pick<Theater, 'id' | 'location' | 'capacity'>;

@Injectable()
export class TheatersRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findLargeTheatersReport(minCapacity: number): Promise<Theater[]> {
    const rows = await this.dataSource.query<TheaterReportRow[]>(
      `SELECT id, location, capacity
       FROM theaters
       WHERE capacity >= ?
       ORDER BY capacity DESC`,
      [minCapacity],
    );
    return rows.map((row) => Object.assign(new Theater(), row));
  }
}
