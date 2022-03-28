import { UnprocessableEntityException } from '@nestjs/common';
import { ENUM_STATUS_CODE_ERROR } from '../error';

export const validateRelation = (relations: string[], allows: string[]) => {
  if (relations.some((el) => !allows.includes(el))) {
    throw new UnprocessableEntityException({
      statusCode: ENUM_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
      message: 'request.relationInvalid',
      errors: []
    });
  }
};
