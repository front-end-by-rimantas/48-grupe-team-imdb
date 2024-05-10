
import express from 'express';
import multer from 'multer';
import path from 'path';

export const uploadMovie = express.Router();

const movieStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/images');
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.replace(/\s+/g, '-').toLowerCase();
        cb(null, originalName); 
    },
});

const movieUpload = multer({
    storage: movieStorage,
    limits: {
        fileSize: 1e6,
    }
});


uploadMovie.use('/', movieUpload.single('movie_image'), (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded.');
        }

        const imgFilename = path.basename(req.file.filename);

        return res.send(JSON.stringify({
            type: 'success',
            message: 'Movie image uploaded',
            imgPath: imgFilename, 
        }));
    } catch (error) {
        console.error('Error uploading movie image:', error);
        return res.status(500).send(JSON.stringify({
            type: 'error',
            message: 'Failed to upload movie image',
            error: error.message,
        }));
    }
});

