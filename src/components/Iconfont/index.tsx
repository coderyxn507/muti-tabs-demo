import React from 'react';
import * as styles from '@/assets/iconfont/iconfont.css';
import classnames from 'classnames';
import styleSelf from './style.less';

export interface IconfontPropsType extends React.HTMLAttributes<HTMLElement> {
    type?: string;
    title?: string;
    onClick?(event: React.MouseEvent): void;
}

export const Iconfont: React.FC<IconfontPropsType> = (props) => {
  const {
    type = '',
    style,
    title,
    className = 'iconbanbenhuitui',
    ...rest
  } = props;
  return (
    <span
      title={title}
      className={classnames('iconfont', styles.iconfont, styles[type], className, styleSelf.font)}
      style={style}
      {...rest}
    />
  );
};
