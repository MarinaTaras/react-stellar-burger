import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-page.module.css';
import { PATCH_USER_SUCCESS } from '../../services/actions/auth-actions';
import { patchUser, setUser } from '../../utils/user-api';
import { postLogout, signOut } from '../../utils/logout-api';

function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.authReducer.user);

  const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });

  const onInputChange = e => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onResetForm = (e) => {
    e.preventDefault();
    setValue({
      ...form,
      name: '',
      email: '',
      password: '',
    })
  }

  function onProfileClick(e) {
    e.preventDefault()
    patchUser(form)
      .then((data) => dispatch({ type: PATCH_USER_SUCCESS, data }))
      //.then((res) => (dispatch(setUser(res.user))))
      .then(() => navigate('/', { replace: true }))
      .catch(e => console.log('ошибка', e))
  }

  function onLogOut() {
    postLogout()
      .then(res => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken")
        }
      })
      .then((res) => (dispatch(setUser(null))))
      .then((res) => navigate('/login', { replace: true }))

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigate}>
        <nav className={styles.navpanel}>
          <NavLink className={({ isActive }) => (
            isActive ? `${styles.linkActive} ${styles.navlink} text text_type_main-medium`
              : `${styles.link} ${styles.navlink} text text_type_main-medium text_color_inactive `
          )} to="/profile">
            <p>
              Профиль
            </p>
          </NavLink>
          <NavLink className={({ isActive }) => (
            isActive ? `${styles.linkActive} ${styles.navlink} text text_type_main-medium`
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
      <div className={styles.edit}>
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
      </div>

    </div>
  )
}

export default ProfilePage