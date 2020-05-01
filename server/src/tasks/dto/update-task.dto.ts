import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
  status?: TaskStatus;
}
