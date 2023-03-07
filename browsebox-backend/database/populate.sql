insert into browsebox.users(user_name, user_email, user_password) values ('admin', 'admin@browsebox.com', 'admin_password');
insert into browsebox.users(user_name, user_email, user_password) values ('meow', 'cats@gmail.com', 'meow');
insert into browsebox.users(user_name, user_email, user_password) values ('tom21', 'tom@outlook.com', 'password');

insert into browsebox.schools(school_name, school_link) values ('Southern Alberta Institute of Technology', 'https://www.sait.ca');
insert into browsebox.schools(school_name, school_link) values ('University of Calgary', 'https://www.ucalgary.ca');

insert into browsebox.reviews(reviewer, user_id, review_description, review_value) values (2, 1, 'What a great guy!', 5.00);
insert into browsebox.reviews(reviewer, user_id, review_description, review_value) values (3, 1, 'What an ok guy!', 4.00);

insert into browsebox.sales(owner, sale_name, sale_description, sale_price) values (2, 'Cat Toy', 'random cat toy', 258.34);
insert into browsebox.sales(owner, sale_name, sale_description, sale_price) values (3, 'Graphing Calculator', 'A new Graphing Calculator', 2.34);
insert into browsebox.sales(owner, sale_name, sale_description, sale_price) values (3, 'Pencil', 'Half-used pencil', 112.34);

insert into browsebox.categories(cat_name) values ('Calculator');
insert into browsebox.categories(cat_name) values ('Textbook');
insert into browsebox.categories(cat_name) values ('Stationary');
insert into browsebox.categories(cat_name) values ('Computer');
insert into browsebox.categories(cat_name) values ('Misc');

insert into browsebox.favorites(user_id, sale_id) values (1, 2);

insert into browsebox.tag_sales(cat_id, sale_id) values (1, 2);
insert into browsebox.tag_sales(cat_id, sale_id) values (3, 3);
insert into browsebox.tag_sales(cat_id, sale_id) values (5, 1);
