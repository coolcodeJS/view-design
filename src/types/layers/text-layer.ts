import { BaseLayerProps } from './config';

export type TEXT_ALIGN = 'left' | 'center' | 'right';
export type TEXT_WRITING_MODE = 'horizontal-tb' | 'vertical-rl';
export type TEXT_DECORATION = 'line-through' | 'underline';

export interface TextLayerProps extends BaseLayerProps {
  text: string;
  color: string;
  fontSize: number;
  fontWeight: number | string;
  jumpLink: string;
  borderWidth: string;
  borderColor: string;
  textAlign: TEXT_ALIGN;
  textDecoration: TEXT_DECORATION;
  lineHeight: number;
  letterSpacing: number;
  writingMode: TEXT_WRITING_MODE;
  backgroundColor: string;
}
