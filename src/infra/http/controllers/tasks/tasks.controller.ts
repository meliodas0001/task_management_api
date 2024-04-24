import { PrismaService } from '@infra/database/prisma.service';
import { Controller } from '@nestjs/common';

@Controller('containers/folders/tasks')
export class TasksController {
  constructor(private readonly prismaService: PrismaService) {}
}
