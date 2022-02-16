# GEOGO Full Stack Web Internship Amazon Clone APIs

Hey, let's make this repo all much rich as possible by contributing more endpoints. Follow the contribution guidelines, make open source contributions and make your github profile to standout. Check the Postman collection attached in this repo, this would help you to test API endpoints.

## API Index

### Category

- [x] API for listing all categories - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/categories`
- [x] Create new category - <span style="background-color:green"> &nbsp;<span style="background-color:green"> &nbsp;POST </span> &nbsp; </span> &nbsp; `/categories`
- [x] View category details - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/categories/:id`
- [x] List categorywise products - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/categories/:id/products`
- [x] Update category - <span style="background-color:#8bc34a"> &nbsp;PATCH </span> &nbsp; `/categories/:id`
- [x] Delete a category - <span style="background-color:red"> &nbsp;DELETE </span> &nbsp; `/categories/:id`

#### Scope of Development

- Upload category images

### Product

- [x] API for listing all products - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/products`
- [x] Create new product - <span style="background-color:green"> &nbsp;POST </span> &nbsp; `/products`
- [x] View product details - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/products/:id`
- [x] Update product - <span style="background-color:#8bc34a"> &nbsp;PATCH </span> &nbsp; `/products/:id`
- [x] Delete a product - <span style="background-color:red"> &nbsp;DELETE </span> &nbsp; `/products/:id`

#### Scope of Development - Product reviews & ratings

_authentication(auth-token in request header)-login required_

- [x] Place review - <span style="background-color:green"> &nbsp;POST </span> &nbsp; `/review/placereview`
- [x] View user's reviews - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/review/user/:id`
- [x] View product's reviews - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/review/product/:id`
- [x] Update a review - <span style="background-color:#8bc34a"> &nbsp;PATCH </span> &nbsp; `/review/:id`
- [x] Delete a review - <span style="background-color:red"> &nbsp;DELETE </span> &nbsp; `/review/:id`

### User

Users can signup to this application using email and password.
**User** model has the following attributes: _email (type: string), password (type: string), address(type: string)._
Have used JWT for user authentication module in this project and have hashed password with salt to store securly in the database. Also JSON request body validations are provided in the setup.

- [x] API for user signup - <span style="background-color:green"> &nbsp;POST </span> &nbsp; `/auth/createUser`
- [x] API for user signin - <span style="background-color:green"> &nbsp;POST </span> &nbsp; `/auth/login`
- [x] API to get user details - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/auth/getUser` <em>authentication(auth-token in request header) required</em>
- [x] API to update user details - <span style="background-color:#8bc34a"> &nbsp;PATCH </span> &nbsp; `/auth/updateUser` <em>authentication(auth-token in request header) required</em>
- [x] API for user signout - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/auth/logout` <em>authentication(auth-token in request header) required</em>
- [x] API to get username from DB's document \_id - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/auth/getUsername/:id` <em>To display usernames for public reviews on products</em>

### Banner

Banners are image sliders that are present in amazon homepage.
**Banner** model should have the following attributes: _bannerImage, isActive (type: boolean), linkedToUrl (type: string)_.

- [x] API for listing all active banners - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/banner`
- [x] Create new banner - <span style="background-color:green"> &nbsp;POST </span> &nbsp; `/banner/createBanner`
- [x] Get a specific banner - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/banner/:id`
- [x] Update banner - <span style="background-color:#8bc34a"> &nbsp;PATCH </span> &nbsp; `/banner/:id`
- [x] Delete a banner - <span style="background-color:red"> &nbsp;DELETE </span> &nbsp; `/banner/:id`

### Order

Users can place orders for multiple products which are saved in the user's cart on the frontend part which can be retained at login. **Order** model has the following attributes: _user (ref), orderItems (array of items), quantity (Number), status (pending, confirmed, shipped, delivered, cancelled), orderItemTotal, discount, shipping, grandTotal (Number), paymentMode (cod, card, online etc.), paidAmount (Number, Will be filled once payment made)_.

_authentication(auth-token in request header)-login required_

- [x] API for listing all orders of an user - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/order`
- [x] Create new order - <span style="background-color:green"> &nbsp;POST </span> &nbsp; `/order/placeOrder`
- [x] View order details - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/order/:id`
- [x] Update an order - <span style="background-color:#8bc34a"> &nbsp;PATCH </span> &nbsp; `/order/:id`
- [x] Cancel an Order - <span style="background-color:red"> &nbsp;DELETE </span> &nbsp; `/order/:id`

### Confirmed Order

Multiple saved products in the cart together bought at the final checkout are merged together in an array as a single order document with grandTotal. **ConfirmedOrder** model has the following attributes: _user (ref), order (array of ordered product ids), shippingAddress, paymentMode (cod, card, online etc.), paidAmount (Number, Will be filled once payment made)_.

_authentication(auth-token in request header)-login required_

- [x] Place the final confirmed order - <span style="background-color:green"> &nbsp;POST </span> &nbsp; `/order/confirmOrder`
- [x] Get previous comfirmed order history of an user - <span style="background-color:blue"> &nbsp;GET </span> &nbsp; `/order/confirmedOrder`
- [x] Deprevate an order from the history - <span style="background-color:red"> &nbsp;DELETE </span> &nbsp; `/order/confirmedOrder/:id`

## How to Contribute

- Make sure you understand the requirement well.
- Fork this repository to your github account.
- Do the changes and create a Pull Request.
- Remember the PR should have clean code, proper comments, proper commits with messages.
- Many others can also make PR, but the most complete one will be merged.
- You can also create PR for this Readme, if you have any relevant module in mind for this repo, to make it even more awesome!!
