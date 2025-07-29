-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2025 at 12:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `www_crm_com`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `products_qty` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`products_qty`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `products_qty`, `created_at`) VALUES
(6, 190, '[{\"product_id\":1,\"qty\":5},{\"product_id\":2,\"qty\":2},{\"product_id\":2,\"qty\":5},{\"product_id\":1,\"qty\":2},{\"product_id\":2,\"qty\":2},{\"product_id\":2,\"qty\":5},{\"product_id\":1,\"qty\":2},{\"product_id\":2,\"qty\":2},{\"product_id\":2,\"qty\":4},{\"product_id\":1,\"qty\":1},{\"product_id\":2,\"qty\":1}]', '2025-07-29 07:00:22'),
(7, 191, '[{\"product_id\": 7, \"qty\": 2}, {\"product_id\": 3, \"qty\": 1}]', '2025-07-25 09:26:27'),
(8, 192, '[{\"product_id\": 10, \"qty\": 4}]', '2025-07-25 09:26:27'),
(9, 193, '[{\"product_id\": 1, \"qty\": 2}, {\"product_id\": 4, \"qty\": 1}]', '2025-07-25 09:26:27'),
(10, 194, '[{\"product_id\": 6, \"qty\": 1}, {\"product_id\": 11, \"qty\": 2}]', '2025-07-25 09:26:27'),
(11, 195, '[{\"product_id\": 8, \"qty\": 3}, {\"product_id\": 9, \"qty\": 1}]', '2025-07-25 09:26:27'),
(12, 196, '[{\"product_id\": 12, \"qty\": 2}]', '2025-07-25 09:26:27'),
(14, 198, '[{\"product_id\": 15, \"qty\": 1}, {\"product_id\": 1, \"qty\": 4}]', '2025-07-25 09:26:27'),
(15, 199, '[{\"product_id\": 13, \"qty\": 3}]', '2025-07-25 09:26:27'),
(16, 200, '[{\"product_id\": 16, \"qty\": 1}, {\"product_id\": 6, \"qty\": 1}]', '2025-07-25 09:26:27'),
(17, 201, '[{\"product_id\": 7, \"qty\": 2}, {\"product_id\": 2, \"qty\": 2}]', '2025-07-25 09:26:27'),
(18, 202, '[{\"product_id\":3,\"qty\":1},{\"product_id\":14,\"qty\":4}]', '2025-07-29 09:31:32'),
(19, 203, '[{\"product_id\": 10, \"qty\": 2}, {\"product_id\": 8, \"qty\": 1}]', '2025-07-25 09:26:27'),
(20, 204, '[{\"product_id\":3,\"qty\":8},{\"product_id\":4,\"qty\":1}]', '2025-07-28 09:15:00'),
(1011, 197, '[{\"product_id\":3,\"qty\":1}]', '2025-07-29 09:29:50');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `sell_price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT 0.0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `name`, `desc`, `image_url`, `stock`, `price`, `sell_price`, `rating`, `created_at`, `modified_at`, `deleted_at`) VALUES
(1, 'iPhone 14', 'Latest Apple smartphone with A15 chip', 'https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo.jpg.og.jpg?202505081815', 50, '999.99', '949.99', '5.0', '2025-07-22 13:10:00', '2025-07-24 06:14:08', NULL),
(2, 'Samsung Galaxy Watch 6', 'Smartwatch with fitness tracking', 'https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-watch6-r945-469954-sm-r945fzkains-537406789?$684_547_PNG$', 75, '299.99', '279.99', '5.0', '2025-07-23 00:10:30', '2025-07-24 06:14:25', NULL),
(3, 'Air Conditioner 1.5 Ton', 'Energy efficient air conditioner', 'https://lh4.googleusercontent.com/proxy/tO2pyXmGzW1jqdI7Np5v42IK2WPsiNwVB4V_TEoTDn4NKp61zAYzIU8Q9WOQY7BaZKUSDE2Vktwck8wq6jVYZr8I3DbNOL1MRKHWX1ySz6YZ07x41uuHnymTOpKO6PP6-OuisI2OLRJGjxEPdMvrYsRecFvsJ7Vg_Nkd_NyH0ewfByQ', 30, '499.99', '459.99', '4.0', '2025-07-23 00:11:00', '2025-07-24 06:14:00', NULL),
(4, 'The Alchemist', 'Inspirational book by Paulo Coelho', 'https://m.media-amazon.com/images/I/617lxveUjYL.jpg', 200, '19.99', '14.99', '5.0', '2025-07-23 00:11:30', '2025-07-24 06:14:39', NULL),
(5, 'Dumbbell Set', 'Adjustable dumbbells for home workouts', 'https://www.lifelongindiaonline.com/cdn/shop/files/1_88ab00b6-9166-493b-9775-2d90ac286dba.jpg?v=1752144854', 120, '89.99', '74.99', '5.0', '2025-07-23 00:12:00', '2025-07-24 06:14:51', NULL),
(6, 'LEGO Classic', 'Creative building blocks for kids', 'https://m.media-amazon.com/images/I/91HNswR5tIL.jpg', 300, '49.99', '30.00', '5.0', '2025-07-22 18:42:30', '2025-07-25 03:42:22', NULL),
(7, 'Blender Pro 900', 'High-speed kitchen blender', 'https://www.rasoishop.com/cdn/shop/products/NB9-1249ABG-1.jpg?v=1681147882', 80, '99.99', '89.99', '4.0', '2025-07-23 00:13:00', '2025-07-24 06:15:51', NULL),
(8, 'Ergonomic Chair', 'Adjustable office chair with lumbar support', 'https://m.media-amazon.com/images/I/71m901lXArL._UF894,1000_QL80_.jpg', 60, '199.99', '169.99', '4.0', '2025-07-23 00:13:30', '2025-07-24 06:15:56', NULL),
(9, 'Face Serum Vitamin C', 'Brightening serum for skin', 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/14172246/2025/5/20/8ee1b2ec-3de7-46f7-99a2-e69f1105979f1747737291560-Garnier-Bright-Complete-30X-Vitamin-C-Face-Serum---Reduces-S-1.jpg', 150, '24.99', '19.99', '5.0', '2025-07-23 00:14:00', '2025-07-24 06:13:42', NULL),
(10, 'Car Vacuum Cleaner', 'Portable vacuum for cars', 'https://www.eurekaforbes.com/cms/assets/prod/GFCDSFVAC_00000_1_b45cb8e962.jpg', 90, '34.99', '30.00', '4.0', '2025-07-22 18:44:30', '2025-07-25 03:42:11', NULL),
(14, 'Boat Immortal 131', 'Boat immortal 131 for gaming', 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/3_439da181-28cb-4228-b934-c1dff57d777a.png?v=1674675263', 12, '1299.00', '0.00', '4.0', '2025-07-23 07:08:16', '2025-07-24 06:16:42', NULL),
(15, 'RealMe Wireless 3', 'RealMe Wireless 3 for calling', 'https://m.media-amazon.com/images/I/61xqefY2rZL._UF1000,1000_QL80_.jpg', 15, '1799.00', '0.00', '5.0', '2025-07-23 12:40:47', '2025-07-23 12:40:47', NULL),
(16, 'Boat', 'aaaa', 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/3_439da181-28cb-4228-b934-c1dff57d777a.png?v=1674675263', 12, '334.00', '0.00', '1.0', '2025-07-23 12:43:44', '2025-07-23 12:43:44', NULL),
(18, 'Noice 3', 'Noice3  headphone', 'https://m.media-amazon.com/images/I/61aRIZ0f0AL.jpg', 15, '1599.00', '1499.00', '0.0', '2025-07-24 06:30:03', '2025-07-24 06:30:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`category_id`, `name`, `desc`, `created_at`, `modified_at`, `deleted_at`) VALUES
(15, 'Electronics', 'Devices and gadgets', '2025-07-23 12:02:26', '2025-07-23 12:02:26', NULL),
(16, 'Footwear', 'Shoes, slippers, and sandals', '2025-07-23 12:04:04', '2025-07-23 12:04:04', NULL),
(17, 'Electronics', 'Devices and gadgets', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(18, 'Fashion', 'Clothing, shoes, and accessories', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(19, 'Books', 'Fiction, non-fiction, and academic books', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(20, 'Home & Kitchen', 'Appliances, furniture, and utensils', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(21, 'Toys', 'Toys and games for all ages', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(22, 'Beauty', 'Cosmetics and skincare products', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(23, 'Sports', 'Sporting goods and fitness gear', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(24, 'Automotive', 'Car parts and accessories', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(25, 'Garden', 'Gardening tools and supplies', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(26, 'Health', 'Healthcare and wellness items', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(27, 'Music', 'Musical instruments and audio gear', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(28, 'Pets', 'Pet food, toys, and care products', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(29, 'Stationery', 'Office and school supplies', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(30, 'Groceries', 'Everyday grocery items', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL),
(31, 'Footwear', 'Shoes, sandals, and boots', '2025-07-23 12:04:53', '2025-07-23 12:04:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_category_map`
--

