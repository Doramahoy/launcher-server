const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const ApiError = require('../error/ApiError');
const archiver = require('archiver');

class UpdateController {

    async checkUpdateAssembly(req, res, next) {
        try {
            const clientVersion = req.query.version; 

            const currentVersionPath = path.join(__dirname, '../versionModpack.json');
            const currentVersion = JSON.parse(fs.readFileSync(currentVersionPath, 'utf8'));

            if (clientVersion !== currentVersion.version) {
                return res.json({ 
                    updateNeeded: true, 
                    updateFolder: currentVersion.updateFolder
                 });
            } else {
                return res.json({ updateNeeded: false });
            }
        } catch (e) {
            console.error('Error in checkUpdateAssembly:', e);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async checkUpdateLauncher(req, res, next) {
        try {
            const clientVersion = req.query.version; 

            const currentVersionPath = path.join(__dirname, '../versionLauncher.json');
            const currentVersion = JSON.parse(fs.readFileSync(currentVersionPath, 'utf8'));

            if (clientVersion !== currentVersion.version) {
                return res.json({ 
                    updateNeeded: true, 
                    updateFolder: currentVersion.updateFolder
                 });
            } else {
                return res.json({ updateNeeded: false });
            }
        } catch (e) {
            console.error('Error in checkUpdateAssembly:', e);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async downloadUpdateAssembly(req, res, next) {
        try {
            const folderPath = path.join(__dirname, '../files/minecraft/game');
            const jsonFilePath = path.join(__dirname, '../versionModpack.json');
            const updateInfo = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
            const updateFolders = updateInfo.updateFolder;
 
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });

            archive.on('error', (err) => {
                throw err;
            });

            res.setHeader('Content-Disposition', 'attachment; filename="game.zip"');
            res.setHeader('Content-Type', 'application/zip');

            archive.pipe(res);

            // Добавляем папки в архив
            for (const folder of updateFolders) {
                const filePath = path.join(folderPath, folder);

                // Проверяем, что файл или директория существует
                if (fs.existsSync(filePath)) {
                    const stats = fs.statSync(filePath);
                    if (stats.isFile()) {
                        archive.file(filePath, { name: folder }); // Добавляем файл в архив
                    } else if (stats.isDirectory()) {
                        archive.directory(filePath, folder); // Добавляем директорию в архив
                    }
                } else {
                    console.warn(`File or directory not found: ${filePath}`);
                }
            }

            // Завершаем архив
            await archive.finalize();
        } catch (e) {
            
        }
    }

    async downloadUpdateLauncher(req, res, next) {
        try {
            const folderPath = path.join(__dirname, '../files/game');
            const jsonFilePath = path.join(__dirname, '../versionModpack.json');
            const updateInfo = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
            const updateFolders = updateInfo.updateFolder;
 
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });

            archive.on('error', (err) => {
                throw err;
            });

            res.setHeader('Content-Disposition', 'attachment; filename="game.zip"');
            res.setHeader('Content-Type', 'application/zip');

            archive.pipe(res);

            // Добавляем папки в архив
            for (const folder of updateFolders) {
                const filePath = path.join(folderPath, folder);

                // Проверяем, что файл или директория существует
                if (fs.existsSync(filePath)) {
                    const stats = fs.statSync(filePath);
                    if (stats.isFile()) {
                        archive.file(filePath, { name: folder }); // Добавляем файл в архив
                    } else if (stats.isDirectory()) {
                        archive.directory(filePath, folder); // Добавляем директорию в архив
                    }
                } else {
                    console.warn(`File or directory not found: ${filePath}`);
                }
            }

            // Завершаем архив
            await archive.finalize();
        } catch (e) {
            
        }
    }

}

module.exports = new UpdateController();