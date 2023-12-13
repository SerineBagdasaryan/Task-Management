import { HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const editFileName = (_, file, callback) => {
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif|svg)$/)) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${file.fieldname}-${uniqueSuffix}.${
      file.mimetype.split('/')[1]
    }`;
    callback(null, fileName);
  } else {
    callback(
      new HttpException(
        `Unsupported file type ${file.originalname}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const fileFilter = (_, file, callback) => {
  if (file.size <= MAX_FILE_SIZE) {
    callback(null, true);
  } else {
    callback(
      new HttpException(
        `File size exceeds the allowed limit of ${MAX_FILE_SIZE} bytes`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};
export const UploadFile = (name: string) => {
  return UseInterceptors(
    FileInterceptor(name, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  );
};
