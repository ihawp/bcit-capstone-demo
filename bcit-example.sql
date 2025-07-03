-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 03, 2025 at 10:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bcit-example`
--

-- --------------------------------------------------------

--
-- Table structure for table `portfolio-posts`
--

CREATE TABLE `portfolio-posts` (
  `id` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `summary` tinytext NOT NULL,
  `content` text NOT NULL,
  `time_created` timestamp(6) NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `portfolio-posts`
--

INSERT INTO `portfolio-posts` (`id`, `title`, `summary`, `content`, `time_created`) VALUES
(47, 'asdasdsad', 'asdasdsadsdad', '# hello!', '2025-07-03 20:10:03.286107');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `portfolio-posts`
--
ALTER TABLE `portfolio-posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `portfolio-posts`
--
ALTER TABLE `portfolio-posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
