'use client';

import React, { useState, useEffect, FC } from 'react';
import InViewAnim from '@/utils/InViewAnim/InViewAnim'
import styles from './Features.module.scss';

const colorSet: string[] = [
  '#5BBDEB',
  '#f05133',
  '#3F687B',
  '#86A96B',
  '#D18810',
  '#2D3C58'
];
const colorSetLength = colorSet.length;

interface FeatureTag {
  id: string | number;
  name: string;
  weight?: number;
}

interface FeatureTabAttributes {
  title: string;
  subtitle?: string;
  feature_tags: FeatureTag[];
}

interface FeatureTab {
  attributes: FeatureTabAttributes;
}

interface FeaturesContent {
  isDark?: boolean;
  title: string;
  title_align?: 'left' | 'center' | 'right';
  desc?: string;
  isTagMonotone?: boolean;
  feature_tabs: {
    data: FeatureTab[];
  };
}

interface FeaturesProps {
  content: FeaturesContent;
}

const Features: FC<FeaturesProps> = ({ content }) => {
  const firstTab = content?.feature_tabs?.data[0];

  const [colorArray, setColorArray] = useState<string[]>([]);
  const [fontSizeArray, setFontSizeArray] = useState<number[]>([]);

  useEffect(() => {
    if (firstTab?.attributes?.feature_tags) {
      setColorArray(
        firstTab.attributes.feature_tags.map(
          () => colorSet[Math.floor(Math.random() * colorSetLength)]
        )
      );
      setFontSizeArray(
        firstTab.attributes.feature_tags.map(
          () => 20 + Math.floor(Math.random() * 18)
        )
      );
    }
  }, [firstTab]);

  return (
    <div
      className={content.isDark ? styles.component_isDark : styles.component}
    >
      <div className={styles.wrapper}>
        <InViewAnim>
          <section className={styles.heading}>
            <div
              className={styles.heading_title}
              style={{
                justifyContent:
                  content.title_align === 'left'
                    ? 'flex-start'
                    : content.title_align === 'center'
                      ? 'center'
                      : content.title_align === 'right'
                        ? 'flex-end'
                        : 'flex-start',
              }}
            >
              <span className={styles.heading_decor}>//</span>
              <span className={styles.heading_content}>{content.title}</span>
            </div>
            {content.desc && (
              <p
                style={{
                  textAlign:
                    content.title_align === 'left'
                      ? 'left'
                      : content.title_align === 'center'
                        ? 'center'
                        : content.title_align === 'right'
                          ? 'right'
                          : 'left',
                  alignSelf:
                    content.title_align === 'left'
                      ? 'flex-start'
                      : content.title_align === 'center'
                        ? 'center'
                        : content.title_align === 'right'
                          ? 'flex-end'
                          : 'flex-start',
                }}
              >
                {content.desc}
              </p>
            )}
          </section>
        </InViewAnim>
        <InViewAnim>
          <div className={styles.tabs_wrapper}>
            <div className={`${styles.tabs_tags} ${styles.show}`}>
              {firstTab?.attributes?.feature_tags?.map((tag, index) => {
                return (
                  <div
                    key={tag.id}
                    className={`${styles.tabs_tags_each} ${styles.show}`}
                    style={{
                      backgroundColor: !!content.isTagMonotone
                        ? '#221E1F'
                        : colorArray[index],
                      fontSize: !!tag.weight
                        ? `${10 + Math.floor(2.8 * tag.weight)}px`
                        : `${fontSizeArray[index]}px`,
                    }}
                  >
                    {tag.name}
                  </div>
                );
              })}
            </div>
          </div>
        </InViewAnim>
      </div>
    </div>
  );
};

export default Features;
