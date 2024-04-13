import fs from 'fs';
import path from 'path';

export const getMovies = (req, res) => {
  const filePath = path.join(process.cwd(), 'data/data.json'); // Assuming data.json is in the root directory
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error reading movie data" });
      return;
    }
    
    const movies = JSON.parse(data);
    res.json(movies);
  });
};

export const getMovie = (req, res) => {
  const { href } = req.params;
  const filePath = path.join(process.cwd(), 'data/data.json'); // Assuming data.json is in the root directory
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error reading config file" });
      return;
    }
    const movies = JSON.parse(data);
    const movie = movies.movies.find(movie => movie.href === href);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  })
};
// export const addMovie = (req, res) => {}  
// export const updateMovie = (req, res) => {}
// export const deleteMovie = (req, res) => {}

