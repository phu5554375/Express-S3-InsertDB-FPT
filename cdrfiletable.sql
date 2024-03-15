-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 05, 2024 lúc 10:56 AM
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
-- Cơ sở dữ liệu: `cdrfile`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cdrfiletable`
--

CREATE TABLE `cdrfiletable` (
  `ID` int (40) NOT NULL PRIMARY KEY,
  `CallID` varchar(100) NOT NULL,
  `SIPCallID` varchar(100) NOT NULL,
  `TimeStart` varchar(100) NOT NULL,
  `TimeConnect` varchar(100) NOT NULL,
  `TimeEnd` varchar(100) NOT NULL,
  `Status` int(30) NOT NULL,
  `AccountCode` varchar(100) NOT NULL,
  `AccountName` varchar(100) NOT NULL,
  `DialledNumber` varchar(100) NOT NULL,
  `OutboundNumber` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cdrfiletable`
--

INSERT INTO `cdrfiletable` (`ID`, `CallID`, `SIPCallID`, `TimeStart`, `TimeConnect`, `TimeEnd`, `Status`, `AccountCode`, `AccountName`, `DialledNumber`, `OutboundNumber`) VALUES
('35353', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', '0916009329', ''),
('35353', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', '0916009329', ''),
('25681', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', '0916009329', ''),
('25683', 'cc2ftistg-374f8711e37ab55e', 'cs1ftistg-a6d9c24156a8c8a3', '1706864429481', '1706864436751', '1706864451315', 200, '533', '153004638900', '0353293254', '0353293254'),
('25685', 'cc1ftistg-8d9050ddff71ac70', 'cs1ftistg-f588362bf2942f6a', '1706864595311', '1706864613077', '1706864619819', 200, '534', '153004638900', '0353293254', '0353293254'),
('25681', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', '0916009329', ''),
('25683', 'cc2ftistg-374f8711e37ab55e', 'cs1ftistg-a6d9c24156a8c8a3', '1706864429481', '1706864436751', '1706864451315', 200, '533', '153004638900', '0353293254', '0353293254'),
('25685', 'cc1ftistg-8d9050ddff71ac70', 'cs1ftistg-f588362bf2942f6a', '1706864595311', '1706864613077', '1706864619819', 200, '534', '153004638900', '0353293254', '0353293254'),
('', '', '', '1704425875895', '1704425895631', '1704425923144', 200, '', '', '916009329', '916009329'),
('', '', '', '1704427120977', '1704427129369', '1704427162012', 200, '', '', '353293254', '353293254'),
('', '', '', '1704425875895', '1704425895631', '1704425923144', 200, '', '', '916009329', '916009329'),
('', '', '', '1704427120977', '1704427129369', '1704427162012', 200, '', '', '353293254', '353293254'),
('25681', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', '0916009329', ''),
('25683', 'cc2ftistg-374f8711e37ab55e', 'cs1ftistg-a6d9c24156a8c8a3', '1706864429481', '1706864436751', '1706864451315', 200, '533', '153004638900', '0353293254', '0353293254'),
('25685', 'cc1ftistg-8d9050ddff71ac70', 'cs1ftistg-f588362bf2942f6a', '1706864595311', '1706864613077', '1706864619819', 200, '534', '153004638900', '0353293254', '0353293254'),
('25681', 'cc1ftistg-062db10301583e0f', 'cs1ftistg-e3014fff3266a181', '1706864405523', '0', '1706864409755', 487, '', '', '0916009329', ''),
('25683', 'cc2ftistg-374f8711e37ab55e', 'cs1ftistg-a6d9c24156a8c8a3', '1706864429481', '1706864436751', '1706864451315', 200, '533', '153004638900', '0353293254', '0353293254'),
('25685', 'cc1ftistg-8d9050ddff71ac70', 'cs1ftistg-f588362bf2942f6a', '1706864595311', '1706864613077', '1706864619819', 200, '534', '153004638900', '0353293254', '0353293254');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
