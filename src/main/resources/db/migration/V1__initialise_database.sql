CREATE TABLE `label` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `configuration_item_template` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4b9uhean9s50sowy3jt6ax59k` (`parent_id`),
  CONSTRAINT `FK4b9uhean9s50sowy3jt6ax59k` FOREIGN KEY (`parent_id`) REFERENCES `configuration_item_template` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `configuration_item_template_labels` (
  `configuration_item_template_id` bigint(20) NOT NULL,
  `labels_id` bigint(20) NOT NULL,
  PRIMARY KEY (`configuration_item_template_id`,`labels_id`),
  KEY `FKsdhmcq52e73afytbwnd2csddr` (`labels_id`),
  CONSTRAINT `FKgbmx26khnhec26u9oa92vbmxm` FOREIGN KEY (`configuration_item_template_id`) REFERENCES `configuration_item_template` (`id`),
  CONSTRAINT `FKsdhmcq52e73afytbwnd2csddr` FOREIGN KEY (`labels_id`) REFERENCES `label` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `configuration_item_instance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_created` tinyblob,
  `date_modified` tinyblob,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `template_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk86mgyxmbamf2316ha8xbmiau` (`parent_id`),
  KEY `FKrwa3lxgq9r64vv1hejd462kms` (`template_id`),
  CONSTRAINT `FKk86mgyxmbamf2316ha8xbmiau` FOREIGN KEY (`parent_id`) REFERENCES `configuration_item_instance` (`id`),
  CONSTRAINT `FKrwa3lxgq9r64vv1hejd462kms` FOREIGN KEY (`template_id`) REFERENCES `configuration_item_template` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


