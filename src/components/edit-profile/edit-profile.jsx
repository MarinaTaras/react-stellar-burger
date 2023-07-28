// редактирование информации пользователя
import React, { useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './edit-profile.module.css'
import { PATCH_USER_SUCCESS } from '../../services/actions/auth-actions';
import { patchUser } from '../../utils/user-api';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function EditProfile() {
  const location = useLocation()
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



  return (
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
  )
}

export default EditProfile