# AZZID RENTCAR

Static rental car website and admin dashboard demo.

## Project Structure

```text
index.html                 # Main entry point and shared application shell
assets/
  css/
    custom.css             # Custom styles and animations
  js/
    app.js                 # Script loader
    tailwind.config.js     # Tailwind CDN configuration
routing/
  data.js                  # Demo data, persistence, and application state
  utils.js                 # Helpers, icons, and shared UI utilities
  crud.js                  # Customer views, booking flow, admin views, and CRUD actions
images/                    # Website and vehicle images
modules/                   # Standalone feature pages and module directory
  index.html               # Module directory
  landing.html             # Landing module example
  dashboard.html           # Dashboard module example
  mobil.html               # Fleet management module example
  customer.html            # Customer management module example
  rental.html              # Rental management module example
content/                   # Reserved for reusable content fragments
```

## Running

Open `index.html` in a browser or serve the project with a local static server. The app uses the Tailwind CDN and Fontsource CDN, so an internet connection is required for the utility classes and fonts.

The demo stores application data in browser `localStorage`.
