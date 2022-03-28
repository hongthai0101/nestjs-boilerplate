import { PartialType } from '@nestjs/swagger';
import { CreateCapitaFlowTypeDto } from './create-capital-flow-type.dto';

export class UpdateCapitalFlowTypeDto extends PartialType(
  CreateCapitaFlowTypeDto,
) {}
