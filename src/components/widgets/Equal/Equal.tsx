import cn from 'classnames';
import styles from './Equal.module.scss';
import React from 'react';

export const Equal = () => {
    const handleOnDrag = (name: string) => (e: DragEvent) => {
        e.dataTransfer?.setData('widgetType', name);
    };

    return <div className={cn('block', styles.blockEqual)} draggable
                onDragStart={(e) => handleOnDrag('numEqual')(e)}>
        <button className={styles.numEqual}>=</button>
    </div>;
};