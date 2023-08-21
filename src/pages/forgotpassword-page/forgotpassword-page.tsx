import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgotpassword-page.module.css';
import postForgot from '../../utils/forgot-api';

function ForgotpasswordPage() {
  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '' });


  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function onForgotClick(e: MouseEvent<HTMLFormElement>) {
    e.preventDefault()
    postForgot(form.email)
      .then(() => navigate('/reset-password', { replace: true }))
      .catch(e => console.log('ошибка', e))
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onForgotClick}>
        <h2 className="text text_type_main-medium">
          Восстановление пароля
        </h2>
        <fieldset className={styles.form_fieldset}>
          <EmailInput name={'email'} placeholder={'Укажите e-mail'} onChange={onEmailChange} value={form.email} size={'default'} isIcon={false} />
        </fieldset>
        <Button htmlType="submit" width={'196px'} type="primary" size="medium"> Восстановить </Button>
      </form>
      <div className={styles.navigation}>
        <div className={styles.additional}>
          <p className="text text_type_main-default text_color_inactive "> Вспомнили пароль? </p>
          <Link className={`${styles.link} text text_type_main-default`} to='/reset-password'>Войти</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotpasswordPage