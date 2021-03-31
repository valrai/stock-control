import { Category } from '../../models/category/category.entity';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/stock/services/category/category.service';
import { CategoryDto } from 'src/stock/models/category/category.dto';

@Crud({
  model: {
    type: Category,
  },
  dto: {
    create: CategoryDto,
    update: CategoryDto,
    replace: CategoryDto,
  },
})
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoryService) {}
}
