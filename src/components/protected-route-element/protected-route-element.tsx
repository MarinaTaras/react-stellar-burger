
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { TState, useAppSelector } from '../../services/types'

type TProtectedRouteProps = {
  onlyUnAuth: boolean,
  component: JSX.Element
}

export const ProtectedRouteElement = ({ onlyUnAuth = false, component }: TProtectedRouteProps) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.

  const isAuthChecked = useSelector((state: TState) => state.auth.isAuthChecked)

  const user = useAppSelector((state: TState) => state.auth.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = (props :{ component: JSX.Element }) => {
  const { component } = props
  return <ProtectedRouteElement onlyUnAuth={true} component={component} />
};
