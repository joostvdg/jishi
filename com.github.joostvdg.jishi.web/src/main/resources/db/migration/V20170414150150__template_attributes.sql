CREATE TABLE `configuration_item_template_template_attributes` (
  `configuration_item_template_id` bigint(20) NOT NULL,
  `template_attributes_id` bigint(20) NOT NULL,
  PRIMARY KEY (`configuration_item_template_id`,`template_attributes_id`),
  CONSTRAINT `FKNyWsBNa7iHm6` FOREIGN KEY (`configuration_item_template_id`) REFERENCES `configuration_item_template` (`id`),
  CONSTRAINT `FK4nduaMR2y1Im` FOREIGN KEY (`template_attributes_id`) REFERENCES `template_attribute` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
