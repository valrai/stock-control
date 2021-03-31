import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { OptionValue } from 'src/stock/models/option-value/option.value.entity';
import { OptionValueDto } from 'src/stock/models/option-value/option.value.dto';
import { OptionValueService } from 'src/stock/services/option-value/option.value.service';

@Crud({
  model: {
    type: OptionValue,
  },
  dto: {
    create: OptionValueDto,
    update: OptionValueDto,
    replace: OptionValueDto,
  },
  query: {
    join: {
      option: {
        eager: true,
        exclude: ['optionValues'],
      },
    },
  },
})
@ApiTags('option-values')
@Controller('option-values')
export class OptionValuesController {
  constructor(private service: OptionValueService) {}
}
