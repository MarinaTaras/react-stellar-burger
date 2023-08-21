import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { NavLink, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-page.module.css';
import { PATCH_USER_SUCCESS } from '../../services/actions/auth-actions';
import { patchUser, setUser } from '../../utils/user-api';
import { postLogout } from '../../utils/logout-api';
import { initStore, wsAuthUrl } from '../../services/store'
import { authConnect } from '../../services/actions/feed_auth-actions';
import EditProfile from '../../components/edit-profile/edit-profile';
import OrderContents from '../../components/order-contents/order-contents';
import OrdersHistory from '../../components/orders-history/orders-history';
import { TResponse, TState, useAppDispatch, useAppSelector } from '../../services/types';

function ProfilePage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state: TState) => state.auth.user);
  const background = location.state?.background;
  //находим токен, отрезаем Bearer
  const accessToken = localStorage.getItem("accessToken")?.slice(7);

  // подключаем ws
  useEffect(() => {
    dispatch(authConnect(`${wsAuthUrl}?token=${accessToken}`))
  }, []);

  // находим заказы пользователя
  const orders = useAppSelector((state: TState) => state.feedAuth);


  function onLogOut() {
    postLogout()
      .then(res => {
        if (res && res.success) {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
        }
      })
      .then(() => (dispatch(setUser(null))))
      .then(() => navigate('/login', { replace: true }))

  }

  return (
    <div className={styles.wrapper}>
      {/* панель навигации */}
      <div className={styles.navigate}>
        <nav className={styles.navpanel}>
          <NavLink className={({ isActive }) => (
            isActive ? `${styles.linkActive} ${styles.link} text text_type_main-medium`
              : `${styles.link} ${styles.navlink} text text_type_main-medium text_color_inactive `
          )} to="/profile/profile">
            <p>Профиль</p>
          </NavLink>
          <NavLink className={({ isActive }) => (
            isActive ? `${styles.linkActive} ${styles.link} text text_type_main-medium`
              : `${styles.link} ${styles.navlink} text text_type_main-medium text_color_inactive `
          )} to='/profile/orders'>
            <p>История заказов</p>
          </NavLink>
          <NavLink className={({ isActive }) => (
            isActive ? `${styles.linkActive} ${styles.navlink} text text_type_main-medium`
              : `${styles.link} ${styles.navlink} text text_type_main-medium text_color_inactive `
          )} to='/login'
            onClick={onLogOut}>
            <p>Выход</p>
          </NavLink>
        </nav>
        <div className={`${styles.caption} text text_type_main-default text_color_inactive`}>
          <p>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </div>
      {/* страницы пользователя */}
      {/* <div className={styles.edit}>
        <form className={styles.form} onSubmit={onProfileClick} autoComplete="on">
          <fieldset className={styles.form_fieldset}>
            <Input name={'name'} placeholder={'Имя'} autoComplete="name" onChange={onInputChange} value={form.name} error={false} size={'default'} extraClass="mb-2" icon={'EditIcon'} />
            <EmailInput name={'email'} placeholder={'Логин'} autoComplete="email" onChange={onInputChange} value={form.email} error={false} size={'default'} extraClass="mb-2" icon={'EditIcon'} />
            <PasswordInput type='password' name={'password'} autoComplete="current-password" placeholder={'Пароль'} onChange={onInputChange} value={form.password} error={false} size={'default'} extraClass="mb-2" icon={'EditIcon'} />
          </fieldset>
          <div className={styles.buttons}>
            <Button htmlType="button" type="secondary" size="medium" onClick={onResetForm}>
              Oтмена
            </Button>
            <Button htmlType="submit" disabled={!form.password} type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div> */}

      <div>
        <Outlet />
      
        {/* <Routes location={background || location}>
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/profile/orders" element={<OrdersHistory />}  />
          <Route path='/profile/orders/:id' element={<OrderContents  />} />
        </Routes> */}
      </div>
    </div>
  )
}

export default ProfilePage