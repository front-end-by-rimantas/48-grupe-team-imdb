![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![Gluten Status](https://img.shields.io/badge/Gluten-Free-green.svg)
![Eco Status](https://img.shields.io/badge/ECO-Friendly-green.svg)
[![Discord](https://discord.com/api/guilds/571393319201144843/widget.png)](https://discord.gg/dRwW4rw)

# IMDb

**Movie page:**
![Title page screenshot](/client/src/assets/images/readmeimg/imdbpage.png)

<br>

## 🌟 About

This project is about teamwork to create a website. A group of students who work together to complete specific tasks and achieve a common goal. Practical elements of teamwork include planning workflows, regular meetings, maintaining open channels of communication, and other collaborative activities.

This project is for educational porpuses only. Pull request are welcome, but priority for project authors! Thank you for your cooperation!

Site published at:  https://github.com/front-end-by-rimantas/48-grupe-team-imdb

Design: [IMDb](https://www.imdb.com/)

## Technologies used 🛠️
- [React](https://es.reactjs.org/) - Front-End JavaScript library
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Vite](https://vitejs.dev/) - Frontend Tooling

## 🎯 Project features/goals

-   Github pages
-   Git branch
-   Form
-   Animation
-   Icons
-   FontAwesome icons
-   Content rendering
-   Film gallery
-   Slider
-   Communication
-   Creativity
-   Work ethic
-   Time management
-   Responsive design 

## 🧰 Getting Started

### 💻 Prerequisites

Node.js - _download and install_

```
https://nodejs.org
```

Git - _download and install_

```
https://git-scm.com
```

### 🏃 Run locally

Would like to run this project locally? Open terminal and follow these steps:

1. Clone the repo
    ```sh
    git clone https://github.com/front-end-by-rimantas/48-grupe-team-imdb
    ```
2. Install NPM packages
    ```sh
    npm i
    ```
    or
    ```sh
    npm install
    ```
3. Run the server
    ```sh
    npm run dev
    ```
### 🏃 Prepare SQL DB

-- Database: `imdb`
--

--
-- Table structure for table `favoritemovies`
--

CREATE TABLE `favoritemovies` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(10) NOT NULL,
  `href` char(200) NOT NULL,
  `imgPath` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logintoken`
--

CREATE TABLE `logintoken` (
  `id` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `token` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(4) NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `category` varchar(255) NOT NULL,
  `ageCenzor` varchar(5) NOT NULL,
  `awards` int(255) NOT NULL,
  `gross` varchar(20) NOT NULL,
  `url` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `href` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(255) NOT NULL,
  `userId` int(10) NOT NULL,
  `movieId` int(255) NOT NULL,
  `rate` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) UNSIGNED NOT NULL,
  `name` char(30) NOT NULL,
  `email` char(50) NOT NULL,
  `password` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favoritemovies`
--
ALTER TABLE `favoritemovies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logintoken`
--
ALTER TABLE `logintoken`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`userId`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favoritemovies`
--
ALTER TABLE `favoritemovies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logintoken`
--
ALTER TABLE `logintoken`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;



### 🧪 Running tests

There is no tests for this project.

## 🎅 Authors

Aina: [Github](https://github.com/AinaEin)
Dovydas: [Github](https://github.com/Dovydas-G)
Lilia: [Github](https://github.com/liliiavint)
Lukas: [Github](https://github.com/LukasN12)
Marius: [Github](https://github.com/mcepulis/)
Skaistė: [Github](https://github.com/Skaistev)

## ⚠️ License

Distributed under the MIT License. See LICENSE.txt for more information.

## 🔗 Other resources

No other resources.
