create table users(
	id int(10) unsigned NOT NULL AUTO_INCREMENT,
    username varchar(50) ,
    email varchar(100),
    userpassword varchar(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    UNIQUE KEY users_email_unique (email)
) ENGINE=INNODB DEFAULT CHARACTER set=utf8