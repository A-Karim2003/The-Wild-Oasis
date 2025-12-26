# Hotel Management System

A comprehensive hotel management application built for internal staff use, enabling efficient management of cabins, bookings, guests, and daily operations with real-time dashboard analytics.

## Features

### Authentication & User Management

- Secure user login system for employees
- Internal user registration (existing users can create new accounts)
- Profile management with avatar upload
- Password and name update capabilities

### Cabin Management

- Visual table view of all cabins with photos
- Track cabin details: name, capacity, price, and discounts
- Full CRUD operations (Create, Read, Update, Delete)
- Photo upload support for cabin listings

### Booking System

- Comprehensive booking list with guest and cabin information
- Track arrival/departure dates, booking status, and payment amounts
- Filter bookings by status (Unconfirmed, Checked In, Checked Out)
- Detailed booking information including guest count, nights, observations, and breakfast options
- Check-in and check-out functionality
- Payment confirmation during check-in
- Breakfast upsell option during check-in process
- Booking deletion capability

### Guest Profiles

- Store complete guest information
- Track: full name, email, national ID, nationality
- Display country flags for visual identification

### Dashboard & Analytics

- Customizable date range views (7, 30, or 90 days)
- Real-time activity feed showing today's check-ins/check-outs
- Quick-action buttons for immediate tasks
- Key statistics: recent bookings, total sales, check-ins, occupancy rate
- Visual sales chart comparing total sales vs extras (breakfast)
- Stay duration statistics with visual charts

### Application Settings

- Configurable breakfast pricing
- Set minimum and maximum night stays
- Define maximum guests per booking

### User Experience

- Dark mode support
- Responsive design
- Intuitive navigation

## Tech Stack

- **Frontend Framework:** React
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **State Management:** Redux
- **Server State:** React Query (TanStack Query)
- **Forms:** React Hook Form
- **Icons:** React Icons
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Backend/Database:** Supabase
