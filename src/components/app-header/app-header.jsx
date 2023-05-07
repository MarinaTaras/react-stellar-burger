import headerStyle from './app-header.module.css'

import { Logo, BurgerIcon, ListIcon, ProfileIcon, Box } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.nav_links}>
        <a href='#' className={headerStyle.nav_link}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-small">
            Конструктор
          </p>
          <p></p>
        </a>
        <a href='#' className={headerStyle.nav_link}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-small text_color_inactive">
            Лента заказов
          </p>
        </a>
      </div>
      <a href='#' className={headerStyle.logo}>
        <Logo />
      </a>

      <a href='#' className={headerStyle.nav_link}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-small text_color_inactive">
          Личный кабинет
        </p>
      </a>

    </div>
  );
}

export default AppHeader 