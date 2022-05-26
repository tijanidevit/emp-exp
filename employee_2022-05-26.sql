# ************************************************************
# Sequel Ace SQL dump
# Version 20033
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 192.168.56.56 (MySQL 8.0.28-0ubuntu0.20.04.3)
# Database: employee
# Generation Time: 2022-05-26 10:32:18 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(220) DEFAULT NULL,
  `password` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`id`, `username`, `password`, `created_at`)
VALUES
	(1,'admin','21232f297a57a5a743894a0e4a801fc3','2022-05-25 14:06:51');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table departments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(220) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;

INSERT INTO `departments` (`id`, `department`, `created_at`)
VALUES
	(1,'Engineering','2022-05-25 11:11:52'),
	(2,'Marketing','2022-05-25 11:12:04'),
	(3,'Management','2022-05-25 11:12:12');

/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table employees
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int DEFAULT NULL,
  `fullname` varchar(220) DEFAULT NULL,
  `location` varchar(220) DEFAULT NULL,
  `job_description` varchar(220) DEFAULT NULL,
  `profile_picture` varchar(220) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;

INSERT INTO `employees` (`id`, `department_id`, `fullname`, `location`, `job_description`, `profile_picture`, `created_at`)
VALUES
	(1,1,'Sombody','Leaves Here','On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble t','https://media-exp1.licdn.com/dms/image/C4D03AQE2cm5iwZfhkQ/profile-displayphoto-shrink_400_400/0/1601425379701?e=1658966400&v=beta&t=hh2nYQCVp2R7B-fiDJcW3znX-R6eb9r26nr2m5FsuZg','2022-05-24 10:32:57'),
	(2,1,'Ajdekn','lawal@me.com','Ayodeji','http://res.cloudinary.com/tijanicloud/image/upload/v1653491956/drzocloll35bquaygvna.jpg','2022-05-25 15:19:17'),
	(3,3,'Tijani Mustapha','Lagos','Howdy Tijani','http://res.cloudinary.com/tijanicloud/image/upload/v1653491999/nlogwbzmuxax2pdinn6e.jpg','2022-05-25 15:19:59'),
	(4,3,'Tijani Mustapha','Lagos','Another Test','http://res.cloudinary.com/tijanicloud/image/upload/v1653492170/goiaf5tjxdf4vn8egeme.jpg','2022-05-25 15:22:51'),
	(5,3,'Tijani Mustapha','Lagos','Another Test','http://res.cloudinary.com/tijanicloud/image/upload/v1653492279/popomrgripuxrbsgtifm.jpg','2022-05-25 15:24:40');

/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table expenses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `expenses`;

CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `merchant_id` int DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `comment` text,
  `receipt` varchar(220) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;

INSERT INTO `expenses` (`id`, `employee_id`, `merchant_id`, `amount`, `date`, `comment`, `receipt`, `status`, `created_at`)
VALUES
	(1,1,1,2000,'2021-01-02','hjfhjhjfhjfjhf','http://res.cloudinary.com/tijanicloud/image/upload/v1653494545/az0nutybhpxlnwhe864r.jpg',0,'2022-05-25 16:02:25'),
	(2,1,1,2000,'2021-01-02','hjfhjhjfhjfjhf','http://res.cloudinary.com/tijanicloud/image/upload/v1653494577/kh034qexkxmupvc0bl4q.jpg',0,'2022-05-25 16:02:58'),
	(3,1,1,600,'2022-05-08','This','http://res.cloudinary.com/tijanicloud/image/upload/v1653498273/fbtf46jhpnochsjtcmtv.png',0,'2022-05-25 17:04:11'),
	(4,3,1,1,'2022-05-08','jkkjkjd','http://res.cloudinary.com/tijanicloud/image/upload/v1653498334/zeddwpmpqtoimocst8sq.jpg',0,'2022-05-25 17:05:11');

/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table merchants
# ------------------------------------------------------------

DROP TABLE IF EXISTS `merchants`;

CREATE TABLE `merchants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `merchant` varchar(220) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `merchants` WRITE;
/*!40000 ALTER TABLE `merchants` DISABLE KEYS */;

INSERT INTO `merchants` (`id`, `merchant`, `created_at`)
VALUES
	(1,'Food','2022-05-25 11:12:28'),
	(2,'Clothings','2022-05-25 11:12:39'),
	(3,'Maintenance','2022-05-25 11:12:45');

/*!40000 ALTER TABLE `merchants` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
