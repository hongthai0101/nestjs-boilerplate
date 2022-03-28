import { PartialType } from '@nestjs/swagger';
import { CreateCapitaFlowDto } from './create-capital-flow.dto';

export class UpdateCapitalFlowDto extends PartialType(CreateCapitaFlowDto) {}
