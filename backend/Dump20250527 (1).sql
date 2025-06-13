-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: ken
-- ------------------------------------------------------
-- Server version	8.0.38
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Table structure for table `blog`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL DEFAULT '2',
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `web_admin_login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `blog`
--
LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (2,2,'Blog of the Day to fghj','<p><strong>Table of content for demo blog</strong></p><p><img src=\"http://localhost:3000/uploads/image-1747892580602-861359379.png\"></p><p><img src=\"http://localhost:3000/uploads/image-1747636793463-510843767.png\"></p>','2025-05-19 06:41:14','2025-05-22 05:43:03'),(3,2,'Spine Care Costs','<p>The Global costs</p><p><img src=\"http://localhost:3000/uploads/image-1747805957161-866241845.png\"></p><p>In 2017, the American GDP was estimated at approximately $19.4 trillion. With spine care costing $135 billion per year in the USA, that means approximately one in every $144 GDP dollars is spent on spine care. The 2017 world GDP was estimated at $79.6 trillion. Extrapolating the same (1/144) ratio, global spine care costs would be $553 billion (0.7% of GDP). However, if the world spends at a rate of one-half the American rate (1/288), then the costs are approximately $276 billion (0.35% of GDP).</p>','2025-05-21 05:39:19','2025-05-21 06:10:30');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_form`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `blog_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` longtext,
  `website` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_form`
--

LOCK TABLES `blog_form` WRITE;
/*!40000 ALTER TABLE `blog_form` DISABLE KEYS */;
INSERT INTO `blog_form` VALUES (4,'Sidharth','gopi@gmail.com','This is  dadaa','https://mine-main.vercel.app'),(5,'Devika','devikasatheesan489@gmail.com','ewexdscsdcdfvfdv d','https://oviyamedsafe.com/');
/*!40000 ALTER TABLE `blog_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `author_detail` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT (1),
  `kindle` float DEFAULT (0.0),
  `audible` float DEFAULT (0.0),
  `hardcover` float DEFAULT (0.0),
  `audio_cd` float DEFAULT (0.0),
  `book_description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `images` json DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `editorial_review` text,
  `about_author` text,
  `product_details` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `book`
--
LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'1Watch Your Back: Nine Proven Strategies to Reduce Your Neck and Back Pain Without Surgery','Ken Hansraj MD (Author), Graham Winton (Narrator), Recorded Books (Publisher)',10,14.99,0.99,22.14,44.5,'A self-care guide for better back health—and overall well-being—with nine essential strategies to support your neck and spine\r\n\r\nBack problems are the leading cause of disability worldwide—and many of us will endure severe or chronic back pain at some time in our lives. But what can we do? Are surgery and painkillers the only answers? “Not at all,” says spine and neck expert Dr. Ken Hansraj. “There are dozens of exercises, habits, and techniques you can practice—anytime, anyplace—that will significantly improve, if not completely heal, your back pain.” Now, this leading researcher presents a comprehensive guide to help you overcome physical, mental, and emotional factors that contribute to back problems.\r\n\r\nIn Watch Your Back, Dr. Hansraj offers a straightforward program for taking the health of your spine and neck into your own hands. Here he offers nine adoptable strategies that provide simple, specific directions on what to do to strengthen your back and make your spine supple. With guidance on nutrition, posture fixes, mindfulness practices for positivity, stretches, and more, Dr. Hansraj’s program has provided healing and pain relief for hundreds of patients. “The health of our back is essential to our overall wellness—not just our physical health, but our clarity of mind, emotional balance, and quality of life,” says Dr. Hansraj. Here is an essential resource for anyone suffering from back issues—with powerful self-care methods to help you recover the joy and freedom of a healthy spine.','2025-05-22 07:35:22','2025-05-22 12:34:01','[\"uploads\\\\images-1747899322388-775840839.png\"]',4,NULL,NULL,NULL),(2,'Keys to An Amazing Life: Secrets of the Cervical Spine (Spine Health)','by Kenneth Hansraj MD (Author), Gary Crumpler (Illustrator), Marcia Griffin Hansraj DO (Editor), Chris Miller (Editor), Jeff Karg (Photographer), Michael Palumbo (Photographer), Alan Shapiro (Photographer), Alison Rayner (Preface) ',1,6.99,29.95,35.84,12.09,'Keys To An Amazing Life: Secrets Of\r\nThe Cervical Spine is written with the everyday\r\nperson in mind and consists of cutting-edge descriptions\r\nof every option that is available and cost free for people.\r\n\r\nWith 4 out of 5 people suff ering at some point in\r\ntheir life, globally, spinal problems are one of the most\r\ncommon reasons to visit a physician. Cost of care in\r\nthe United States is approximately 100 billion dollars a\r\nyear. Intelligent people from all walks of life demand to\r\nknow and want to know what makes up the spine, what\r\nproblems could arise, and what lifestyle, conservative\r\ntreatment, and surgical options are available.\r\n\r\nSpinal Problems: Chapters 1–4 illustrate\r\nthe parts of the spine, and discusses the global spinal\r\nproblem and typical spinal problems. \" e illustrations\r\nare presented in 2.5D detail. Anatomy and motion of the\r\nneck is explained. Herniated discs, degenerated disks,\r\nspinal stenosis, spondylolisthesis, infections, and tumors\r\nare illustrated.\r\n\r\nLifestyle Options: Chapters 5–8 explore the\r\npower of a positive thought, the danger of a negative\r\nthought, the importance of neural plasticity, amygdala\r\nplasticity, general thinking, and physical action and\r\nresponses. Deep belly breathing, meditation, brainwave\r\nentrainment, air, silence, solitude, stillness, thought,\r\naffi rmations, and happiness are all free daily options that\r\ninfluence spinal health.\r\n\r\nGood posture; planning; drinking water; napping;\r\nsleeping properly; getting up early; long, hot showers;\r\navoidance of bending, lifting, twisting, and reaching\r\nare all examples of free everyday physical options that\r\ncontributez to spinal health. Facet and nerve mobility\r\nare explained and correlated for overuse syndromes.\r\n\" e dangers of cigarette smoking, with permanent\r\ndestruction of disc spacing, and cumulative risk for\r\ndiseases is clearly shown. Wholesome food options are\r\nalso discussed.\r\n\r\nTraditional Treatments: Chapters 9–13\r\nexplain the modalities of aerobic activities and physical\r\ntreatments such as massage, hot and cold packs,\r\nstimulation, ultrasound, and traction. \" e uncommon\r\ncervical stabilization, postural training, osteopathic\r\nmanipulation techniques, and yoga techniques are\r\ndemonstrated.\r\n\r\nSurgical Treatments: Chapters 14–16 explain\r\nthe most common pain management and surgical\r\nprocedures.','2025-05-22 07:44:24','2025-05-22 08:30:27','[\"uploads\\\\images-1747899864711-798105327.png\"]',1,NULL,NULL,NULL),(17,'Lift: Meditations To Boost Back Health','Ken Hansraj MD (Artist), Kenneth Hansraj MD (Artist)',1,0,9.49,0,9.49,'Box Set, Enhanced, CD Single','2025-05-22 08:43:46','2025-05-22 08:43:46','[\"uploads\\\\images-1747903426811-442911089.png\"]',5,NULL,NULL,NULL);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `contact_form`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `contact_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `contact_form`
--
LOCK TABLES `contact_form` WRITE;
/*!40000 ALTER TABLE `contact_form` DISABLE KEYS */;
INSERT INTO `contact_form` VALUES (8,'Sidharth Babu','sidharthinfernal@gmail.com','issue with the neck'),(9,'Sidharth Babu','sidharthinfernal@gmail.com','dsdaddddddddddddddddddddddddddddddd'),(10,'Sidharth Babu','sidharthinfernal@gmail.com','jjjjjjjjjjjadsdgggggggggggadasdsd'),(11,'Sidharth Babu','sidharthinfernal@gmail.com','wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'),(12,'Devika E.K.S','devikasatheesan489@gmail.com','demo user has been arrived');
/*!40000 ALTER TABLE `contact_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_form`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `email_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_form`
--

LOCK TABLES `email_form` WRITE;
/*!40000 ALTER TABLE `email_form` DISABLE KEYS */;
INSERT INTO `email_form` VALUES (2,'Devika','E.K.S','admin@gmail.com'),(3,'Devika','E.K.S','devikasatheesan489@gmail.com'),(4,'Devika','E.K.S','devikasatheesan489@gmail.com'),(5,'Devika','E.K.S','devikasatheesan489@gmail.com'),(6,'Devika','E.K.S','devikasatheesan489@gmail.com'),(7,'jack','jim','jack@gmail.com'),(8,'Diya','A','devika.eks@kggeniuslabs.com'),(9,'dev','devikasatheesan','devikasatheesan489@gmail.com');
/*!40000 ALTER TABLE `email_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `reviewer_name` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL DEFAULT '2',
  `name` varchar(100) DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (5,2,'Sankar',5,'United States','The Well Written book for all audience','2025-05-22 12:21:15','2025-05-22 12:21:15');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonial`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `testimonial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL DEFAULT '2',
  `patient_name` varchar(100) DEFAULT NULL,
  `content` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `testimonial_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `web_admin_login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonial`
--

LOCK TABLES `testimonial` WRITE;
/*!40000 ALTER TABLE `testimonial` DISABLE KEYS */;
INSERT INTO `testimonial` VALUES (1,2,'Sidharth','This is great service provided and best','2025-05-20 07:23:50','2025-05-20 07:23:50'),(2,2,'Sidharth123','This is great service provided and best','2025-05-20 07:36:36','2025-05-20 07:36:36'),(3,2,'Sankar','This is a great product','2025-05-20 09:53:43','2025-05-20 09:53:43');
/*!40000 ALTER TABLE `testimonial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_signup`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `user_signup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_signup`
--

LOCK TABLES `user_signup` WRITE;
/*!40000 ALTER TABLE `user_signup` DISABLE KEYS */;
INSERT INTO `user_signup` VALUES (4,'Sidharth','Babu','john@example.com','7010604488','2025-05-13 05:21:30','2025-05-22 12:17:23','$2b$10$w7r8P/R.RGXJw3xHWvFafeiYFfp/6OBjRau1T7NvpPdAd5.H2Z4by');
/*!40000 ALTER TABLE `user_signup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_admin_login`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `web_admin_login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT 'admin@123',
  `password` varchar(100) DEFAULT 'admin@123',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_admin_login`
--

LOCK TABLES `web_admin_login` WRITE;
/*!40000 ALTER TABLE `web_admin_login` DISABLE KEYS */;
INSERT INTO `web_admin_login` VALUES (2,'admin@gmail.com','admin@123');
/*!40000 ALTER TABLE `web_admin_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `youtube_video`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `youtube_video` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL DEFAULT '2',
  `yotubelLink` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `youtube_video_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `web_admin_login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `youtube_video`
--

LOCK TABLES `youtube_video` WRITE;
/*!40000 ALTER TABLE `youtube_video` DISABLE KEYS */;
INSERT INTO `youtube_video` VALUES (2,2,'https://www.youtube.com/embed/gCBm7iG_KLA?si=bbEOnOPqVoWLL9ig','Colorado Bovie','2025-05-19 10:07:35','2025-05-19 10:07:35'),(3,2,'https://www.youtube.com/embed/PfAdj_DsXN8?si=E4Dd68zknk5dy_B3','USA Independence Day','2025-05-19 10:15:16','2025-05-19 10:15:16'),(4,2,'https://www.youtube.com/embed/G1O39BS2h90?si=W8FDhQKvbgyuBLfA','LIFT Meditations to Boost Back Health','2025-05-19 10:22:25','2025-05-19 10:22:25'),(5,2,'https://www.youtube.com/embed/mRpkxeGZ584?si=BQq3TGtcTe8RGtOE','The World Has A Spine Problem (Ultra HD 4K)','2025-05-19 10:22:55','2025-05-19 10:22:55'),(6,2,'https://www.youtube.com/embed/Ryfn1x3KHuE?si=Om1TcZITvVMi8Rai','The World Has A Spine Problem Presented at the United Nations','2025-05-19 10:23:32','2025-05-19 10:23:32');
/*!40000 ALTER TABLE `youtube_video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-27 18:48:39
