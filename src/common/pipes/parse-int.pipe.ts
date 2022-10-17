import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

// building own ParseIntPipe to train creating custom pipes

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. ${val} is not an integer`,
      );
    }
    return val;
  }
}
