import fs from "fs";

export const getHelpInfo = (req, res) => {
  fs.readFile("../server/data/helpPageData.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error reading config file" });
      return;
    }

    const helpInfo = JSON.parse(data);
    res.json(helpInfo);
  });
};
