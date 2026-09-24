# Caperino Furnitures & Interiors &ndash; Shopify Theme (Online Store 2.0)

A bespoke, production-ready **Shopify Online Store 2.0 Theme** created for **Caperino Furnitures & Interiors**, blending handcrafted luxury aesthetics, editorial layouts, warm neutral palette, and native Shopify e-commerce infrastructure.

---

## 1. Verified Business Profile

* **Business Name:** Caperino Furnitures & Interiors
* **Business Category:** Furniture & Interior
* **Showroom & Workshop Location:** Main Vehari Road, near Chungi No. 22, Timber Market, Multan, Punjab, Pakistan
* **Phone / Direct WhatsApp:** +92 300 9630392

> **Note on Information Authenticity:** In accordance with instructions, only verified business details provided above are referenced. No email addresses, social accounts, customer counters, or awards have been fabricated. Real products, prices, variants, policies, and inventory are managed directly through Shopify Admin.

---

## 2. Theme Architecture & File Directory

This theme follows the strict **Shopify Online Store 2.0** specification with JSON templates, modular sections, reusable Liquid snippets, and vanilla JavaScript (zero heavy external dependencies).

```text
caperoino/
├── .shopifyignore                      # Files excluded when deploying with Shopify CLI
├── README.md                           # Merchant deployment guide & metafield specifications
├── caperino-furniture-shopify-theme.zip # Ready-to-upload Shopify theme archive
├── assets/
│   ├── theme.css                       # Luxury typography, warm neutral palette & responsive grid
│   ├── theme.js                        # Sticky header, mobile nav drawer, accordions & toasts
│   ├── cart-drawer.js                  # Shopify AJAX cart API (/cart/add.js, /cart/change.js)
│   ├── predictive-search.js            # Debounced native Shopify search suggestions (/search/suggest.json)
│   ├── wishlist.js                     # LocalStorage-backed client wishlist with live counters
│   ├── quick-view.js                   # Product quick preview modal (/products/{handle}.js)
│   └── product-gallery.js              # PDP gallery thumbnail switcher and desktop hover zoom
├── config/
│   ├── settings_schema.json            # Customizer settings (Brand, Colors, Socials, Cart)
│   └── settings_data.json              # Default store configuration values
├── demo-data/
│   └── caperino-products-import.csv    # 15 realistic demo furniture products ready for Shopify Import
├── layout/
│   ├── theme.liquid                    # Master layout with Google Fonts and modal overlays
│   └── password.liquid                 # Elegant coming-soon pre-launch layout
├── locales/
│   └── en.default.json                 # Standard English translation schema
├── preview/
│   └── index.html                      # Standalone interactive preview showcasing all pages & components
├── sections/
│   ├── announcement-bar.liquid         # Customizable top announcement banner
│   ├── header.liquid                   # Sticky header with desktop nav & mobile slide-out drawer
│   ├── hero-banner.liquid              # Large editorial hero with dual CTAs
│   ├── category-grid.liquid            # Shop by category visual grid (8 categories)
│   ├── featured-furniture.liquid       # Dynamic collection showcase
│   ├── living-room-section.liquid      # Editorial split showcase with subcategory pills
│   ├── bedroom-section.liquid          # Sanctuary & rest editorial showcase
│   ├── dining-section.liquid           # Dining & gathering editorial showcase
│   ├── home-decor-section.liquid       # Mirrors, vases, art & decor accents
│   ├── lighting-section.liquid         # Ambient dark luxe lighting showcase
│   ├── rugs-textiles-section.liquid    # Area rugs, runners & woven textiles
│   ├── interior-products-section.liquid# Acoustic slats, PVC, fluted wall panels
│   ├── editorial-banner.liquid         # "Make Your Space Your Own" full-width banner
│   ├── best-sellers.liquid             # Dynamic best-selling furniture
│   ├── why-shop-with-us.liquid         # Verified customer benefit blocks
│   ├── newsletter.liquid               # Native customer email subscription form
│   ├── footer.liquid                   # Complete footer with verified Multan business address
│   ├── cart-drawer.liquid              # Slide-out AJAX cart drawer with notes & direct checkout
│   ├── main-collection.liquid          # Collection grid with native storefront filters & sorting
│   ├── main-product.liquid             # PDP with image gallery, variant picker & dimensions
│   ├── main-cart.liquid                # Full-page cart template with delivery note field
│   ├── main-search.liquid              # Search results with query input & empty state
│   ├── main-page.liquid                # Standard policy / content page template
│   ├── main-contact.liquid             # Native contact form & verified showroom details
│   ├── main-about.liquid               # Verified brand story and location
│   ├── main-faq.liquid                 # Accordion FAQ with non-invented merchant policies
│   ├── main-services.liquid            # Interior design, custom sizing & space planning cards
│   ├── main-inspiration.liquid         # Curated room styling concept gallery
│   └── main-404.liquid                 # 404 error page with clear navigation links
├── snippets/
│   ├── product-card.liquid             # Reusable luxury card with hover image & quick actions
│   ├── product-variant-picker.liquid   # Swatch selector with real-time price & stock updates
│   ├── product-dimensions.liquid       # Dynamic Shopify Metafield dimensions & specs guide
│   ├── price.liquid                    # Currency formatting and compare-at sale badge
│   ├── pagination.liquid               # Semantic pagination controls
│   ├── quick-view-modal.liquid         # Quick view overlay container
│   └── seo-meta.liquid                 # Canonical URLs, title tags, and Open Graph tags
└── templates/
    ├── index.json                      # Homepage section hierarchy
    ├── collection.json                 # Collection page template
    ├── product.json                    # Product page template with recommendations
    ├── cart.json                       # Cart template
    ├── search.json                     # Search template
    ├── 404.json                        # 404 error template
    ├── page.json                       # Standard page template
    ├── page.about.json                 # About page
    ├── page.contact.json               # Contact page
    ├── page.faq.json                   # FAQ page
    ├── page.inspiration.json           # Inspiration page
    ├── page.services.json              # Services page
    ├── page.shipping-policy.json       # Shipping policy page
    ├── page.return-policy.json         # Return policy page
    ├── page.terms.json                 # Terms page
    ├── page.privacy-policy.json        # Privacy policy page
    └── customers/
        ├── account.liquid              # Customer dashboard with real order history
        ├── addresses.liquid            # Add, edit, and delete customer addresses
        ├── order.liquid                # Detailed order fulfillment & tracking view
        ├── login.liquid                # Customer sign-in & password recovery
        ├── register.liquid             # Customer account registration
        ├── reset_password.liquid       # Customer password reset
        └── activate_account.liquid     # Customer account activation
```

