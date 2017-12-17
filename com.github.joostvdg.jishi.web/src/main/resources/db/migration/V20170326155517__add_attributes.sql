CREATE TABLE `template_attribute` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `key` varchar(64) NOT NULL,
  `value` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `value_type` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE(`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `attribute` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `key` varchar(64) NOT NULL,
  `value` varchar(255) NOT NULL,
  `template_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4ab3LEd3BHHAib0dRy8iUTwU` (`template_id`),
  CONSTRAINT `FK4ab3LEd3BHHAib0dRy8iUTwU` FOREIGN KEY (`template_id`) REFERENCES `template_attribute` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;