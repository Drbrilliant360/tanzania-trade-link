# Tanzania Marketplace Hub

JengaHub Tanzania — Frontend Structure



1. Folder Structure

jengahub-frontend/
├── public/
│   ├── favicon.ico
│   └── logo.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx          # header + footer wrapper for public pages
│   │   ├── DashboardLayout.jsx     # sidebar wrapper for seller/professional/admin
│   │   └── AuthLayout.jsx          # centered card wrapper for login/signup
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   └── HomePage.jsx
│   │   ├── Marketplace/
│   │   │   ├── CategoryListingPage.jsx
│   │   │   └── SearchResultsPage.jsx
│   │   ├── Product/
│   │   │   ├── ProductDetailPage.jsx
│   │   │   └── EquipmentDetailPage.jsx
│   │   ├── Professionals/
│   │   │   ├── ProfessionalDirectoryPage.jsx
│   │   │   └── ProfessionalProfilePage.jsx
│   │   ├── Cart/
│   │   │   └── CartPage.jsx
│   │   ├── Checkout/
│   │   │   └── CheckoutPage.jsx
│   │   ├── Dashboard/
│   │   │   ├── SellerDashboardPage.jsx
│   │   │   ├── SellerProductsPage.jsx
│   │   │   ├── SellerOrdersPage.jsx
│   │   │   ├── SellerRentalsPage.jsx
│   │   │   ├── SellerWalletPage.jsx
│   │   │   └── SellerAddProductPage.jsx
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── SellerOnboardingPage.jsx
│   │   ├── Admin/
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminVerificationPage.jsx
│   │   │   └── AdminOrdersPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   ├── VerifiedBadge.jsx
│   │   │   ├── TrustBadgeRow.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductGallery.jsx
│   │   │   ├── ProductSpecsTable.jsx
│   │   │   └── ConditionBadge.jsx
│   │   ├── category/
│   │   │   ├── CategoryCard.jsx
│   │   │   └── CategoryGrid.jsx
│   │   ├── professional/
│   │   │   ├── ProfessionalCard.jsx
│   │   │   ├── PortfolioGrid.jsx
│   │   │   └── LicenseBadge.jsx
│   │   ├── filters/
│   │   │   ├── FilterSidebar.jsx
│   │   │   ├── PriceRangeFilter.jsx
│   │   │   └── LocationFilter.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   └── CartSummary.jsx
│   │   ├── checkout/
│   │   │   ├── DeliveryForm.jsx
│   │   │   ├── PaymentMethodSelect.jsx
│   │   │   └── EscrowNotice.jsx
│   │   ├── dashboard/
│   │   │   ├── StatCard.jsx
│   │   │   ├── SalesChart.jsx
│   │   │   ├── OrdersTable.jsx
│   │   │   ├── DashboardSidebar.jsx
│   │   │   └── AddProductForm.jsx
│   │   └── ai/
│   │       └── AIBuildingAssistantCard.jsx
│   │
│   ├── features/                    # optional: group by domain if app grows
│   │   ├── auth/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── rentals/
│   │   ├── professionals/
│   │   └── payments/
│   │
│   ├── services/
│   │   ├── api.js                   # axios instance + interceptors
│   │   ├── productService.js
│   │   ├── categoryService.js
│   │   ├── orderService.js
│   │   ├── authService.js
│   │   ├── professionalService.js
│   │   ├── paymentService.js        # M-Pesa / Airtel Money / Mixx by Yas / HaloPesa
│   │   └── aiAssistantService.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useFetch.js
│   │   └── useDebounce.js           # for search
│   │
│   ├── utils/
│   │   ├── formatCurrency.js        # TZS formatting
│   │   ├── constants.js             # categories, regions, delivery types
│   │   └── validators.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.js                 # brand colors from the Stitch style prompt
│   │
│   └── assets/
│       ├── icons/
│       └── images/
│
├── .env
├── package.json
└── vite.config.js


2. Route Map

Path Page Component Layout Notes / HomePage MainLayout Screen 1 /category/:slug CategoryListingPage MainLayout Screen 2 /search SearchResultsPage MainLayout Screen 8 /product/:id ProductDetailPage MainLayout Screen 3 /equipment/:id EquipmentDetailPage MainLayout Screen 4 /professionals ProfessionalDirectoryPage MainLayout listing of contractors/engineers /professionals/:id ProfessionalProfilePage MainLayout Screen 5 /cart CartPage MainLayout /checkout CheckoutPage MainLayout Screen 7 /login, /signup LoginPage, SignupPage AuthLayout /sell/onboarding SellerOnboardingPage AuthLayout seller/business/dealer registration /dashboard SellerDashboardPage DashboardLayout Screen 6 /dashboard/products SellerProductsPage DashboardLayout /dashboard/orders SellerOrdersPage DashboardLayout /dashboard/rentals SellerRentalsPage DashboardLayout equipment rental calendar /dashboard/products/new SellerAddProductPage DashboardLayout + Add Product form /admin AdminDashboardPage DashboardLayout role-gated /admin/verification AdminVerificationPage DashboardLayout seller/contractor license checks * NotFoundPage MainLayout

Protect /dashboard/* and /admin/* with a route guard reading AuthContext (role: buyer / seller / professional / admin).

3. State & Data Notes

AuthContext: current user, role, JWT token, login/logout/register — talks to Django's auth endpoints (matches your usual JWT pattern).

CartContext: cart items, quantities, persists to localStorage for guest carts, syncs to backend on login.

paymentService.js: one function per Tanzanian rail (payWithMpesa, payWithAirtelMoney, payWithMixxByYas, payWithHaloPesa) calling your Django endpoints that wrap Sonic Pesa/Africa's Talking.

constants.js: single source of truth for the 9 categories, the region list (Dar es Salaam, Arusha, Mwanza, Dodoma, Mbeya, Zanzibar, Kagera, Mtwara...), condition scale, and delivery types — used by both filters and the add-product form so they never drift out of sync.

ConditionBadge and LicenseBadge are the two verification-style components reused across product cards (Verified Seller / Trusted Store / Authorized Dealer) and professional cards (Licensed Contractor / Registered Engineer).

4. Suggested Build Order

MainLayout + Header/Footer + theme.js (lock in brand colors/typography first)

HomePage (Screen 1) — validates the component library end to end

CategoryListingPage + FilterSidebar + ProductCard/ProductGrid (Screen 2)

ProductDetailPage + EquipmentDetailPage (Screens 3–4)

Auth flow (LoginPage, SignupPage, AuthContext) — needed before cart/checkout can persist

CartPage → CheckoutPage (Screen 7) + paymentService

ProfessionalDirectoryPage + ProfessionalProfilePage (Screen 5)

SellerDashboardPage and children (Screen 6)

SearchResultsPage + AIBuildingAssistantCard (Screen 8) last, since it depends on most other components existing

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/820b375f-9fb6-493f-aee5-5a4f09d89936).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
