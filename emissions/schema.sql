drop table if exists data;
create table data (
	id integer primary key autoincrement,
	subregion text not null,
	rate float not null,
	lineloss float not null
	);
	
drop table if exists zipper;
create table zipper (
	id integer primary key autoincrement,
	zip text not null,
	subregion text not null
	);
	
