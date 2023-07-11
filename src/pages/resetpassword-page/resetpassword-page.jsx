import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useLocation, useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './resetpassword-page.module.css';
import postReset from '../../utils/reset-api';

function ResetpasswordPage() {
  const navigate = useNavigate();
  const [form, setValue] = useState({password: "", token: "" });


  const onInputChange = e => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  }

  function onResetClick(e) {
    e.preventDefault()
    postReset(form)
    .then((res) => navigate('/login', { replace: true }))
    .catch(e => console.log('ошибка', e) )
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onResetClick} >
        <h2 className="text text_type_main-medium">
          Восстановление пароля
        </h2>
        <fieldset className={styles.form_fieldset}>
          <PasswordInput name={'password'} placeholder={'Введите новый пароль'} onChange={onInputChange} value={form.password} error={false} size={'default'} extraClass="mb-2" />
          <Input name={'token'} placeholder={'Введите код из письма'} onChange={onInputChange} value={form.token} error={false} size={'default'} extraClass="ml-1" />
        </fieldset>
        <Button htmlType="submit" width={'167px'} type="primary" size="medium"> Сохранить </Button>
      </form>
      <div className={styles.additional}>
        <p className="text text_type_main-default text_color_inactive "> Вспомнили пароль? </p>
        <Link className={`${styles.link} text text_type_main-default`} to='/login'>Войти</Link>
      </div>
    </div>
  )
}

export default ResetpasswordPage