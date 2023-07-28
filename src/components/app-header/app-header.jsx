import headerStyle from './app-header.module.css'

import { Logo, BurgerIcon, ListIcon, ProfileIcon, Box } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink, useMatch } from 'react-router-dom';


function AppHeader() {
  const style = ({ isActive }) =>
    isActive
      ? `${headerStyle.nav_link} ${headerStyle.nav_link_active} text_type_main-default pl-2`
      : `${headerStyle.nav_link} text_type_main-default  text_color_inactive pl-2`;
  const linkToHome = useMatch("/");
  const linkToFeed = useMatch("/feed");
  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.nav_links}>
        <NavLink to={{ pathname: "/" }} className={style}>
          {linkToHome ? (
            <BurgerIcon type={"primary"} />
          ) : (
            <BurgerIcon type={"secondary"} />
          )}
          Конструктор
        </NavLink>
        <NavLink to={{ pathname: "/feed" }} className={style}>
          {linkToFeed ? (
            <ListIcon type={"primary"} />
          ) : (
            <ListIcon type={"secondary"} />
          )}
          Лента заказов
        </NavLink>

      </div>
      <a href='#' className={headerStyle.logo}>
        <Logo />
      </a>

      <Link className={headerStyle.nav_link} to='/profile/profile'>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-small text_color_inactive">
          Личный кабинет
        </p>
      </Link>

    </div>
  );
}

export default AppHeader 