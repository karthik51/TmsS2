import { RouteInfo } from './sidebar.metadata';

export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: '/admin/view-all-bookings',
    title: 'View All Bookings',
    icon: 'mdi mdi-car',
    class: '',
    extralink: false,
    submenu: []
  }
];

export const EMPLOYEE_ROUTES: RouteInfo[] = [
  {
    path: '/employee/register-vehicle',
    title: 'Register your Vehicle',
    icon: 'mdi mdi-car',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/employee/confirm-ride',
    title: 'Confirm Ride',
    icon: 'mdi mdi-check-circle',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/employee/view-summary',
    title: 'View Summary',
    icon: 'mdi mdi-account-card-details',
    class: '',
    extralink: false,
    submenu: []
  }
];

export const CUSTOMER_ROUTES: RouteInfo[] = [
  {
    path: '/customer/book-a-ride',
    title: 'Book a Ride',
    icon: 'mdi mdi-car',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/customer/view-past-rides',
    title: 'View Past Rides',
    icon: 'mdi mdi-calendar-clock',
    class: '',
    extralink: false,
    submenu: []
  }
];