CREATE TABLE `product_category_map` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_category_map`
--

INSERT INTO `product_category_map` (`product_id`, `category_id`) VALUES
(1, 15),
(1, 18),
(2, 16),
(2, 19),
(3, 17),
(3, 20),
(4, 18),
(4, 21),
(5, 15),
(5, 19),
(6, 20),
(7, 21),
(8, 15),
(9, 16),
(10, 17);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','user','sm','qa') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `email`, `role`) VALUES
(43, 'chris.white13@example.com', 'user'),
(44, 'daniel.thomas11@example.com', 'user'),
(45, 'david.miller7@example.com', 'user'),
(46, 'emily.davis4@example.com', 'user'),
(47, 'james.moore9@example.com', 'user'),
(48, 'jane.smith2@example.com', 'user'),
(49, 'jennifer.clark20@example.com', 'user'),
(50, 'john.doe1@example.com', 'user'),
(51, 'karen.harris14@example.com', 'user'),
(52, 'kevin.garcia17@example.com', 'user'),
(53, 'laura.martinez18@example.com', 'user'),
(54, 'linda.johnson6@example.com', 'user'),
(55, 'mark.robinson19@example.com', 'user'),
(56, 'michael.wilson5@example.com', 'user'),
(57, 'nancy.thompson16@example.com', 'user'),
(58, 'patricia.taylor10@example.com', 'user'),
(59, 'robert.brown3@example.com', 'user'),
(60, 'sarah.jackson12@example.com', 'user'),
(61, 'susan.anderson8@example.com', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticket_id` int(11) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `status` enum('backlog','to_do','in_progress','on_hold','review','done') NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticket_id`, `subject`, `status`, `last_updated`, `created_at`) VALUES
(86, 'Login data Store in localsystem', 'in_progress', '2025-07-25 10:59:39', '2025-07-25 04:07:46'),
(87, 'UI check', 'done', '2025-07-25 10:59:32', '2025-07-25 04:09:01'),
(88, 'Cart Data insert', 'backlog', '2025-07-25 09:41:11', '2025-07-25 09:41:11'),
(89, 'Checkout page dynamic Data', 'on_hold', '2025-07-25 10:59:50', '2025-07-25 04:11:11'),
(90, 'Payment Menthod', 'backlog', '2025-07-25 09:42:51', '2025-07-25 09:42:51'),
(91, 'Login + cart + store data', 'backlog', '2025-07-25 09:42:51', '2025-07-25 09:42:51'),
(92, 'Cart Insert, update - Node API ', 'in_progress', '2025-07-25 10:55:37', '2025-07-25 05:25:07'),
(93, 'Ticket Page - New Description Field add', 'backlog', '2025-07-25 11:00:38', '2025-07-25 11:00:38'),
(94, 'Encrypt and Decrypt Password Node, Mysql', 'in_progress', '2025-07-25 12:56:27', '2025-07-25 12:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `c_password` varchar(255) NOT NULL,
  `number` bigint(20) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `c_password`, `number`, `address`, `created_at`) VALUES
(190, 'Jane Smith', 'jane.smith2@example.com', 'jane.smith2@example.com	', 'jane.smith2@example.com	', 9876543211, '456 Park Ave, Mumbai', '2025-07-25 09:36:44'),
(191, 'Robert Brown', 'robert.brown3@example.com', 'robert.brown3@example.com', 'robert.brown3@example.com', 9876543212, '789 Hill Rd, Bangalore', '2025-07-25 12:46:17'),
(192, 'Emily Davis', 'emily.davis4@example.com', 'Pass@1234', 'Pass@1234', 9876543213, '22 Cross St, Pune', '2025-07-22 06:05:39'),
(193, 'Michael Wilson', 'michael.wilson5@example.com', 'Pass@1234', 'Pass@1234', 9876543214, '100 Lakeview, Chennai', '2025-07-22 06:05:39'),
(194, 'Linda Johnson', 'linda.johnson6@example.com', 'Pass@1234', 'Pass@1234', 9876543215, '82 MG Rd, Kolkata', '2025-07-22 06:05:39'),
(195, 'David Miller', 'david.miller7@example.com', 'Pass@1234', 'Pass@1234', 9876543216, '5 Palm Grove, Hyderabad', '2025-07-22 06:05:39'),
(196, 'Susan Anderson', 'susan.anderson8@example.com', 'Pass@1234', 'Pass@1234', 9876543217, '17 Beach Rd, Goa', '2025-07-22 06:05:39'),
(197, 'James Moore', 'james.moore9@example.com', 'james.moore9@example.com	', 'james.moore9@example.com	', 9876543218, '11 Ridge Ave, Jaipur', '2025-07-28 09:30:37'),
(198, 'Patricia Taylor', 'patricia.taylor10@example.com', 'Pass@1234', 'Pass@1234', 9876543219, '99 Lake Rd, Ahmedabad', '2025-07-22 06:05:39'),
(199, 'Daniel Thomas', 'daniel.thomas11@example.com', 'Pass@1234', 'Pass@1234', 9876543220, '7 South St, Lucknow', '2025-07-22 06:05:39'),
(200, 'Sarah Jackson', 'sarah.jackson12@example.com', 'Pass@1234', 'Pass@1234', 9876543221, '51 Rose Dr, Indore', '2025-07-22 06:05:39'),
(201, 'Christopher White', 'chris.white13@example.com', 'Pass@1234', 'Pass@1234', 9876543222, '16 Elm Rd, Bhopal', '2025-07-22 06:05:39'),
(202, 'Karen Harris', 'karen.harris14@example.com', 'karen.harris14@example.com	', 'karen.harris14@example.com	', 9876543223, '42 Club Rd, Patna', '2025-07-29 09:30:41'),
(203, 'Brian Martin', 'brian.martin15@example.com', 'Pass@1234', 'Pass@1234', 9876543224, '19 Station Rd, Ranchi', '2025-07-22 06:05:39'),
(204, 'Nancy Thompson', 'nancy.thompson16@example.com', 'Pass@1234', 'Pass@1234', 9876543225, '44 University St, Nagpur', '2025-07-22 06:05:39'),
(205, 'Kevin Garcia', 'kevin.garcia17@example.com', 'Pass@1234', 'Pass@1234', 9876543226, '2 King St, Surat', '2025-07-22 06:05:39'),
(206, 'Laura Martinez', 'laura.martinez18@example.com', 'Pass@1234', 'Pass@1234', 9876543227, '78 Green Ave, Varanasi', '2025-07-22 06:05:39'),
(207, 'Mark Robinson', 'mark.robinson19@example.com', 'Pass@1234', 'Pass@1234', 9876543228, '33 Market St, Noida', '2025-07-22 06:05:39'),
(208, 'Jennifer Clark', 'jennifer.clark20@example.com', 'Pass@1234', 'Pass@1234', 9876543229, '9 Ring Rd, Chandigarh', '2025-07-22 06:05:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `product_category_map`
--
ALTER TABLE `product_category_map`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticket_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1012;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `product_category_map`
--
ALTER TABLE `product_category_map`
  ADD CONSTRAINT `product_category_map_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_category_map_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`category_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
