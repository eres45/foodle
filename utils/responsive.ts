import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Base width for scaling (iPhone 11/XR width)
const BASE_WIDTH = 414;

/**
 * Scales font size based on screen width
 * @param size - Base font size
 * @returns Scaled font size
 */
export const scaleFont = (size: number): number => {
    const scale = SCREEN_WIDTH / BASE_WIDTH;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Scales spacing/dimensions based on screen width
 * @param size - Base size
 * @returns Scaled size
 */
export const scale = (size: number): number => {
    const scale = SCREEN_WIDTH / BASE_WIDTH;
    return Math.round(size * scale);
};
