import cn from 'classnames';
import styles from './Display.module.scss';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../core/utils/hooks/reduxHooks';
import { WidgetProps } from '../Widgets.types';
import widgetsStyles from '../Widgets.module.scss';

export const Display = ({
   isDraggable = true,
   isOnBoard = false
}: WidgetProps) => {
   const [widgets, digits, result] = useAppSelector(({ widgets, task }) => [
      widgets.widgets,
      task.digits,
      task.result
   ]);

   const [isOnDrop, setIsOnDrop] = useState(false);

   const handleOnDrag = (name: string) => (e: DragEvent) => {
      e.dataTransfer?.setData('widgetType', name);
   };

   useEffect(() => {
      if (widgets.includes('display')) setIsOnDrop(true);
      else setIsOnDrop(false);
   }, [widgets]);

   return (
      <div
         className={cn('block', { [widgetsStyles.notActive]: isOnBoard })}
         draggable={isDraggable}
         onDragStart={(e) => handleOnDrag('Display')(e)}
      >
         <p className={styles.numDisplay}>{result || isOnBoard || digits}</p>
      </div>
   );
};
