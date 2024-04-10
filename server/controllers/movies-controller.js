import fs from "fs";

export const getMovies = (req, res) => {
  fs.readFile("../server/data/data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error reading config file" });
      return;
    }
    
    const movies = JSON.parse(data);
    res.json(movies);
  });
};


// export const addMovie = (req, res) => {}  
// export const updateMovie = (req, res) => {}
// export const deleteMovie = (req, res) => {}
