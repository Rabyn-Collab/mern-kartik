import { UserIcon, BellIcon, LogOutIcon, PanelBottomDashedIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGetProfileQuery } from './userApi.js'
import { base } from '../../app/mainApi.js'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { removeUser } from './userSlice.js'

const userItems = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
  {
    icon: BellIcon,
    property: 'Notifications'
  },
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
];

const adminItems = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
  {
    icon: PanelBottomDashedIcon,
    property: 'Admin Panel'
  },
  {
    icon: BellIcon,
    property: 'Notifications'
  },
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
];




export default function UserDropDown({ user }) {
  const menuItems = user.role === 'admin' ? adminItems : userItems;
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data, error } = useGetProfileQuery(user?.token);
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.data?.message}</p>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon' className='overflow-hidden rounded-full'>
          <img className='object-cover' src={`${base}/${data.image}`} alt='Hallie Richards' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              onClick={() => {
                switch (item.property) {
                  case 'Profile':
                    nav('/profile');

                    break;
                  case 'Admin Panel':
                    nav('/admin');
                    break;
                  case 'Billing':
                    break;
                  case 'Notifications':
                    break;
                  case 'Sign Out':
                    dispatch(removeUser());
                    break;
                  default:
                    break;
                }
              }}

              key={index}>
              <item.icon />
              <span className='text-popover-foreground'>{item.property}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


