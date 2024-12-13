import Ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

export const extractSnapshot = (videoBuffer: Buffer, timeTick: number): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const tempDir = process.env.NEXT_PUBLIC_TEMP_DIR || '../../tmp';
      const tempFilePath = path.join(tempDir, 'temp_video.mp4');
      console.log('tempFilePath', tempFilePath);

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      if (!videoBuffer || videoBuffer.length === 0) {
        throw new Error('Invalid video buffer');
      }

      fs.writeFileSync(tempFilePath, videoBuffer);
      const outputBuffer: Buffer[] = [];

      Ffmpeg(tempFilePath)
        .on('error', (err) => {
          console.error('ffmpeg error:', err);
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
          }
          reject(err);
        })
        .on('end', () => {
          console.log('ffmpeg processing completed');
        })
        .outputFormat('mjpeg')
        .outputOptions(['-vframes', '1'])
        .inputOptions(`-ss ${timeTick}`)
        .pipe()
        .on('data', (chunk) => {
          outputBuffer.push(chunk);
        })
        .on('close', () => {
          const finalBuffer = Buffer.concat(outputBuffer);
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
          }
          resolve(finalBuffer);
        });
    } catch (err) {
      console.error('Error processing file:', err);
      reject(err);
    }
  });
};

export async function cutAndConcatVideos(video1Buffer: Buffer, video2Buffer: Buffer, end_time: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // Указываем пути для видео в папке временных файлов
    const tempFolderPath = './tmp'; // Временная папка для FFmpeg
    const video1Path = path.join(tempFolderPath, 'video1.mp4');
    const video2Path = path.join(tempFolderPath, 'video2.mp4');
    const tempVideoPath = path.join(tempFolderPath, 'tmp_video.mp4'); // Временный файл для обрезанного видео
    const outputPath = path.join(tempFolderPath, 'output.mp4'); // Выходной файл будет в папке tmp

    // Убедитесь, что временная папка существует
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }

    fs.writeFileSync(video1Path, video1Buffer);
    fs.writeFileSync(video2Path, video2Buffer);

    // Начинаем процесс с FFmpeg
    Ffmpeg(video1Path)
      .setStartTime(0) // Начинаем с 0 секунды
      .setDuration(end_time) // Обрезаем до end_time
      .output(tempVideoPath) // Временный выходной файл для первого видео
      .on('end', () => {
        // Теперь склеиваем обрезанное первое видео со вторым
        Ffmpeg()
          .input(tempVideoPath)
          .input(video2Path)
          .on('end', () => {
            // Считываем результат в буфер
            const resultBuffer = fs.readFileSync(outputPath);

            // Удаляем все временные файлы, включая output.mp4
            fs.unlinkSync(video1Path);
            fs.unlinkSync(video2Path);
            fs.unlinkSync(tempVideoPath);
            fs.unlinkSync(outputPath); // Удаляем выходной файл output.mp4

            resolve(resultBuffer); // Возвращаем итоговый буфер
          })
          .on('error', (err) => {
            fs.unlinkSync(video1Path);
            fs.unlinkSync(video2Path);
            fs.unlinkSync(tempVideoPath);
            reject(err); // Ошибка в процессе склеивания
          })
          .mergeToFile(outputPath, tempFolderPath); // Мержим файлы в новый файл внутри папки tmp
      })
      .on('error', (err) => {
        fs.unlinkSync(video1Path);
        fs.unlinkSync(video2Path);
        fs.unlinkSync(tempVideoPath);
        reject(err); // Ошибка в процессе обрезки
      })
      .run();
  });
}
