import cn from 'classnames';
import styles from './Methods.module.scss';
import { ARITHMETIC_METHODS } from '../../../core/constants';
import React from 'react';
import { WidgetProps } from '../Widgets.types';
import widgetsStyles from '../Widgets.module.scss';
import { useAppDispatch } from '../../../core/utils/hooks/reduxHooks';
import { addMethod } from '../../../core/store/task/task.slice';

export const Methods = ({
   isDraggable = true,
   isOnBoard = false
}: WidgetProps) => {
   const dispatch = useAppDispatch();

   const handleOnDrag = (name: string) => (e: DragEvent) => {
      e.dataTransfer?.setData('widgetType', name);
   };

   const handleOnClick = (method) => () => {
      if (method === 'x') return dispatch(addMethod('*'));
      dispatch(addMethod(method));
   };

   return (
      <div
         className={cn('block', styles.blockMethods, {
            [widgetsStyles.notActive]: isOnBoard
         })}
         draggable={isDraggable}
         onDragStart={(e) => handleOnDrag('Methods')(e)}
      >
         {ARITHMETIC_METHODS.map((m, i) => {
            return (
               <button
                  key={i}
                  className={styles.numMethod}
                  onClick={handleOnClick(m)}
               >
                  {m}
               </button>
            );
         })}
      </div>
   );
};
