-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 17, 2023 lúc 11:23 AM
-- Phiên bản máy phục vụ: 10.4.20-MariaDB
-- Phiên bản PHP: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `taichinh`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hopdongvay`
--

CREATE TABLE `hopdongvay` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `money` int(11) NOT NULL,
  `time` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `ngayvay` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `chuky` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `hopdongvay`
--

INSERT INTO `hopdongvay` (`id`, `userid`, `money`, `time`, `ngayvay`, `chuky`, `created_at`, `updated_at`, `status`) VALUES
(1, 2, 2000000, '12', '1691655966223', '', '2023-08-10 15:26:06', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phone` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cmnd` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_cmnd` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nghe` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thu_nhap` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `muc_dich` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sdt_than` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moi_qh` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ten_huong` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tien_du` int(11) NOT NULL DEFAULT 0,
  `stk` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ten_ngan_hang` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_truoc` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_sau` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chan_dung` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `phone`, `password`, `name`, `address`, `cmnd`, `date_cmnd`, `sex`, `birthday`, `nghe`, `thu_nhap`, `muc_dich`, `sdt_than`, `moi_qh`, `ten_huong`, `tien_du`, `stk`, `ten_ngan_hang`, `image_truoc`, `image_sau`, `chan_dung`, `level`, `status`, `created_at`) VALUES
(1, '0914d339536', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', 0, '', '', '', '', '', 0, 1, '2023-08-08 15:46:39'),
(2, '0914339536', 'e10adc3949ba59abbe56e057f20f883e', 'af', 'f', 'af', 'fa', 'f', 'f', 'ff', 'f', 'f', 'ư', 'f', 'tttt', 0, 'dang', 'xxx', '1691652381997-3c8450dd831f5041090e.jpg', '1691652398784-363660518_992437521957827_1730164058194482976_n.jpg', '1691652391534-3c8450dd831f5041090e.jpg', 0, 1, '2023-08-08 15:52:04');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `hopdongvay`
--
ALTER TABLE `hopdongvay`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `hopdongvay`
--
ALTER TABLE `hopdongvay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
