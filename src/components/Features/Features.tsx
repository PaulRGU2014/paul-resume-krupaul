'use client';

import React, { useState, useEffect, FC } from 'react';
import InViewAnim from '@/utils/InViewAnim/InViewAnim'
import styles from './Features.module.scss';

// Career start date - updates dynamically each year
const CAREER_START_YEAR = 2020;

const getYearsOfExperience = () => {
  return new Date().getFullYear() - CAREER_START_YEAR;
};

const colorSet: string[] = [
  '#1a1a2e', // deep navy-black
  '#6a0572', // deep purple
  '#16213e', // dark teal-blue
  '#2d5016', // dark sage green
  '#5a3a3a', // dark charcoal-brown
  '#2c3e50', // dark slate
  '#9D0208', // dark red
  '#6A040F', // deep crimson
  '#8B0000', // dark red
  '#4a0e0e', // burgundy-red
  '#1a3a3a', // dark cyan-black
  '#3d2817'  // dark espresso-brown
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

export interface FeaturesContent {
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
  const [showPills, setShowPills] = useState(false);
  const [randomDelays, setRandomDelays] = useState<number[]>([]);

  useEffect(() => {
    if (firstTab?.attributes?.feature_tags) {
      const delays = firstTab.attributes.feature_tags.map(
        () => Math.random() * 500
      );
      setRandomDelays(delays);
      
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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
                justifyContent: 'center',
              }}
            >
              <span className={styles.heading_content}>{content.title}</span>
            </div>
            {content.desc && (
              <h6
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                }}
              >
                A toolkit built through {getYearsOfExperience()} years of hands-on experience delivering production applications.
              </h6>
            )}
          </section>
        </InViewAnim>
        <InViewAnim>
          <div className={styles.tabs_wrapper}>
            <div className={`${styles.tabs_tags} ${showPills ? styles.show : ''}`}>
              {firstTab?.attributes?.feature_tags?.map((tag, index) => {
                return (
                  <div
                    key={tag.id}
                    className={`${styles.tabs_tags_each} ${showPills ? styles.show : ''}`}
                    style={{
                      backgroundColor: !!content.isTagMonotone
                        ? '#221E1F'
                        : colorArray[index],
                      fontSize: !!tag.weight
                        ? `${10 + Math.floor(2.8 * tag.weight)}px`
                        : `${fontSizeArray[index]}px`,
                      transitionDelay: showPills ? `${randomDelays[index]}ms` : '0ms',
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
