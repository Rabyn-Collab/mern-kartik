import { UserIcon, SettingsIcon, BellIcon, LogOutIcon, CreditCardIcon } from 'lucide-react'

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

const listItems = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
  {
    icon: SettingsIcon,
    property: 'Settings'
  },
  {
    icon: CreditCardIcon,
    property: 'Billing'
  },
  {
    icon: BellIcon,
    property: 'Notifications'
  },
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
]




export default function UserDropDown({ user }) {
  const nav = useNavigate();
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
          {listItems.map((item, index) => (
            <DropdownMenuItem
              onClick={() => {
                switch (item.property) {
                  case 'Profile':
                    nav('/profile');

                    break;
                  case 'Settings':
                    break;
                  case 'Billing':
                    break;
                  case 'Notifications':
                    break;
                  case 'Sign Out':
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


