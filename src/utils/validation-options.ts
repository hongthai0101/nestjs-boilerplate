import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ENUM_STATUS_CODE_ERROR } from './error/error.constant';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: false,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        statusCode: ENUM_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
        errors,
        message: 'http.clientError.unprocessableEntity',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),
};

export default validationOptions;
