import headerStyle from './app-header.module.css'

import { Logo, BurgerIcon, ListIcon, ProfileIcon, Box } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.nav_links}>
        <div className={headerStyle.nav_link}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-small">
            Конструктор
          </p>
          <p></p>
        </div>
        <div className={headerStyle.nav_link}>
          <ListIcon type="secondary" />
          <div className={headerStyle.dashed_border}>
            <p className="text text_type_main-small text_color_inactive">
              Лента заказов
            </p>
          </div>
        </div>
      </div>
      <div className={headerStyle.logo}>
        <Logo />
      </div>

      <div className={headerStyle.nav_link}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-small text_color_inactive">
          Личный кабинет
        </p>
      </div>

    </div>
  );
}

export default AppHeader 