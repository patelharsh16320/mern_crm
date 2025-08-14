-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2025 at 02:51 PM
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
(1012, 1, '[{\"product_id\": 1, \"qty\": 2}, {\"product_id\": 5, \"qty\": 1}]', '2025-07-28 04:30:00'),
(1013, 2, '[{\"product_id\": 3, \"qty\": 1}, {\"product_id\": 4, \"qty\": 2}]', '2025-07-28 04:35:00'),
(1014, 3, '[{\"product_id\": 2, \"qty\": 1}, {\"product_id\": 7, \"qty\": 3}]', '2025-07-28 04:40:00'),
(1015, 4, '[{\"product_id\": 6, \"qty\": 1}, {\"product_id\": 11, \"qty\": 1}]', '2025-07-28 04:45:00'),
(1016, 5, '[{\"product_id\": 4, \"qty\": 2}, {\"product_id\": 8, \"qty\": 1}]', '2025-07-28 04:50:00'),
(1017, 6, '[{\"product_id\": 9, \"qty\": 2}]', '2025-07-28 04:55:00'),
(1018, 7, '[{\"product_id\": 10, \"qty\": 1}, {\"product_id\": 12, \"qty\": 2}]', '2025-07-28 05:00:00'),
(1019, 8, '[{\"product_id\": 1, \"qty\": 1}, {\"product_id\": 14, \"qty\": 2}]', '2025-07-28 05:05:00'),
(1020, 9, '[{\"product_id\": 2, \"qty\": 1}, {\"product_id\": 15, \"qty\": 1}]', '2025-07-28 05:10:00'),
(1021, 10, '[{\"product_id\": 3, \"qty\": 2}]', '2025-07-28 05:15:00'),
(1022, 11, '[{\"product_id\": 13, \"qty\": 1}, {\"product_id\": 4, \"qty\": 2}]', '2025-07-28 05:20:00'),
(1023, 12, '[{\"product_id\": 5, \"qty\": 3}, {\"product_id\": 6, \"qty\": 1}]', '2025-07-28 05:25:00'),
(1024, 13, '[{\"product_id\": 7, \"qty\": 1}, {\"product_id\": 8, \"qty\": 2}]', '2025-07-28 05:30:00'),
(1025, 14, '[{\"product_id\": 16, \"qty\": 1}]', '2025-07-28 05:35:00'),
(1026, 15, '[{\"product_id\": 10, \"qty\": 2}, {\"product_id\": 11, \"qty\": 1}]', '2025-07-28 05:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` varchar(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`contact_id`, `user_id`, `name`, `email`, `number`, `message`, `created_at`) VALUES
(9, 1, 'John Doe', 'john@example.com', '9876543210', 'Interested in your product.', '2025-08-08 10:17:23'),
(10, 2, 'Jane Smith', 'jane@example.com', '9123456780', 'Please send more details.', '2025-08-08 10:17:23'),
(11, NULL, 'Mike Johnson', 'mike@example.com', '9988776655', 'No account yet, but I want to register.', '2025-08-08 10:17:23'),
(12, 3, 'Emily Brown', 'emily@example.com', '9090909090', 'Need a quotation for bulk order.', '2025-08-08 10:17:23'),
(13, NULL, 'Chris Lee', 'chris@example.com', '9876501234', 'Just making an inquiry.', '2025-08-08 10:17:23'),
(14, 4, 'Sophia Wilson', 'sophia@example.com', '9001122334', 'Follow-up on previous request.', '2025-08-08 10:17:23'),
(15, NULL, 'lucifer.helllord007', 'lucifer.helllord007@gmail.com', '09988776655', 'Ignore this', '2025-08-08 10:40:14'),
(17, NULL, 'condescendingjemison1@tomorjerry.com', 'condescendingjemison1@tomorjerry.com', '09988776655', 'Ignore this', '2025-08-08 11:14:59');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `invoice_number` varchar(50) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `shipping` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `invoice_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `user_id`, `invoice_number`, `order_number`, `user_name`, `payment_method`, `subtotal`, `shipping`, `total`, `invoice_date`) VALUES
(31, 213, 'INV-1755067266575', 'ORD-1755067266575', 'Harsh Patel', 'Cash on Delivery', '579.99', '150.00', '729.99', '2025-08-13 00:00:00'),
(32, 213, 'INV-1755068039156', 'ORD-1755068039156', 'Harsh Patel', 'Cash on Delivery', '579.99', '150.00', '729.99', '2025-08-13 00:00:00'),
(33, 213, 'INV-1755068188056', 'ORD-1755068188056', 'Deep Patel', 'Cash on Delivery', '579.99', '150.00', '729.99', '2025-08-13 06:56:28'),
(34, 213, 'INV-1755068293387', 'ORD-1755068293387', 'Vatsal Ahir', 'Cash on Delivery', '579.99', '150.00', '729.99', '2025-08-13 06:58:13'),
(35, 213, 'INV-1755068633608', 'ORD-1755068633608', 'Harsh Patel', 'Cash on Delivery', '579.99', '150.00', '729.99', '2025-08-13 07:03:53'),
(36, 213, 'INV-1755087596127', 'ORD-1755087596127', 'Harsh Patel', 'Cash on Delivery', '579.99', '150.00', '729.99', '2025-08-13 12:19:56'),
(37, 213, 'INV-1755088898223', 'ORD-1755088898223', 'Harsh Patel', 'Cash on Delivery', '579.99', '150.00', '729.99', '2025-08-13 12:41:38');

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
(3, 'Air Conditioner 1.5 Ton', 'Energy efficient air conditioner', 'http://lh4.googleusercontent.com/proxy/tO2pyXmGzW1jqdI7Np5v42IK2WPsiNwVB4V_TEoTDn4NKp61zAYzIU8Q9WOQY7BaZKUSDE2Vktwck8wq6jVYZr8I3DbNOL1MRKHWX1ySz6YZ07x41uuHnymTOpKO6PP6-OuisI2OLRJGjxEPdMvrYsRecFvsJ7Vg_Nkd_NyH0ewfByQ', 30, '499.99', '459.99', '4.0', '2025-07-22 18:41:00', '2025-07-29 05:51:19', NULL),
(4, 'The Alchemist', 'Inspirational book by Paulo Coelho', 'https://m.media-amazon.com/images/I/617lxveUjYL.jpg', 200, '19.99', '14.99', '5.0', '2025-07-23 00:11:30', '2025-07-24 06:14:39', NULL),
(5, 'Dumbbell Set', 'Adjustable dumbbells for home workouts', 'https://www.lifelongindiaonline.com/cdn/shop/files/1_88ab00b6-9166-493b-9775-2d90ac286dba.jpg?v=1752144854', 120, '89.99', '74.99', '5.0', '2025-07-23 00:12:00', '2025-07-24 06:14:51', NULL),
(6, 'LEGO Classic', 'Creative building blocks for kids', 'https://m.media-amazon.com/images/I/91HNswR5tIL.jpg', 300, '49.99', '30.00', '5.0', '2025-07-22 18:42:30', '2025-07-25 03:42:22', NULL),
(7, 'Blender Pro 900', 'High-speed kitchen blender', 'https://www.rasoishop.com/cdn/shop/products/NB9-1249ABG-1.jpg?v=1681147882', 80, '99.99', '89.99', '4.0', '2025-07-23 00:13:00', '2025-07-24 06:15:51', NULL),
(8, 'Ergonomic Chair', 'Adjustable office chair with lumbar support', 'https://m.media-amazon.com/images/I/71m901lXArL._UF894,1000_QL80_.jpg', 60, '199.99', '169.99', '4.0', '2025-07-23 00:13:30', '2025-07-24 06:15:56', NULL),
(9, 'Face Serum Vitamin C', 'Brightening serum for skin', 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/14172246/2025/5/20/8ee1b2ec-3de7-46f7-99a2-e69f1105979f1747737291560-Garnier-Bright-Complete-30X-Vitamin-C-Face-Serum---Reduces-S-1.jpg', 150, '24.99', '0.00', '5.0', '2025-07-22 18:44:00', '2025-07-29 05:50:53', NULL),
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
(1, 'alice@example.com', 'admin'),
(2, 'rohan@example.com', 'user'),
(3, 'priya@example.com', 'sm'),
(4, 'suresh@example.com', 'user'),
(5, 'meena@example.com', 'qa'),
(6, 'vikram@example.com', 'user'),
(7, 'kavita@example.com', 'user'),
(8, 'amit@example.com', 'admin'),
(9, 'neha@example.com', 'user'),
(10, 'rajiv@example.com', 'sm'),
(11, 'divya@example.com', 'user'),
(12, 'tarun@example.com', 'qa'),
(13, 'anjali@example.com', 'user'),
(14, 'nikhil@example.com', 'user'),
(15, 'sneha@example.com', 'user'),
(213, 'harsh@gmail.com', 'sm');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticket_id` int(11) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `status` enum('backlog','to_do','in_progress','on_hold','review','done') NOT NULL DEFAULT 'backlog',
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticket_id`, `subject`, `status`, `last_updated`, `created_at`) VALUES
(87, 'UI check', 'in_progress', '2025-07-29 11:05:36', '2025-07-24 22:39:01'),
(88, 'Cart Data insert', 'done', '2025-07-30 05:20:50', '2025-07-25 04:11:11'),
(89, 'Checkout page dynamic Data', 'done', '2025-08-04 09:06:50', '2025-07-24 17:11:11'),
(90, 'Checkout - Payment Menthod', 'done', '2025-08-04 12:16:56', '2025-07-24 11:42:51'),
(91, 'Login + Cart + Store Data', 'done', '2025-07-30 06:34:58', '2025-07-24 22:42:51'),
(92, 'Cart Insert, update - Node API ', 'done', '2025-07-30 05:39:07', '2025-07-24 23:55:07'),
(93, 'Ticket Page - Description and Time -- Field add', 'to_do', '2025-08-08 11:16:03', '2025-07-24 18:30:38'),
(94, 'Encrypt and Decrypt Password Node, Mysql', 'done', '2025-07-30 07:12:19', '2025-07-24 20:26:27'),
(96, 'Single Product page create', 'backlog', '2025-07-30 07:31:33', '2025-07-29 18:20:39'),
(97, 'Cart - Total Cart qty show at top', 'in_progress', '2025-07-30 06:35:41', '2025-07-30 00:10:04'),
(98, 'Checkout - Database', 'in_progress', '2025-08-04 12:17:01', '2025-07-30 01:06:31'),
(99, 'Admin Auth login', 'in_progress', '2025-08-04 07:06:13', '2025-08-04 01:36:05'),
(100, 'After Checkout Invoice  ', 'done', '2025-08-04 12:17:10', '2025-08-04 03:40:11'),
(101, 'Invoice Page create', 'done', '2025-08-04 12:16:40', '2025-08-04 06:10:36'),
(102, 'Invoice Page Dynamic content', 'done', '2025-08-04 12:16:50', '2025-08-04 06:10:55'),
(103, 'Checkout - after checkout database null', 'backlog', '2025-08-04 12:18:20', '2025-08-04 12:18:20'),
(104, 'Database - Invoice', 'review', '2025-08-08 10:19:17', '2025-08-04 06:48:37'),
(105, 'Invoice dynamic Data as per checkout details', 'review', '2025-08-13 12:32:26', '2025-08-04 23:53:18'),
(106, 'Database - Invoice, invoice_items CRUD opration (Frontend- Backend)', 'review', '2025-08-08 10:19:22', '2025-08-04 23:53:55'),
(107, 'Invoice - All Invoice Show', 'in_progress', '2025-08-13 12:32:00', '2025-08-08 04:14:28'),
(108, 'Contact - Admin All Messages Show', 'review', '2025-08-08 10:19:07', '2025-08-08 04:14:59'),
(109, 'Contact - create new form - id not send issue', 'review', '2025-08-12 09:45:56', '2025-08-07 23:18:58'),
(110, 'Login data Store in localsystems	', 'done', '2025-08-12 09:33:46', '2025-08-12 09:33:46'),
(111, 'Contact API - FrontEnd', 'backlog', '2025-08-12 11:32:28', '2025-08-12 11:32:28'),
(112, 'Invoice - Reorder Same Product after failed by server issue ', 'backlog', '2025-08-12 11:40:08', '2025-08-12 11:40:08'),
(113, 'All Invoice - Click on any invoice redirect to single invoice   ', 'backlog', '2025-08-13 12:19:43', '2025-08-13 12:19:43');

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
(1, 'Alice Verma', 'alice@example.com', '$2b$10$rpTKt0nXP4UYsuNz0q.3meNVWOhU3U49iNCyqjIl4SbgPVtQuvmBi', '$2b$10$rpTKt0nXP4UYsuNz0q.3meNVWOhU3U49iNCyqjIl4SbgPVtQuvmBi', 9876543210, 'Mumbai, India', '2025-08-05 05:48:50'),
(2, 'Rohan Mehta', 'rohan@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543211, 'Pune, India', '2025-07-30 07:07:42'),
(3, 'Priya Kapoor', 'priya@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543212, 'Delhi, India', '2025-07-30 07:07:42'),
(4, 'Suresh Nair', 'suresh@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543213, 'Chennai, India', '2025-07-30 07:07:42'),
(5, 'Meena Joshi', 'meena@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543214, 'Ahmedabad, India', '2025-07-30 07:07:42'),
(6, 'Vikram Patel', 'vikram@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543215, 'Hyderabad, India', '2025-07-30 07:07:42'),
(7, 'Kavita Rao', 'kavita@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543216, 'Bangalore, India', '2025-07-30 07:07:42'),
(8, 'Amit Shah', 'amit@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543217, 'Jaipur, India', '2025-07-30 07:07:42'),
(9, 'Neha Kulkarni', 'neha@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543218, 'Kolkata, India', '2025-07-30 07:07:42'),
(10, 'Rajiv Menon', 'rajiv@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543219, 'Nagpur, India', '2025-07-30 07:07:42'),
(11, 'Divya Singh', 'divya@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543220, 'Patna, India', '2025-07-30 07:07:42'),
(12, 'Tarun Saini', 'tarun@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543221, 'Indore, India', '2025-07-30 07:07:42'),
(13, 'Anjali Gupta', 'anjali@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543222, 'Lucknow, India', '2025-07-30 07:07:42'),
(14, 'Nikhil Rathi', 'nikhil@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543223, 'Chandigarh, India', '2025-07-30 07:07:42'),
(15, 'Sneha Dixit', 'sneha@example.com', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', '$2b$10$FzYcUefPl1vxOPBvSRK3dOkt3z1ru0H6NqluOx6nhJ4cqxkLDWRnW', 9876543224, 'Bhopal, India', '2025-07-30 07:07:42'),
(213, 'Harsh Patel', 'harsh@gmail.com', '$2b$10$2CiBEMqt1yUEEh0Wq9GvMehDu7FBDcb5FDIsekE0WYOQLvNi9liEa', 'harsh123', 9876543210, 'Mumbai, India', '2025-07-30 07:04:43'),
(214, 'John Doe', 'john@example.com', 'hashed_password', 'hashed_password', 9876543210, '123 Main St, City', '2025-08-04 12:37:19');

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
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `fk_contacts_users` (`user_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
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
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1028;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

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
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `fk_contacts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

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
