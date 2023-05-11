import cn from 'classnames';
import styles from './Numbers.module.scss';
import { NUMBERS } from '../../../core/constants';
import React from 'react';

export const Numbers = () => {
      const handleOnDrag = (name: string) => (e: DragEvent) => {
          e.dataTransfer?.setData('widgetType', name);
      };

    return <div className={cn('block', styles.blockNumbers)} draggable
                onDragStart={(e) => handleOnDrag('num')(e)}>
        {NUMBERS.map((n, i) => {
            return (<button key={i} className={cn({
                [styles.num1]: n.col === 1,
                [styles.num2]: n.col === 2
            })}>{n.value}</button>);
        })}
    </div>;
};