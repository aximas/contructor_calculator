import cn from 'classnames';
import styles from './Numbers.module.scss';
import { NUMBERS } from '../../../core/constants';
import React from 'react';
import { WidgetProps } from '../Widgets.types';
import widgetsStyles from './../Widgets.module.scss';
import {
   useAppDispatch,
   useAppSelector
} from '../../../core/utils/hooks/reduxHooks';
import {
   addDigit,
   addMethod,
   addOperations,
   addResult
} from '../../../core/store/task/task.slice';

export const Numbers = ({
   isDraggable = true,
   isOnBoard = false
}: WidgetProps) => {
   const [method, digits] = useAppSelector(({ task }) => [
      task.method,
      task.digits
   ]);
   const dispatch = useAppDispatch();

   const handleOnDrag = (name: string) => (e: DragEvent) => {
      e.dataTransfer?.setData('widgetType', name);
   };

   const handleOnClick = (value) => {
      if (method) {
         dispatch(addOperations(digits));
         dispatch(addOperations(method));

         dispatch(addDigit(''));
         dispatch(addMethod(''));
         dispatch(addResult(''));

         dispatch(addDigit(value.toString()));
         // dispatch(addOperations(value.toString()));
      } else {
         dispatch(addDigit(value.toString()));
         dispatch(addResult(''));
      }
   };

   return (
      <div
         className={cn('block', styles.blockNumbers, {
            [widgetsStyles.notActive]: isOnBoard
         })}
         draggable={isDraggable}
         onDragStart={(e) => handleOnDrag('Numbers')(e)}
      >
         {NUMBERS.map((n, i) => {
            return (
               <button
                  key={i}
                  className={cn(styles.numBtn, {
                     [styles.num1]: n.col === 1,
                     [styles.num2]: n.col === 2
                  })}
                  onClick={() => handleOnClick(n.value)}
               >
                  {n.value}
               </button>
            );
         })}
      </div>
   );
};
