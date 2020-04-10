CREATE TABLE `books` (
    `id` int auto_increment NOT NULL,
    `isbn` varchar(20) NOT NULL,
    `openid` varchar(50) NOT NULL,
    `title` varchar(100) NOT NULL,
    `image` varchar(100),
    `alt` varchar(100) NOT NULL,
    `publisher` varchar(100) NOT NULL,
    `summary` varchar(1000) NOT NULL,
    `price` varchar(100),
    `rate` float,
    `tags` varchar(100),
    `author` varchar(100),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='图书信息';


CREATE TABLE `comments` (
    `id` int auto_increment NOT NULL,
    `openid` varchar(100) NOT NULL,
    `bookid` varchar(10) NOT NULL,
    `comment` varchar(200) NOT NULL,
    `phone` varchar(50) NOT NULL,
    `location` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论信息';
