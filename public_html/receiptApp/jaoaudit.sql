
create database if not exists `jaoaudit`;

USE `jaoaudit`;


CREATE TABLE `receiptinfo` (
  `receiptID` varchar(10) NOT NULL,
  `vDate` date default NULL,
  `receivedfrom` varchar(50) default NULL,
  `companyrep` varchar(74) default NULL,
  `emailaddress` varchar(40) default NULL,
  `inthesumof` varchar(75) default NULL,
  `beingpaymentfor` varchar(75) default NULL,
  `amountinvolved` varchar(12) default NULL,
  PRIMARY KEY  (`receiptID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `users` (
  `vUserName` varchar(25) default NULL,
  `vPassword` varchar(25) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`vUserName`,`vPassword`) values ('falade','ajao');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;