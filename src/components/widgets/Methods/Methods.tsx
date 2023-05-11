import cn from 'classnames';
import styles from './Methods.module.scss';
import { ARITHMETIC_METHODS } from '../../../core/constants';
import React from 'react';

export const Methods = () => {
    const handleOnDrag = (name: string) => (e: DragEvent) => {
        e.dataTransfer?.setData('widgetType', name);
    };

    return <div className={cn('block', styles.blockMethods)} draggable
                onDragStart={(e) => handleOnDrag('numMethods')(e)}>
        {ARITHMETIC_METHODS.map((m, i) => {
            return (<button key={i} className={styles.numMethod}>{m}</button>);
        })}
    </div>;
};