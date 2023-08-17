import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login-page.module.css';
import postLogin from '../../utils/login-api';
import { POST_LOGIN_SUCCESS } from '../../services/actions/auth-actions';

function LoginPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '', password: '' });


  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function onLoginClick(e: MouseEvent<HTMLFormElement>) {
    e.preventDefault()
    
    postLogin(form)
      .then((data) => {
        dispatch({ type: POST_LOGIN_SUCCESS, data })
        return data})
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)
        })
      .then(() => navigate('/', { replace: true }))
      .catch(e => console.log('ошибка', e))
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onLoginClick} >
        <h2 className="text text_type_main-medium">
          Вход
        </h2>
        <fieldset className={styles.form_fieldset}>
          <EmailInput name={'email'} placeholder={'E-mail'} onChange={onInputChange} value={form.email} size={'default'} isIcon={false} />
          <PasswordInput name={'password'} placeholder={'Пароль'} onChange={onInputChange} value={form.password} size={'default'} extraClass="mb-2" />
        </fieldset>
        <Button htmlType="submit" width={'253px'} type="primary" size="medium"> Войти </Button>
      </form>
      <div className={styles.navigation}>
        <div className={styles.additional}>
          <p className="text text_type_main-default text_color_inactive "> Вы - новый пользователь? </p>
          <Link className={`${styles.link} text text_type_main-default`} to='/register'>Зарегистрироваться</Link>
        </div>
        <div className={styles.additional}>
          <p className="text text_type_main-default text_color_inactive "> Забыли пароль? </p>
          <Link className={`${styles.link} text text_type_main-default`} to='/forgot-password'>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage