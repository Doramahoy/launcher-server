const fs = require('fs');
const path = require('path');
const ApiError = require('../error/ApiError');
const archiver = require('archiver');

class downloadController {

    async downloadAssembly(req, res, next) {
        const folderPath = path.join(__dirname, '../files/minecraft');

        try {
            // Проверяем существование папки
            if (!fs.existsSync(folderPath)) {
                throw ApiError.notFound('Folder not found');
            }

            const archive = archiver('zip', {
                zlib: { level: 9 } // Максимальный уровень сжатия
            });

            archive.on('error', (err) => {
                throw err;
            });

            res.setHeader('Content-Disposition', 'attachment; filename="game.zip"');
            res.setHeader('Content-Type', 'application/zip');

            archive.pipe(res);

            // Добавляем файлы в архив
            archive.directory(folderPath, false);

            // Завершаем архив
            await archive.finalize();

        } catch (err) {
            next(ApiError.internal(err.message || 'Server error'));
        }
    }

    async downloadLauncher(req, res, next) {
        const folderPath = path.join(__dirname, '../files/launcher');

        try {
            // Проверяем существование папки
            if (!fs.existsSync(folderPath)) {
                throw ApiError.notFound('Folder not found');
            }

            const archive = archiver('zip', {
                zlib: { level: 9 } // Максимальный уровень сжатия
            });

            archive.on('error', (err) => {
                throw err;
            });

            res.setHeader('Content-Disposition', 'attachment; filename="launcher.zip"');
            res.setHeader('Content-Type', 'application/zip');

            archive.pipe(res);

            // Добавляем файлы в архив
            archive.directory(folderPath, false);

            // Завершаем архив
            await archive.finalize();

        } catch (err) {
            next(ApiError.internal(err.message || 'Server error'));
        }
    }
}

module.exports = new downloadController();