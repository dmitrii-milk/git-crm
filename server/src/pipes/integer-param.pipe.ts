import {
  PipeTransform,
  Injectable,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class IntegerParamPipe implements PipeTransform {
  transform(value: string) {
    const numValue = +value;

    if (Number.isNaN(numValue)) {
      throw new BadRequestException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Invalid parameter',
      });
    }

    return numValue;
  }
}
