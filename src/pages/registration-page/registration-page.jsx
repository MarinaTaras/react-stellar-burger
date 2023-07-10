import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './registration-page.module.css';
import postRegister from '../../utils/register-api';
import { POST_REGISTER_SUCCESS } from '../../services/actions/auth-actions';


function RegistrationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onInputChange = e => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  }

  function onRegistrationClick(e) {
    e.preventDefault()
    postRegister(form)
      .then((data) => dispatch({ type: POST_REGISTER_SUCCESS, data }))
      .then((res) => (
        localStorage.setItem("accessToken", res.data.accessToken),
        localStorage.setItem("refreshToken", res.data.refreshToken)))
      .then(() => navigate('/', { replace: true }))
      .catch(e => console.log('ошибка', e))
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onRegistrationClick} >
        <h2 className="text text_type_main-medium">
          Регистрация
        </h2>
        <fieldset className={styles.form_fieldset}>
          <Input name={'name'} placeholder={'Имя'} onChange={onInputChange} value={form.name} error={false} size={'default'} extraClass="ml-1" />
          <EmailInput name={'email'} placeholder={'E-mail'} onChange={onInputChange} value={form.email} error={false} size={'default'} isIcon={false} />
          <PasswordInput name={'password'} placeholder={'Пароль'} onChange={onInputChange} value={form.password} error={false} size={'default'} extraClass="mb-2" />
        </fieldset>
        <Button htmlType="submit" width={'253px'} type="primary" size="medium"> Зарегистрироваться </Button>
      </form>
      <div className={styles.additional}>
        <p className="text text_type_main-default text_color_inactive ">Уже зарегистрированы? </p>
        <Link className={`${styles.link} text text_type_main-default`} to='/login'>Войти</Link>
      </div>
    </div>
  )
}

export default RegistrationPage