---

## 3. How to Install on Shopify

### Option A: Upload Zip (Fastest & Simplest)

1. Locate the file `caperino-furniture-shopify-theme.zip` generated in the root of this project.
2. In your **Shopify Admin**, navigate to:
   **Online Store &rarr; Themes**
3. In the **Theme library** section, click **Add theme &rarr; Upload zip file**.
4. Select `caperino-furniture-shopify-theme.zip`.
5. Once uploaded, click **Actions &rarr; Publish** (or click **Customize** to preview first).

### Option B: Using Shopify CLI

If you have the Shopify CLI installed on your machine:

```powershell
# Authenticate with your Shopify store
shopify theme dev --store your-store-name.myshopify.com

# Push directly to your theme library
shopify theme push --store your-store-name.myshopify.com
```

---

## 4. How to Import Demo Products

A complete catalog of 15 realistic furniture demo products is included in `demo-data/caperino-products-import.csv`.

1. Go to **Shopify Admin &rarr; Products**.
2. Click **Import** in the upper right.
3. Choose the file `demo-data/caperino-products-import.csv`.
4. Leave "Overwrite any current products that have the same handle" checked if re-importing.
5. Click **Upload and preview**, then click **Import products**.

All 15 products will immediately appear in your store with:
- High-resolution furniture photography
- Realistic PKR pricing (Rs. 14,500 &ndash; Rs. 165,000)
- Accurate variants (Wood Finishes, Sizes, Fabric Colors)
- Product tags (`Living Room`, `Bedroom`, `Dining`, `Lighting`, `Rugs`, `Interior`)

---

## 5. Shopify Metafields Configuration (Furniture Specifications & Dimensions)

This theme features dynamic rendering of furniture specifications. As instructed, **specifications are only rendered when real merchant data exists** in Shopify Admin.

