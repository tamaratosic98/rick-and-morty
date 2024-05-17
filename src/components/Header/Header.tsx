import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Flex, Image } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSideMenuHandler = () => setIsMenuOpen(!isMenuOpen);

  const closeSideMenuHandler = () => setIsMenuOpen(false);

  const routes = [
    {
      title: 'Favorites',
      to: '/favorites',
    },
    {
      title: 'Log out',
      to: '/sign-in',
      state: { signOut: true },
    },
  ];
  return (
    <Flex className="bg-slate-300 h-20 px-2" justify="space-between" align="center">
      <Flex align="center" justify="space-between" className="flex-1">
        <Link to="/">
          <Flex gap="small" justify="center" align="center">
            <Image src="https://www.pngall.com/wp-content/uploads/4/Rick-And-Morty.png" width={50} preview={false} />
            <Image
              className="logo-text"
              src="https://i.pinimg.com/originals/1d/64/5d/1d645dd02dc5f6aaaa494ae2f80691bb.png"
              width={120}
              preview={false}
            />
          </Flex>
        </Link>
        <Flex gap="large" className={isMenuOpen ? 'menu-options active ' : 'menu-options'}>
          {routes.map(route => {
            return (
              <Flex key={route.to} align="center" justify="center" className="uppercase" onClick={closeSideMenuHandler}>
                <Link className="hover:text-white font-semibold text-slate-600" to={route.to} state={route.state}>
                  {route.title}
                </Link>
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <Flex className="mobile-menu" onClick={toggleSideMenuHandler}>
        {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </Flex>
    </Flex>
  );
};
