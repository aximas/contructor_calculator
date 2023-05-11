import styles from './App.module.scss';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { SvgIcon } from './components/SvgIcon/SvgIcon';

import { ReactComponent as Add } from './assets/icons/add.svg';
import { TABS } from './core/constants';
import { Display, Methods, Equal, Numbers, Clear } from './components/widgets';
import { Widgets } from './components/widgets/Widgets';

function App() {
   const [theme, setTheme] = useState<'light' | 'dark'>('light');

   const [activeTab, setActiveTab] = useState('constructor');

   const [isDragOver, setIsDragOver] = useState(false);

   const [widgets, setWidgets] = useState<string[]>([]);

   useEffect(() => {
      console.log('widgets', widgets);
   }, [widgets]);

   const handleChangeTab = (name: string) => () => {
      setActiveTab(name.toLowerCase());
   };

   const handleDragDrop = (e: React.DragEvent) => {
      const widgetType = e.dataTransfer.getData('widgetType');
      console.log('widgetType', widgetType);
      setWidgets([...widgets, widgetType]);
      setIsDragOver(false);
   };

   const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
   };

   const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
   };

   const showDropZoneWidgets = useMemo(() => {
      if (widgets.length) {
         return [...new Set(widgets)].map((widget, i) => {
            return (
               <div key={i} className={styles.widgetWrapper}>
                  {Widgets[widget]}
               </div>
            );
         });
      }
      return (
         <div className={styles.dropZoneDescription}>
            <SvgIcon Icon={Add} className={styles.dropZoneIcon} />
            <p className={styles.dropZoneText}>
               <span>Перетащите сюда</span> любой элемент из левой панели
            </p>
         </div>
      );
   }, [widgets]);

   return (
      <div className={cn(styles.wrapper, theme)}>
         <ThemeToggle setTheme={setTheme} />
         <div className={styles.layout}>
            <section className={styles.blocks}>
               <Display
                  isOnBoard={widgets.includes('Display')}
                  isDraggable={!widgets.includes('Display')}
               />
               <Methods
                  isOnBoard={widgets.includes('Methods')}
                  isDraggable={!widgets.includes('Methods')}
               />
               <Numbers
                  isOnBoard={widgets.includes('Numbers')}
                  isDraggable={!widgets.includes('Numbers')}
               />
               <Equal
                  isOnBoard={widgets.includes('Equal')}
                  isDraggable={!widgets.includes('Equal')}
               />
               <Clear
                  isOnBoard={widgets.includes('Clear')}
                  isDraggable={!widgets.includes('Clear')}
               />
            </section>

            <section className={styles.dropSide}>
               <div className={styles.tabs}>
                  {TABS.map((t, i) => {
                     return (
                        <button
                           key={i}
                           className={cn(styles.tab, {
                              [styles.tabActive]:
                                 t.text.toLowerCase() === activeTab
                           })}
                           onClick={handleChangeTab(t.text)}
                        >
                           <SvgIcon Icon={t.icon} />
                           <p>{t.text}</p>
                        </button>
                     );
                  })}
               </div>
               <div
                  className={cn(styles.dropZone, {
                     [styles.dropZoneOpen]: widgets.length === 0 && isDragOver,
                     [styles.dropZoneOpened]: widgets.length > 0,
                     [styles.dropZoneMarkedLastElement]: isDragOver
                  })}
                  onDrop={handleDragDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
               >
                  {showDropZoneWidgets}
               </div>
            </section>
         </div>
      </div>
   );
}

export default App;
