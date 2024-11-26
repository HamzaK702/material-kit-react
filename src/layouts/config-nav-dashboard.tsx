import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Admins',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Pink Connect',
    path: '/pink-connect',
    icon: icon('ic-pinkConnect'),
  },
  {
    title: 'Red Flags',
    path: '/red-flags',
    icon: icon('ic-pinkConnect'),
  },
  {
    title: 'Mammomanual',
    path: '/mammomanual',
    icon: icon('ic-pinkConnect'),
  },
  {
    title: 'Pink Voice',
    path: '/pink-voice',
    icon: icon('ic-pinkConnect'),
  },
  {
    title: 'Video',
    path: '/video',
    icon: icon('ic-pinkConnect'),
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
