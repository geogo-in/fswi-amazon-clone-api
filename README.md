# GEOGO Full Stack Web Internship Amazon Clone APIs

Hey, let's make this repo all much rich as possible by contributing more endpoints. Follow the contribution guidelines, make open source contributions and make your github profile to standout. Check the Postman collection attached in this repo, this would help you to test API endpoints.

## API Index

### Category

- [x] API for listing all categories
- [x] Create new category
- [x] View category details
- [x] List all category products
- [x] Update category
- [x] Delete a category

#### Scope of Development

- Upload category images

### Product

- [x] API for listing all products
- [x] Create new product
- [x] View product details
- [x] Update product
- [x] Delete a product

#### Scope of Development

- Add reviews for products
- Add ratings for products

### User

Users can signup to this application using email and password.
**User** model should have the following attributes: _email (type: string), password (type: string), mobile_.
_Tip:_ Can use Passport and JWT for user authentication module.
Although have used JWT in this project.

- [x] API for user signup
- [x] API for user signin
- [x] API to get user details
- [x] API to update user details
- [x] API for user signout

### Order

Users can place orders for multiple products. **Order** model should have the following attributes: _user (ref), orderItems (array of items), serial (String), status (pending, confirmed, shipped, delivered, cancelled), orderItemTotal, discount, shipping, grandTotal (Number), paymentMode (cod, card, online etc.), paidAmount (Number, Should be filled once payment made)_.

- [x] API for listing all orders of an user
- [x] Create new order
- [x] View order details
- [x] Cancel an Order
- [x] Update an order

### Banner

Banners are image sliders that are present in amazon homepage.
**Banner** model should have the following attributes: _bannerImage (type: image), isActive (type: boolean), linkedToUrl (type: string)_.

- [x] API for listing all active banners
- [x] Create new banner
- [x] Get a specific banner
- [x] Update banner
- [x] Delete a banner

## How to Contribute

- Make sure you understand the requirement well.
- Fork this repository to your github account.
- Do the changes and create a Pull Request.
- Remember the PR should have clean code, proper comments, proper commits with messages.
- Many others can also make PR, but the most complete one will be merged.
- You can also create PR for this Readme, if you have any relevant module in mind for this repo, to make it even more awesome!!
