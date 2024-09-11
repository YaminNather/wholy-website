# EatWholy eCommerce Website
<img src="readme_images/home_page_hero_section.png" style="border-radius: 8px" />

<div style="text-align: center; font-weight: bold;">
    <p>Preview website using a live url</p>
    <a href="https://wholy-website.vercel.app" style="font-size: 32px;">
        https://wholy-website.vercel.app
    </a>
</div>

## Table of Contents
- Introduction
- Technology Stack
- Installation
- Screenshots

## Introduction
Welcome to [Your Brand Name], the home of handcrafted cookies infused with the irresistible flavors of blueberry, pineapple, strawberry, and fig. Our cookies are baked fresh with the finest ingredients to deliver a delightful balance of natural fruit sweetness and rich, satisfying taste. 

Whether you're a fan of bold berry notes or tropical vibes, our unique cookies are the perfect treat for any occasion. Enjoy the convenience of ordering online and having these delicious fruit-filled cookies delivered right to your door!

## Technology Stack
- Frontend: NextJs, ReactJS, TSX, SCSS. 
- Backend: NodeJS, MedusaJS.
- File Storage: AWS S3.
- Payment Processor: Stripe.

## Screenshots
<img  src="readme_images/home_page_story_section.png" style="border-radius: 8px" />

<img src="readme_images/call_to_action_section.png" style="border-radius: 8px" />

<img src="readme_images/products_page_main_section.png" style="border-radius: 8px" />

<img src="readme_images/products_page_ingredients_section.png" style="border-radius: 8px" />

## Installation
Open your preferred terminal and clone the project to your device using

```sh
git clone https://github.com/YaminNather/wholy-website.git
```

Navigate into the project using
```sh
cd "<project_directory>"
```

Copy the .env.local.template file 
```sh
cp "./.env.local.template" ".env.local"
```

Set the required environment variables needed to interact with the other services.

If you want to start the website in Development mode, run 

```sh
npm run dev
```

If you want ot start the website in Production mode, first build the project and then start the server using
```sh
npm run build
npm run start
```