To configure these metafield definitions in Shopify Admin:

1. Go to **Settings &rarr; Custom data &rarr; Products &rarr; Add definition**.
2. Create the following standard definitions under the `custom` namespace:

| Field Name | Namespace & Key | Type | Description |
| :--- | :--- | :--- | :--- |
| **Width** | `custom.width` | Single line text | e.g., `86 in` |
| **Height** | `custom.height` | Single line text | e.g., `32 in` |
| **Depth** | `custom.depth` | Single line text | e.g., `36 in` |
| **Weight** | `custom.weight` | Single line text | e.g., `62 kg` |
| **Primary Material** | `custom.material` | Single line text | e.g., `Solid Teak Hardwood` |
| **Finish** | `custom.finish` | Single line text | e.g., `Natural Walnut Stained` |
| **Recommended Room** | `custom.room` | Single line text | e.g., `Living Room / Lounge` |
| **Assembly Required** | `custom.assembly_required`| Single line text | e.g., `Minimal (Legs screw-on)` |
| **Care Instructions** | `custom.care_instructions`| Multi-line text | Cleaning and maintenance guidance |

When you edit any product in Shopify Admin, these fields appear at the bottom of the product form. If you fill them in, they automatically display in the elegant "Dimensions & Product Details" box on the product page. If left blank, the section remains hidden.

---

## 6. How to Set Up Navigation Menus

1. Go to **Online Store &rarr; Navigation &rarr; Main menu**.
2. Add links according to the store structure:
   - **Home** &rarr; `/`
   - **Shop** &rarr; `/collections/all`
   - **Furniture** &rarr; `/collections/furniture`
   - **Living Room** &rarr; `/collections/living-room`
   - **Bedroom** &rarr; `/collections/bedroom`
   - **Dining** &rarr; `/collections/dining`
   - **Home Decor** &rarr; `/collections/home-decor`
   - **Interior** &rarr; `/collections/interior-products`
   - **New Arrivals** &rarr; `/collections/new-arrivals`
   - **Contact** &rarr; `/pages/contact`

3. In **Footer menu**, add:
   - **Contact Us** &rarr; `/pages/contact`
   - **FAQ** &rarr; `/pages/faq`
   - **Interior Services** &rarr; `/pages/services`
   - **Design Inspiration** &rarr; `/pages/inspiration`
   - **Shipping Policy** &rarr; `/pages/shipping-policy`
   - **Return & Refund Policy** &rarr; `/pages/return-policy`

---

## 7. How to Create Shopify Pages

To create the custom editorial pages:

1. Go to **Online Store &rarr; Pages &rarr; Add page**.
2. Create:
   - Title: `About Us` &rarr; Theme template: `about`
   - Title: `Contact Us` &rarr; Theme template: `contact`
   - Title: `Frequently Asked Questions` &rarr; Theme template: `faq`
   - Title: `Interior Services` &rarr; Theme template: `services`
   - Title: `Design Inspiration` &rarr; Theme template: `inspiration`
   - Title: `Shipping Policy` &rarr; Theme template: `shipping-policy`
   - Title: `Return Policy` &rarr; Theme template: `return-policy`
3. Click **Save**.

---

## 8. Standalone Local Interactive Showcase

A complete local preview file is available in `preview/index.html`. You can open this file in any browser or launch a local server to inspect all sections, product cards, the AJAX cart drawer, the live predictive search overlay, wishlist functionality, and mobile drawer responsiveness before publishing.

---

## 9. Verification Checklist

* [x] **Store identity:** Exact verified name, Multan address, and phone number (+92 300 9630392) applied everywhere.
* [x] **Zero fabricated data:** No fake email addresses, false reviews, invented delivery guarantees, or mock claims.
* [x] **Online Store 2.0 Compliance:** Valid `templates/*.json`, modular sections, customizable blocks, and clean Liquid syntax.
* [x] **Real Shopify Integration:** Connects to native Shopify checkout (`/checkout`), customer accounts (`/account`), and real cart endpoints (`/cart/add.js`, `/cart/change.js`).
* [x] **Responsive & Accessible:** Fully responsive from 320px mobile to wide desktop, with keyboard navigation, ARIA landmarks, and focus rings.
