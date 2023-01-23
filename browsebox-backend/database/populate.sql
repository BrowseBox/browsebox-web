insert into users(user_id, user_name, user_email, user_rating, user_password) values (1, 'admin', 'admin@browsebox.com', 5.00, 'admin_password');
insert into users(user_id, user_name, user_email, user_rating, user_password) values (2, 'meow', 'cats@gmail.com', 3.73, 'meow');
insert into users(user_id, user_name, user_email, user_rating, user_password) values (3, 'tom21', 'tom@outlook.com', 2.98, 'password');

insert into schools(school_id, school_name, school_link) values (1, 'Southern Alberta Institute of Technology', 'https://www.sait.ca');
insert into schools(school_id, school_name, school_link) values (2, 'University of Calgary', 'https://www.ucalgary.ca');

insert into reviews(review_id, reviewer, user_id, review_description, review_value) values (20584, 2, 1, 'This was great!', 5.00);

insert into sales(sale_id, owner, sale_description, sale_price) values (1, 2, 'random cat toy', 258.34);
insert into sales(sale_id, owner, sale_description, sale_price) values (2, 3, 'Graphing Calculator', 2.34);
insert into sales(sale_id, owner, sale_description, sale_price) values (3, 3, 'Pencil', 112.34);

insert into categories(cat_id, cat_name) values (1, 'Calculator');
insert into categories(cat_id, cat_name) values (2, 'Textbook');
insert into categories(cat_id, cat_name) values (3, 'Stationary');
insert into categories(cat_id, cat_name) values (4, 'Computer');
insert into categories(cat_id, cat_name) values (5, 'Misc');

insert into favorites(user_id, sale_id) values (1, 2);

insert into tag_sales(cat_id, sale_id) values (1, 2);
insert into tag_sales(cat_id, sale_id) values (3, 3);
insert into tag_sales(cat_id, sale_id) values (5, 1);
