import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Option } from '../../models/option/option.entity';
import { Controller } from '@nestjs/common';
import { OptionDto } from 'src/stock/models/option/option.dto';
import { OptionService } from 'src/stock/services/option/option.service';

@Crud({
  model: {
    type: Option,
  },
  dto: {
    create: OptionDto,
    update: OptionDto,
    replace: OptionDto,
  },
  query: {
    join: {
      optionValues: {
        eager: true,
        exclude: ['option'],
      },
    },
  },
})
@ApiTags('options')
@Controller('options')
export class OptionsController {
  constructor(private service: OptionService) {}
}
