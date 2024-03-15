-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 05, 2024 lúc 08:03 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `cdrnew`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `filecsvass7`
--

CREATE TABLE `filecsvass7` (
  `ID` varchar(50) NOT NULL,
  `CallID` varchar(100) NOT NULL,
  `SIPCallID` varchar(100) NOT NULL,
  `TimeStart` varchar(60) NOT NULL,
  `TimeConnect` varchar(60) NOT NULL,
  `TimeEnd` varchar(60) NOT NULL,
  `Status` int(30) NOT NULL,
  `AccountCode` varchar(40) NOT NULL,
  `AccountName` varchar(40) NOT NULL,
  `DialledNumber` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


--
-- Đang đổ dữ liệu cho bảng `filecsvass7`
--

INSERT INTO `filecsvass7` (`ID`, `CallID`, `SIPCallID`, `TimeStart`, `TimeConnect`, `TimeEnd`, `Status`, `AccountCode`, `AccountName`, `DialledNumber`) VALUES
('25681', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', 0),
('25683', 'cc2ftistg-374f8711e37ab55e', 'cs1ftistg-a6d9c24156a8c8a3', '1706864429481', '1706864436751', '1706864451315', 200, '533', '153004638900', 0),
('25685', 'cc1ftistg-8d9050ddff71ac70', 'cs1ftistg-f588362bf2942f6a', '1706864595311', '1706864613077', '1706864619819', 200, '534', '153004638900', 0),
('25681', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', 0),
('25683', 'cc2ftistg-374f8711e37ab55e', 'cs1ftistg-a6d9c24156a8c8a3', '1706864429481', '1706864436751', '1706864451315', 200, '533', '153004638900', 0),
('25685', 'cc1ftistg-8d9050ddff71ac70', 'cs1ftistg-f588362bf2942f6a', '1706864595311', '1706864613077', '1706864619819', 200, '534', '153004638900', 0),
('25681', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', 916009329),
('25683', 'cc2ftistg-374f8711e37ab55e', 'cs1ftistg-a6d9c24156a8c8a3', '1706864429481', '1706864436751', '1706864451315', 200, '533', '153004638900', 353293254),
('25685', 'cc1ftistg-8d9050ddff71ac70', 'cs1ftistg-f588362bf2942f6a', '1706864595311', '1706864613077', '1706864619819', 200, '534', '153004638900', 353293254);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



